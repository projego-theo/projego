import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();
const GHL_WEBHOOK =
  "https://services.leadconnectorhq.com/hooks/Sqd3WdWGgoefvce96mhp/webhook-trigger/18940dc5-9d6b-4f6f-88d2-a87582431b46";

async function generateTitles() {
  const response = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1000,
    messages: [
      {
        role: "user",
        content: `Génère 14 titres d'articles de blog pour Projego, une entreprise de maîtrise d'œuvre et démarches administratives (DP/PC) en Vendée.

      Thèmes à couvrir: déclaration préalable, permis de construire, réglementation urbanisme, conseils travaux, maîtrise d'œuvre, extension maison, rénovation, construction neuve, piscine, pergola, artisans BTP.

      Format: JSON array avec 14 objets {title, category, keywords}
      Réponds UNIQUEMENT avec le JSON, sans markdown.`,
      },
    ],
  });

  const titles = JSON.parse(
    response.content[0].type === "text" ? response.content[0].text : "[]"
  );

  await fetch(GHL_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "blog_titles_proposal",
      week: new Date().toISOString().split("T")[0],
      titles: titles,
      message: `14 articles proposés pour la semaine du ${new Date().toLocaleDateString("fr-FR")}. Répondez avec les numéros à valider (ex: 1,3,5,7,9,11,13,14) ou ALL pour tous valider.`,
    }),
  });

  console.log("Titles sent to GHL:", titles);
  return titles;
}

generateTitles();
