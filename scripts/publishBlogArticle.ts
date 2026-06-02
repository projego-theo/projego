import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = "projego-theo/projego";
const VERCEL_DEPLOY_HOOK = process.env.VERCEL_DEPLOY_HOOK;

async function writeAndPublishArticle(
  title: string,
  category: string,
  keywords: string[]
) {
  // 1. Generate article with Claude
  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 3000,
    messages: [
      {
        role: "user",
        content: `Rédige un article de blog complet pour Projego sur le sujet: "${title}"

      Catégorie: ${category}
      Mots-clés: ${keywords.join(", ")}

      Structure requise (format markdown avec frontmatter):
      ---
      title: "${title}"
      date: "${new Date().toISOString().split("T")[0]}"
      description: "[description SEO 150 caractères max]"
      tags: [${keywords.map((k) => `"${k}"`).join(", ")}]
      slug: "[slug-url-friendly]"
      ---

      # ${title}

      [Introduction 100 mots]

      ## [Section 1]
      [300 mots]

      ## [Section 2]
      [300 mots]

      ## [Section 3]
      [300 mots]

      ## Conclusion
      [100 mots avec CTA vers /contact]

      Ton professionnel mais accessible. Optimisé SEO. En français. Mentionne Projego naturellement.`,
      },
    ],
  });

  const articleContent =
    response.content[0].type === "text" ? response.content[0].text : "";

  // Extract slug from frontmatter
  const slugMatch = articleContent.match(/slug:\s*"([^"]+)"/);
  const slug = slugMatch
    ? slugMatch[1]
    : title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .replace(/[^a-z0-9]+/g, "-");

  // 2. Publish to GitHub via API
  const fileName = `content/blog/${slug}.md`;
  const content = Buffer.from(articleContent).toString("base64");

  const githubResponse = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/contents/${fileName}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Blog: ${title}`,
        content: content,
      }),
    }
  );

  if (githubResponse.ok) {
    // 3. Trigger Vercel rebuild
    await fetch(VERCEL_DEPLOY_HOOK!, { method: "POST" });
    console.log(`Article published: ${slug}`);
  } else {
    const err = await githubResponse.text();
    console.error("GitHub publish failed:", err);
  }
}

const title = process.argv[2];
const category = process.argv[3] || "conseils";
const keywords = (process.argv[4] || "").split(",").filter(Boolean);

if (!title) {
  console.error("Usage: npx tsx scripts/publishBlogArticle.ts <title> [category] [keyword1,keyword2,...]");
  process.exit(1);
}

writeAndPublishArticle(title, category, keywords);
