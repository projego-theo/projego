import { NextRequest, NextResponse } from "next/server";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = "projego-theo/projego";

export async function POST(request: NextRequest) {
  try {
    const { secret, validated_numbers, titles_json } = await request.json();

    if (secret !== process.env.BLOG_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const titles = JSON.parse(titles_json);
    let selectedTitles;

    if (validated_numbers?.toLowerCase() === "all") {
      selectedTitles = titles;
    } else {
      const numbers = validated_numbers
        .split(",")
        .map((n: string) => parseInt(n.trim()));
      selectedTitles = titles.filter((t: { id: number }) =>
        numbers.includes(t.id)
      );
    }

    if (selectedTitles.length === 0) {
      return NextResponse.json({ success: true, message: "No articles selected" });
    }

    // Check if a pending file already exists (need its sha to update it)
    const existingResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/content/blog-pending.json`,
      { headers: { Authorization: `Bearer ${GITHUB_TOKEN}` } }
    );

    const pendingContent = Buffer.from(
      JSON.stringify({
        validated_at: new Date().toISOString(),
        articles: selectedTitles,
      })
    ).toString("base64");

    const body: Record<string, string> = {
      message: "Validated blog articles for the week",
      content: pendingContent,
    };

    if (existingResponse.ok) {
      const existing = await existingResponse.json();
      body.sha = existing.sha;
    }

    await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/content/blog-pending.json`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    return NextResponse.json({ success: true, count: selectedTitles.length });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) });
  }
}
