import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = "projego-theo/projego";
const VERCEL_DEPLOY_HOOK = process.env.VERCEL_DEPLOY_HOOK;

export async function POST(request: NextRequest) {
  const { title, category, keywords, secret } = await request.json();

  if (secret !== process.env.BLOG_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Generate article
    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 3000,
      messages: [
        {
          role: "user",
          content: `Rédige un article de blog complet pour Projego sur: "${title}".
        Catégorie: ${category}. Mots-clés: ${keywords?.join(", ")}.
        Format markdown avec frontmatter YAML complet (title, date, description, tags, slug).
        Structure: intro, 3 sections H2, conclusion avec CTA /contact.
        Ton professionnel, optimisé SEO, en français, 1000-1200 mots.`,
        },
      ],
    });

    const articleContent =
      response.content[0].type === "text" ? response.content[0].text : "";

    const slugMatch = articleContent.match(/slug:\s*["']?([^"'\n]+)["']?/);
    const slug = slugMatch
      ? slugMatch[1].trim()
      : title
          .toLowerCase()
          .normalize("NFD")
          .replace(/[̀-ͯ]/g, "")
          .replace(/[^a-z0-9]+/g, "-");

    // Publish to GitHub
    const fileName = `content/blog/${slug}.md`;
    const content = Buffer.from(articleContent).toString("base64");

    // Check if file exists to get its SHA (required for updates)
    let sha: string | undefined;
    const existingFile = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${fileName}`,
      { headers: { Authorization: `Bearer ${GITHUB_TOKEN}` } }
    );
    if (existingFile.ok) {
      const existing = await existingFile.json();
      sha = existing.sha;
    }

    const githubResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${fileName}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Article: ${title}`,
          content,
          ...(sha && { sha }),
        }),
      }
    );

    if (!githubResponse.ok) {
      const err = await githubResponse.text();
      throw new Error(`GitHub publish failed: ${err}`);
    }

    // Trigger Vercel rebuild
    await fetch(VERCEL_DEPLOY_HOOK!, { method: "POST" });

    return NextResponse.json({ success: true, slug });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
