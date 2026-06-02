import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();
const GHL_WEBHOOK =
  "https://services.leadconnectorhq.com/hooks/Sqd3WdWGgoefvce96mhp/webhook-trigger/4186ded7-6d96-4dfe-9906-2b7fb94d74c0";

export async function GET() {
  try {
    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: `Génère 14 titres d'articles de blog pour Projego (maîtrise d'œuvre et démarches administratives DP/PC en Vendée).

        Thèmes: déclaration préalable, permis de construire, urbanisme, maîtrise d'œuvre, extension, rénovation, construction neuve, piscine, pergola, artisans BTP, Vendée.

        Réponds UNIQUEMENT avec un JSON array: [{"id":1,"title":"...","category":"...","keywords":["...","..."]}]
        14 objets exactement, pas de markdown, pas d'explication.`,
        },
      ],
    });

    let titles;
    try {
      titles = JSON.parse((response.content[0] as { text: string }).text);
    } catch {
      return NextResponse.json({ success: false, error: "Parse error" });
    }

    const titlesText = titles
      .map((t: { id: number; title: string }) => `${t.id}. ${t.title}`)
      .join("\n");

    await fetch(GHL_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "contact@projego.fr",
        type: "blog_titles_proposal",
        week: new Date().toISOString().split("T")[0],
        message: `📰 *14 articles proposés cette semaine*\n\n${titlesText}\n\nRépondez avec les numéros à publier (ex: 1,3,5) ou ALL pour tout valider. Sans réponse = aucune publication.`,
        titles_json: JSON.stringify(titles),
      }),
    });

    return NextResponse.json({ success: true, count: titles.length });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) });
  }
}
