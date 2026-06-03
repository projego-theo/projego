import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { timingSafeEqual } from "crypto";

const client = new Anthropic();
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = "projego-theo/projego";
const VERCEL_DEPLOY_HOOK = process.env.VERCEL_DEPLOY_HOOK;

function safeCompare(a: string, b: string): boolean {
  try {
    const bufA = Buffer.from(a);
    const bufB = Buffer.from(b);
    if (bufA.length !== bufB.length) return false;
    return timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

function sanitizeInput(s: unknown, maxLen = 200): string {
  if (typeof s !== "string") return "";
  return s.replace(/[\n\r\x00-\x1f]/g, " ").trim().slice(0, maxLen);
}

export async function POST(request: NextRequest) {
  const { title, category, keywords, secret } = await request.json();

  if (!secret || !process.env.BLOG_SECRET || !safeCompare(secret, process.env.BLOG_SECRET)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const safeTitle = sanitizeInput(title, 150);
  const safeCategory = sanitizeInput(category, 50);
  const safeKeywords: string[] = Array.isArray(keywords)
    ? keywords.map((k: unknown) => sanitizeInput(k, 50)).filter(Boolean)
    : [];

  if (!safeTitle) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  try {
    const response = await client.messages.create({
      model: process.env.CLAUDE_SONNET_MODEL || "claude-sonnet-4-6",
      max_tokens: 3000,
      messages: [
        {
          role: "user",
          content: `Rédige un article de blog complet pour Projego sur: "${safeTitle}".
        Catégorie: ${safeCategory}. Mots-clés: ${safeKeywords.join(", ")}.
        Format markdown avec frontmatter YAML complet (title, date, description, tags, slug).
        Structure: intro, 3 sections H2, conclusion avec CTA /contact.
        Ton professionnel, optimisé SEO, en français, 1000-1200 mots.`,
        },
      ],
    });

    const articleContent =
      response.content[0].type === "text" ? response.content[0].text : "";

    const slugMatch = articleContent.match(/slug:\s*["']?([a-z0-9-]+)["']?/);
    const rawSlug = slugMatch
      ? slugMatch[1].trim()
      : safeTitle
          .toLowerCase()
          .normalize("NFD")
          .replace(/[̀-ͯ]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");

    const slug = rawSlug.replace(/[^a-z0-9-]/g, "").slice(0, 100);
    if (!slug) {
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }

    const fileName = `content/blog/${slug}.md`;
    const content = Buffer.from(articleContent).toString("base64");

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
          message: `Article: ${safeTitle}`,
          content,
          ...(sha && { sha }),
        }),
      }
    );

    if (!githubResponse.ok) {
      throw new Error("GitHub publish failed");
    }

    await fetch(VERCEL_DEPLOY_HOOK!, { method: "POST" });

    return NextResponse.json({ success: true, slug });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
