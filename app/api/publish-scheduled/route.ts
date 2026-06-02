import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

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

export async function GET() {
  try {
    // 1. Check if there are pending articles
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

    // 2. Take the first article
    const article: PendingArticle = pendingData.articles[0];
    const remainingArticles: PendingArticle[] = pendingData.articles.slice(1);

    // 3. Generate article content with Claude
    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 3000,
      messages: [
        {
          role: "user",
          content: `Rédige un article de blog complet pour Projego sur: "${article.title}"
        Catégorie: ${article.category}
        Mots-clés: ${article.keywords?.join(", ")}

        Format EXACT (respecte le frontmatter):
        ---
        title: "${article.title}"
        date: "${new Date().toISOString().split("T")[0]}"
        description: "Description SEO en 155 caractères maximum"
        tags: [${article.keywords?.map((k: string) => `"${k}"`).join(", ")}]
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
      : article.title
          .toLowerCase()
          .normalize("NFD")
          .replace(/[̀-ͯ]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .slice(0, 60);

    // 4. Publish article to GitHub
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
          message: `Blog auto: ${article.title}`,
          content,
        }),
      }
    );

    if (!publishResponse.ok) {
      const error = await publishResponse.text();
      return NextResponse.json({ success: false, error: `GitHub error: ${error}` });
    }

    // 5. Update pending list (remove published article)
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

    // 6. Trigger Vercel rebuild
    if (VERCEL_DEPLOY_HOOK) {
      await fetch(VERCEL_DEPLOY_HOOK, { method: "POST" });
    }

    return NextResponse.json({
      success: true,
      published: slug,
      remaining: remainingArticles.length,
    });
  } catch (error) {
    // Silent fail - never throw errors
    console.error("Publish error:", error);
    return NextResponse.json({ success: true, message: "Skipped" });
  }
}
