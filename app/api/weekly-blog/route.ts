import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { timingSafeEqual } from "crypto";

const client = new Anthropic();

const CATEGORIES = [
  {
    id: "declaration-prealable",
    label: "Déclaration Préalable",
    description: "Quels travaux nécessitent une DP, coût moyen (mettre en avant Projego: moins cher et plus rapide que les autres), délais instruction en mairie, projets concernés (piscine, pergola, clôture, extension <40m², carport, véranda, ravalement, portail), refus et recours, guichet numérique des mairies, pièces à fournir selon le type de projet (Cerfa, plan de situation, plan de masse, façades, insertion graphique, photos)"
  },
  {
    id: "permis-de-construire",
    label: "Permis de Construire",
    description: "Dossier complet et pièces obligatoires selon le projet, délais instruction 2-3 mois, architecte obligatoire ou pas (oui si >150m²), projets concernés (maison neuve, extension >40m², surélévation, transformation combles, pool-house), refus et recours, guichet numérique, pièces à fournir (Cerfa, plan de situation, plan de masse, coupe, notice descriptive, façades, insertion graphique, attestations thermiques et sismiques), avantages Projego: 48-72h de réalisation"
  },
  {
    id: "maitrise-oeuvre",
    label: "Maîtrise d'œuvre",
    description: "Différence architecte vs maître d'œuvre (architecte prend en moyenne 8-12% du montant des travaux ET des commissions sur les artisans, Projego aucune commission sur les travaux), missions du MO, suivi de chantier, plans 2D et 3D sur mesure, coordination artisans, zone d'intervention Vendée 30km autour des Herbiers, honoraires transparents"
  },
  {
    id: "construction-neuve",
    label: "Construction Neuve",
    description: "RE2020 réglementation thermique, budget au m² construction neuve en Vendée, choix du terrain, plans sur mesure vs maison catalogue (avantages plans uniques Projego), délais de construction, financement et PTZ, GIEP (Gestion Intégrée des Eaux Pluviales): obligation dans certains lotissements, techniques GIEP (jardin de pluie, noue, citerne, tranchée infiltration, toiture stockante), formulaire GIEP à joindre au PC, contrôle communal"
  },
  {
    id: "extension-renovation",
    label: "Extension et Rénovation",
    description: "Budget rénovation au m² en Vendée, isolation thermique et phonique, redistribution des espaces et optimisation des volumes, surélévation maison, agrandissement horizontal, valeur ajoutée du bien immobilier, quand faut-il une DP ou un PC pour une extension, rénovation complète vs partielle, aides financières (MaPrimeRénov, CEE)"
  },
  {
    id: "urbanisme-reglementation",
    label: "Urbanisme et Réglementation",
    description: "PLU (Plan Local d'Urbanisme) comment le lire, COS et emprise au sol, hauteur maximale des constructions, retrait par rapport aux limites séparatives, règles d'implantation, servitudes, zones constructibles, spécificités urbanisme en Vendée et communes rurales, recours contre un PLU, certificat d'urbanisme"
  },
  {
    id: "espace-pro",
    label: "Espace Pro",
    description: "Avantages de sous-traiter ses DP et PC à Projego pour les artisans BTP (menuisiers, piscinistes, paysagistes, maçons, peintres, plombiers, électriciens, charpentiers, couvreurs), délais garantis 24-48h, transformation de croquis clients en plans professionnels AutoCAD (livrés PDF et DWG), tarifs préférentiels partenaires, comment ça marche en 3 étapes, gain de temps et satisfaction client"
  },
];

const GHL_WEBHOOK =
  "https://services.leadconnectorhq.com/hooks/Sqd3WdWGgoefvce96mhp/webhook-trigger/4186ded7-6d96-4dfe-9906-2b7fb94d74c0";

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

export async function GET(request: NextRequest) {
  const secret =
    request.headers.get("x-blog-secret") ||
    new URL(request.url).searchParams.get("secret") ||
    "";

  if (!process.env.BLOG_SECRET || !safeCompare(secret, process.env.BLOG_SECRET)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: `Génère 14 titres d'articles de blog pour Projego (maîtrise d'œuvre et démarches administratives DP/PC en Vendée).

Génère exactement 2 titres par catégorie, en t'inspirant des sujets décrits pour chaque catégorie:

${CATEGORIES.map((c) => `- ${c.label} (id: "${c.id}"): ${c.description}`).join("\n")}

Réponds UNIQUEMENT avec un JSON array: [{"id":1,"title":"...","category":"id-de-la-categorie","keywords":["...","..."]}]
14 objets exactement (2 par catégorie), pas de markdown, pas d'explication.`,
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
