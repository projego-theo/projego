import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { timingSafeEqual } from "crypto";

const client = new Anthropic();
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = "projego-theo/projego";
const VERCEL_DEPLOY_HOOK = process.env.VERCEL_DEPLOY_HOOK;
const GITHUB_HEADERS = {
  "Authorization": `Bearer ${GITHUB_TOKEN}`,
  "Content-Type": "application/json",
};

function safeCompare(a: string, b: string): boolean {
  try {
    return timingSafeEqual(Buffer.from(a), Buffer.from(b));
  } catch {
    return false;
  }
}

const CATEGORIES = [
  {
    day: 1, // Monday
    id: "declaration-prealable",
    label: "Déclaration Préalable",
    topics: "Quels travaux nécessitent une DP, coût moyen (Projego: moins cher et plus rapide), délais instruction mairie, projets (piscine, pergola, clôture, extension <40m², carport, véranda, ravalement, portail), refus et recours, guichet numérique, pièces à fournir (Cerfa, plan de situation, plan de masse, façades, insertion graphique, photos)"
  },
  {
    day: 2, // Tuesday
    id: "permis-de-construire",
    label: "Permis de Construire",
    topics: "Dossier complet et pièces obligatoires, délais 2-3 mois, architecte obligatoire si >150m², projets (maison neuve, extension >40m², surélévation, combles, pool-house), refus et recours, pièces (Cerfa, plan masse, coupe, notice, façades, attestations thermiques), Projego: 48-72h de réalisation"
  },
  {
    day: 3, // Wednesday
    id: "maitrise-oeuvre",
    label: "Maîtrise d'œuvre",
    topics: "Différence architecte vs MO (architecte: 8-12% + commissions artisans, Projego: aucune commission), missions du MO, suivi chantier, plans 2D/3D sur mesure, coordination artisans, zone Vendée 30km autour des Herbiers, honoraires transparents"
  },
  {
    day: 4, // Thursday
    id: "construction-neuve",
    label: "Construction Neuve",
    topics: "RE2020, budget au m² en Vendée, choix terrain, plans sur mesure vs catalogue (avantages Projego), délais construction, financement PTZ, GIEP (Gestion Intégrée des Eaux Pluviales): obligation dans lotissements, techniques (jardin pluie, noue, citerne, tranchée infiltration, toiture stockante), formulaire GIEP dans PC"
  },
  {
    day: 5, // Friday
    id: "extension-renovation",
    label: "Extension et Rénovation",
    topics: "Budget rénovation au m², isolation thermique et phonique, redistribution espaces, surélévation, agrandissement horizontal, valeur ajoutée bien immobilier, quand DP ou PC pour extension, aides (MaPrimeRénov, CEE)"
  },
  {
    day: 6, // Saturday
    id: "urbanisme-reglementation",
    label: "Urbanisme et Réglementation",
    topics: "PLU comment le lire, COS et emprise au sol, hauteur maximale, retrait limites séparatives, zones constructibles, servitudes, spécificités Vendée et communes rurales, recours PLU, certificat d'urbanisme"
  },
  {
    day: 0, // Sunday
    id: "espace-pro",
    label: "Espace Pro",
    topics: "Avantages sous-traitance DP/PC pour artisans BTP (menuisiers, piscinistes, paysagistes, maçons, peintres, plombiers, électriciens, charpentiers, couvreurs), délais garantis 24-48h, transformation croquis en plans professionnels AutoCAD (PDF et DWG), tarifs partenaires, comment ça marche en 3 étapes"
  },
];

