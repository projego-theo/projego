import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { timingSafeEqual } from "crypto";

const client = new Anthropic();
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = "projego-theo/projego";
const VERCEL_DEPLOY_HOOK = process.env.VERCEL_DEPLOY_HOOK;

interface PendingArticle {
  id: number;
  title: string;
  category: string;
  keywords?: string[];
}

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

export async function GET(request: NextRequest) {
  const secret =
    request.headers.get("x-blog-secret") ||
    new URL(request.url).searchParams.get("secret") ||
    "";

  if (!process.env.BLOG_SECRET || !safeCompare(secret, process.env.BLOG_SECRET)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const pendingResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/content/blog-pending.json`,
      { headers: { Authorization: `Bearer ${GITHUB_TOKEN}` } }
    );

    if (!pendingResponse.ok) {
      return NextResponse.json({ success: true, message: "No pending articles" });
    }

    const pendingFile = await pendingResponse.json();
    const pendingData = JSON.parse(
      Buffer.from(pendingFile.content, "base64").toString()
    );

    if (!pendingData.articles || pendingData.articles.length === 0) {
      return NextResponse.json({ success: true, message: "No articles to publish" });
    }

    const article: PendingArticle = pendingData.articles[0];
    const remainingArticles: PendingArticle[] = pendingData.articles.slice(1);

    const safeTitle = sanitizeInput(article.title, 150);
    const safeCategory = sanitizeInput(article.category, 50);
    const safeKeywords: string[] = Array.isArray(article.keywords)
      ? article.keywords.map((k: unknown) => sanitizeInput(k, 50)).filter(Boolean)
      : [];

    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 3000,
      messages: [
        {
          role: "user",
          content: `Rédige un article de blog complet pour Projego sur: "${safeTitle}"
        Catégorie: ${safeCategory}
        Mots-clés: ${safeKeywords.join(", ")}

        Format EXACT (respecte le frontmatter):
        ---
        title: "${safeTitle}"
        date: "${new Date().toISOString().split("T")[0]}"
        description: "Description SEO en 155 caractères maximum"
        tags: [${safeKeywords.map((k: string) => `"${k}"`).join(", ")}]
        slug: "slug-url-sans-accents"
        ---

        Rédige ensuite l'article en markdown: introduction (100 mots), 3 sections H2 (250 mots chacune), conclusion avec appel à l'action vers /contact. Total: 1000-1200 mots. Ton professionnel, optimisé SEO, en français.`,
        },
      ],
    });

    const articleContent = (response.content[0] as { text: string }).text;
    const slugMatch = articleContent.match(/slug:\s*["']?([a-z0-9-]+)["']?/);
    const slug = slugMatch
      ? slugMatch[1]
      : safeTitle
          .toLowerCase()
          .normalize("NFD")
          .replace(/[̀-ͯ]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .slice(0, 60);

    const fileName = `content/blog/${slug}.md`;
    const content = Buffer.from(articleContent).toString("base64");

    const publishResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${fileName}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Blog auto: ${safeTitle}`,
          content,
        }),
      }
    );

    if (!publishResponse.ok) {
      const error = await publishResponse.text();
      return NextResponse.json({ success: false, error: `GitHub error: ${error}` });
    }

    const updatedContent = Buffer.from(
      JSON.stringify({
        validated_at: pendingData.validated_at,
        articles: remainingArticles,
      })
    ).toString("base64");

    await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/content/blog-pending.json`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "Update pending articles",
          content: updatedContent,
          sha: pendingFile.sha,
        }),
      }
    );

    if (VERCEL_DEPLOY_HOOK) {
      await fetch(VERCEL_DEPLOY_HOOK, { method: "POST" });
    }

    return NextResponse.json({
      success: true,
      published: slug,
      remaining: remainingArticles.length,
    });
  } catch (error) {
    console.error("Publish error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" });
  }
}
