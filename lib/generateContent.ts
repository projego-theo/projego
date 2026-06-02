import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';

const CACHE_DIR = path.join(process.cwd(), 'content', 'generated');
const MODEL = 'claude-haiku-4-5-20251001';

const SYSTEM_PROMPT = `Tu es un expert en urbanisme français avec 20 ans d'expérience. Tu maîtrises parfaitement :
- Le Code de l'urbanisme, les PLU, PLUi et cartes communales
- Les procédures de déclaration préalable (DP) et de permis de construire (PC)
- Les délais d'instruction légaux et les spécificités locales des mairies
- La maîtrise d'œuvre, les normes de construction et les artisans du BTP
- Les spécificités régionales et départementales de la France

Tu rédiges des textes naturels, informatifs et locaux, sans markdown, sans tirets de liste, en prose continue.
Tes textes sont optimisés pour le référencement local tout en restant utiles pour les particuliers et les professionnels.`;

function getCachePath(cacheKey: string): string {
  const parts = cacheKey.split('/');
  const dir = parts.slice(0, -1).join('/');
  const file = parts[parts.length - 1];
  const fullDir = path.join(CACHE_DIR, dir);
  fs.mkdirSync(fullDir, { recursive: true });
  return path.join(fullDir, `${file}.txt`);
}

function readCache(cacheKey: string): string | null {
  const cachePath = getCachePath(cacheKey);
  if (fs.existsSync(cachePath)) {
    return fs.readFileSync(cachePath, 'utf-8');
  }
  return null;
}

function writeCache(cacheKey: string, content: string): void {
  const cachePath = getCachePath(cacheKey);
  fs.writeFileSync(cachePath, content, 'utf-8');
}

let client: Anthropic | null = null;

function getClient(): Anthropic {
  if (!client) {
    client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return client;
}

export async function getOrGenerateContent(
  cacheKey: string,
  prompt: string,
  fallback: string
): Promise<string> {
  const cached = readCache(cacheKey);
  if (cached) return cached;

  if (!process.env.ANTHROPIC_API_KEY) {
    return fallback;
  }

  try {
    const anthropic = getClient();
    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 900,
      system: [
        {
          type: 'text',
          text: SYSTEM_PROMPT,
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages: [{ role: 'user', content: prompt }],
    });

    const textBlock = response.content.find((b) => b.type === 'text');
    const text = textBlock && textBlock.type === 'text' ? textBlock.text : fallback;
    writeCache(cacheKey, text);
    return text;
  } catch (err) {
    console.warn(`[generateContent] API error for "${cacheKey}":`, err);
    writeCache(cacheKey, fallback);
    return fallback;
  }
}

export async function generateBatch(
  items: Array<{ cacheKey: string; prompt: string; fallback: string }>,
  delayMs = 150
): Promise<void> {
  let generated = 0;
  let cached = 0;
  for (const item of items) {
    const existing = readCache(item.cacheKey);
    if (existing) {
      cached++;
      continue;
    }
    await getOrGenerateContent(item.cacheKey, item.prompt, item.fallback);
    generated++;
    if (generated % 10 === 0) {
      process.stdout.write(`  Generated ${generated} (${cached} cached)...\n`);
    }
    if (delayMs > 0) await new Promise((r) => setTimeout(r, delayMs));
  }
  console.log(`  Done: ${generated} generated, ${cached} from cache.`);
}