// Fetch existing blog slugs from GitHub
async function fetchExistingSlugs(): Promise<string[]> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/content/blog`,
      { headers: { "Authorization": `Bearer ${GITHUB_TOKEN}` } }
    );
    if (!res.ok) return [];
    const files: { name: string }[] = await res.json();
    return files
      .filter((f) => f.name.endsWith('.md'))
      .map((f) => f.name.replace(/\.md$/, ''));
  } catch {
    return [];
  }
}

// Fetch title history from content/blog-history.json on GitHub
async function fetchTitleHistory(): Promise<{ sha: string; titles: string[] }> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/content/blog-history.json`,
      { headers: { "Authorization": `Bearer ${GITHUB_TOKEN}` } }
    );
    if (!res.ok) return { sha: '', titles: [] };
    const data = await res.json();
    const decoded = JSON.parse(Buffer.from(data.content, 'base64').toString('utf-8'));
    return { sha: data.sha, titles: Array.isArray(decoded.titles) ? decoded.titles : [] };
  } catch {
    return { sha: '', titles: [] };
  }
}

// Append the new title to blog-history.json on GitHub
async function appendTitleHistory(title: string, existingSha: string, existingTitles: string[]) {
  try {
    const updatedTitles = [...existingTitles, title];
    const body: Record<string, string> = {
      message: `Blog history: ${title}`,
      content: Buffer.from(JSON.stringify({ titles: updatedTitles }, null, 2)).toString('base64'),
    };
    if (existingSha) body.sha = existingSha;
    await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/content/blog-history.json`,
      { method: "PUT", headers: GITHUB_HEADERS, body: JSON.stringify(body) }
    );
  } catch (err) {
    console.error('Failed to update blog-history.json:', err);
  }
}

export async function GET(request: NextRequest) {
  const isVercelCron = request.headers.get('x-vercel-cron') === '1';
  if (!isVercelCron) {
    const secret = request.nextUrl.searchParams.get('secret') || request.headers.get('x-blog-secret');
    if (!secret || !process.env.BLOG_SECRET || !safeCompare(secret, process.env.BLOG_SECRET)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  try {
    // Get today's category based on day of week
    const dayOfWeek = new Date().getDay(); // 0=Sunday, 1=Monday...
    const category = CATEGORIES.find(c => c.day === dayOfWeek) || CATEGORIES[0];

    // Fetch existing slugs and title history in parallel
    const [existingSlugs, { sha: historySha, titles: historyTitles }] = await Promise.all([
      fetchExistingSlugs(),
      fetchTitleHistory(),
    ]);

    const existingContext = existingSlugs.length > 0
      ? `\n\nArticles existants (évite des sujets similaires): ${existingSlugs.join(', ')}`
      : '';
    const historyContext = historyTitles.length > 0
      ? `\n\nTitres déjà publiés (ne répète pas ces sujets): ${historyTitles.slice(-50).join(' | ')}`
      : '';

    // Generate title
    const titleResponse = await client.messages.create({
      model: process.env.CLAUDE_HAIKU_MODEL || "claude-haiku-4-5-20251001",
      max_tokens: 200,
      messages: [{
        role: "user",
        content: `Génère UN titre d'article de blog accrocheur et SEO pour Projego (maîtrise d'œuvre et démarches administratives en Vendée) sur le thème: ${category.label}.

        Sujets possibles: ${category.topics}${existingContext}${historyContext}

        Génère un titre UNIQUE qui n'est pas déjà couvert par les articles existants.
        Réponds UNIQUEMENT avec le titre, rien d'autre, pas de guillemets, pas d'explication.`
      }]
    });

    const title = (titleResponse.content[0] as any).text.trim().replace(/^["']|["']$/g, '');

    // Generate keywords
    const keywordsResponse = await client.messages.create({
      model: process.env.CLAUDE_HAIKU_MODEL || "claude-haiku-4-5-20251001",
      max_tokens: 100,
      messages: [{
        role: "user",
        content: `Pour l'article "${title}", donne 5 mots-clés SEO séparés par des virgules. Réponds UNIQUEMENT avec les mots-clés séparés par des virgules, rien d'autre.`
      }]
    });

    const keywords = (keywordsResponse.content[0] as any).text.split(',').map((k: string) => k.trim());

    // Generate full article
    const articleResponse = await client.messages.create({
      model: process.env.CLAUDE_SONNET_MODEL || "claude-sonnet-4-6",
      max_tokens: 3000,
      messages: [{
        role: "user",
        content: `Rédige un article de blog complet pour Projego sur: "${title}"

        Catégorie: ${category.label}
        Mots-clés: ${keywords.join(", ")}
        Informations sur Projego: ${category.topics}

        Format EXACT avec frontmatter YAML:
        ---
        title: "${title}"
        date: "${new Date().toISOString().split('T')[0]}"
        description: "Description SEO unique de 155 caractères maximum"
        tags: [${keywords.slice(0,4).map((k: string) => `"${k}"`).join(", ")}]
        slug: "slug-url-sans-accents-ni-espaces"
        ---

        Puis l'article en markdown:
        - Introduction percutante (100 mots)
        - 3 sections H2 avec contenu substantiel (250 mots chacune)
        - Conclusion avec appel à l'action vers /contact ou /declaration-prealable ou /permis-de-construire selon le sujet
        - Total: 1000-1200 mots
        - Ton professionnel et accessible
        - Mentionner Projego naturellement 2-3 fois
        - Optimisé SEO avec les mots-clés intégrés naturellement
        - En français`
      }]
    });

    const articleContent = (articleResponse.content[0] as any).text;

    // Extract slug safely
    const slugMatch = articleContent.match(/slug:\s*["']?([a-z0-9-]+)["']?/);
    const slug = slugMatch
      ? slugMatch[1]
      : title.toLowerCase()
          .normalize('NFD')
          .replace(/[̀-ͯ]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '')
          .slice(0, 60);

    // Publish to GitHub
    const fileName = `content/blog/${slug}.md`;
    const content = Buffer.from(articleContent).toString('base64');

    // Check if file exists
    try {
      const existing = await fetch(
        `https://api.github.com/repos/${GITHUB_REPO}/contents/${fileName}`,
        { headers: { "Authorization": `Bearer ${GITHUB_TOKEN}` } }
      );
      if (existing.ok) {
        // File exists, generate a new unique slug
        const timestamp = Date.now();
        const newSlug = `${slug}-${timestamp}`;
        const newFileName = `content/blog/${newSlug}.md`;
        const publishResponse = await fetch(
          `https://api.github.com/repos/${GITHUB_REPO}/contents/${newFileName}`,
          {
            method: "PUT",
            headers: GITHUB_HEADERS,
            body: JSON.stringify({ message: `Blog auto: ${title}`, content })
          }
        );
        if (!publishResponse.ok) {
          const err = await publishResponse.text();
          console.error('GitHub publish error:', err);
          return NextResponse.json({ success: false, error: 'GitHub publish failed' }, { status: 500 });
        }
      } else {
        // File doesn't exist, publish normally
        const publishResponse = await fetch(
          `https://api.github.com/repos/${GITHUB_REPO}/contents/${fileName}`,
          {
            method: "PUT",
            headers: GITHUB_HEADERS,
            body: JSON.stringify({ message: `Blog auto: ${title}`, content })
          }
        );
        if (!publishResponse.ok) {
          const err = await publishResponse.text();
          console.error('GitHub publish error:', err);
          return NextResponse.json({ success: false, error: 'GitHub publish failed' }, { status: 500 });
        }
      }
    } catch (err) {
      console.error('GitHub error:', err);
      return NextResponse.json({ success: false, error: 'GitHub error' }, { status: 500 });
    }

    // Append title to history (fire-and-forget)
    appendTitleHistory(title, historySha, historyTitles);

    // Trigger Vercel rebuild
    if (VERCEL_DEPLOY_HOOK) {
      await fetch(VERCEL_DEPLOY_HOOK, { method: "POST" });
    }

    return NextResponse.json({
      success: true,
      title,
      slug,
      category: category.label,
      day: dayOfWeek
    });

  } catch (error) {
    console.error('publish-scheduled error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
