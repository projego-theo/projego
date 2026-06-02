/**
 * Pre-generation script — run ONCE before `next build` to populate the content cache.
 * Usage: npx tsx scripts/generateAllContent.ts
 *
 * All API calls use claude-haiku-4-5-20251001 with prompt caching on the system message.
 * Already-cached pages are skipped automatically.
 */

import { generateBatch } from '../lib/generateContent';
import { franceVilles } from '../lib/franceVilles';
import { departements } from '../lib/departements';
import { proPages } from '../lib/proMetiers';
import { dpTypes, pcTypes } from '../lib/workTypes';

async function main() {
  console.log('=== Projego content pre-generation ===\n');
  console.log(`Total pages to process: ${
    franceVilles.length * 2 +
    departements.length * 2 +
    proPages.length +
    dpTypes.length +
    pcTypes.length +
    dpTypes.length * franceVilles.length +
    pcTypes.length * franceVilles.length
  }\n`);

  // ── 1. DP grandes villes ──────────────────────────────────────────────────
  console.log(`[1/9] DP grandes villes (${franceVilles.length})...`);
  await generateBatch(
    franceVilles.map((v) => ({
      cacheKey: `dp-ville-france/${v.slug}`,
      prompt: `Tu es expert en urbanisme français. Écris un paragraphe de 150 mots unique et informatif sur la déclaration préalable de travaux à ${v.name} (${v.department}, ${v.deptCode}). Mentionne : la mairie de ${v.name}, les délais d'instruction typiques d'un mois, les projets courants (piscines, pergolas, extensions, clôtures), le PLU ou PLUi applicable, et pourquoi Projego peut aider les particuliers à ${v.name} à constituer leur dossier en 24 à 48h. Ton naturel, informatif, pas de markdown, pas de tirets, prose continue.`,
      fallback: `À ${v.name} (${v.department}), la déclaration préalable de travaux est obligatoire pour de nombreux projets courants : piscine hors-sol, pergola, extension jusqu'à 40 m², clôture ou modification de façade. Le dossier est instruit par la mairie de ${v.name} dans un délai légal d'un mois. Projego constitue votre dossier complet en 24 à 48h, partout en France, 100 % à distance.`,
    })),
    150
  );

  // ── 2. PC grandes villes ──────────────────────────────────────────────────
  console.log(`[2/9] PC grandes villes (${franceVilles.length})...`);
  await generateBatch(
    franceVilles.map((v) => ({
      cacheKey: `pc-ville-france/${v.slug}`,
      prompt: `Tu es expert en urbanisme français. Écris un paragraphe de 150 mots unique sur le permis de construire à ${v.name} (${v.department}, ${v.deptCode}). Mentionne : la mairie de ${v.name}, les délais d'instruction (2 mois pour une maison individuelle, 3 mois pour les autres), les projets typiques (maisons neuves, extensions > 40 m², surélévations), le guichet numérique des autorisations d'urbanisme, et comment Projego constitue le dossier en 48 à 72h. Ton naturel, pas de markdown, prose continue.`,
      fallback: `À ${v.name} (${v.department}), le permis de construire est exigé pour toute maison neuve, toute extension de plus de 40 m², toute surélévation et la plupart des grandes constructions. La mairie de ${v.name} instruit les demandes dans un délai légal de 2 mois pour une maison individuelle et de 3 mois pour les autres constructions. Projego constitue votre dossier complet en 48 à 72h, partout en France.`,
    })),
    150
  );

  // ── 3. DP départements ────────────────────────────────────────────────────
  console.log(`[3/9] DP départements (${departements.length})...`);
  await generateBatch(
    departements.map((d) => ({
      cacheKey: `dp-dept/${d.slug}`,
      prompt: `Tu es expert en urbanisme français. Écris 150 mots sur la déclaration préalable de travaux dans le département ${d.name} (${d.code}), région ${d.region}. Mentionne la préfecture ${d.prefecture}, les spécificités locales d'urbanisme de ce département (zones rurales/urbaines, présence de sites classés, loi littoral si applicable), les types de projets courants (piscines, pergolas, extensions, clôtures), et comment Projego aide les particuliers de ${d.name} à constituer leur dossier en 24-48h. Ton naturel, prose continue, pas de markdown.`,
      fallback: `Dans le département ${d.name} (${d.code}), la déclaration préalable de travaux est la démarche administrative de référence pour les petits aménagements : piscine hors-sol, pergola, clôture, extension jusqu'à 40 m². Les dossiers sont instruits par les mairies locales ou la DDT, dont la préfecture est à ${d.prefecture}. Projego constitue votre dossier complet en 24 à 48h, partout en France.`,
    })),
    150
  );

  // ── 4. PC départements ────────────────────────────────────────────────────
  console.log(`[4/9] PC départements (${departements.length})...`);
  await generateBatch(
    departements.map((d) => ({
      cacheKey: `pc-dept/${d.slug}`,
      prompt: `Tu es expert en urbanisme français. Écris 150 mots sur le permis de construire dans le département ${d.name} (${d.code}), région ${d.region}. Mentionne la préfecture ${d.prefecture}, les spécificités du PLU/PLUi local, les projets courants dans ce département, les délais d'instruction (2 mois maison individuelle, 3 mois autres), et comment Projego aide à obtenir un dossier complet en 48-72h. Ton naturel, prose continue, pas de markdown.`,
      fallback: `Dans le département ${d.name} (${d.code}), le permis de construire est obligatoire pour toute maison individuelle neuve, toute extension de plus de 40 m² et la plupart des grandes constructions. La préfecture se trouve à ${d.prefecture}. Les délais légaux d'instruction sont de 2 mois pour une maison individuelle et de 3 mois pour les autres constructions. Projego constitue votre dossier en 48 à 72h, partout en France.`,
    })),
    150
  );

  // ── 5. Pro pages ──────────────────────────────────────────────────────────
  console.log(`[5/9] Pro pages (${proPages.length})...`);
  await generateBatch(
    proPages.map((p) => {
      const projectList =
        p.service === 'declaration-prealable'
          ? p.metier.dpProjects.join(', ')
          : p.service === 'permis-de-construire'
          ? p.metier.pcProjects.join(', ')
          : p.metier.planProjects.join(', ');
      const prompt =
        p.service === 'plans-pro'
          ? `Tu es expert en démarches administratives BTP. Écris 200 mots pour un ${p.metier.name} professionnel qui veut externaliser la production de ses plans AutoCAD. Mentionne les types de plans concernés : ${projectList}. Explique comment Projego transforme les croquis en plans DWG et PDF professionnels en 24-48h, prêts pour les dossiers administratifs. Ton B2B, professionnel, pas de markdown.`
          : `Tu es expert en démarches administratives BTP. Écris 200 mots pour un ${p.metier.name} qui veut déléguer ses ${p.serviceName}s. Mentionne les projets typiques de ce métier : ${projectList}. Explique comment Projego gère l'intégralité du dossier en ${p.service === 'declaration-prealable' ? '24-48h' : '48-72h'}, de l'analyse du PLU au dépôt en mairie, en toute confidentialité. Ton B2B professionnel, pas de markdown.`;
      return {
        cacheKey: `pro/${p.slug}`,
        prompt,
        fallback: `Projego gère vos ${p.serviceName}s en tant que partenaire de confiance. En tant que ${p.metier.name}, vous intervenez sur des projets comme ${projectList} qui nécessitent des dossiers administratifs rigoureux. Projego prend en charge l'intégralité de la démarche en ${p.service === 'declaration-prealable' ? '24-48h' : '48-72h'} : analyse du PLU, constitution du dossier, dépôt en mairie et suivi jusqu'à l'obtention. Service confidentiel, facturation par mission.`,
      };
    }),
    150
  );

  // ── 6. DP types ───────────────────────────────────────────────────────────
  console.log(`[6/9] DP types (${dpTypes.length})...`);
  await generateBatch(
    dpTypes.map((t) => ({
      cacheKey: `dp-type/${t.slug}`,
      prompt: `Tu es expert en urbanisme français. Écris 200 mots sur la déclaration préalable pour une ${t.name.toLowerCase()} en France. Explique quand elle est obligatoire (critères de surface, hauteur), les pièces du dossier nécessaires (plan de masse, plan de situation, photos, document graphique), le délai d'instruction d'un mois, et comment Projego constitue le dossier en 24-48h partout en France. Mentionne les erreurs fréquentes à éviter. Ton naturel et informatif, prose continue, pas de markdown.`,
      fallback: `La déclaration préalable pour ${t.name.toLowerCase()} est obligatoire dès lors que les critères de surface ou de hauteur dépassent les seuils réglementaires. Le dossier comprend un formulaire Cerfa, un plan de situation, un plan de masse, des photographies et un document graphique d'insertion. La mairie dispose d'un mois pour instruire votre dossier complet. Projego constitue votre déclaration préalable en 24 à 48h, partout en France, 100 % à distance.`,
    })),
    150
  );

  // ── 7. PC types ───────────────────────────────────────────────────────────
  console.log(`[7/9] PC types (${pcTypes.length})...`);
  await generateBatch(
    pcTypes.map((t) => ({
      cacheKey: `pc-type/${t.slug}`,
      prompt: `Tu es expert en urbanisme français. Écris 200 mots sur le permis de construire pour une ${t.name.toLowerCase()} en France. Explique quand il est obligatoire, les pièces du dossier (Cerfa, plans PC1 à PC8, notice descriptive), les délais d'instruction (2 mois maison, 3 mois autres constructions), et comment Projego constitue un dossier solide en 48-72h pour maximiser les chances d'obtention. Mentionne la RE2020 si pertinent. Ton naturel, prose continue, pas de markdown.`,
      fallback: `Le permis de construire pour ${t.name.toLowerCase()} est une autorisation administrative obligatoire instruite par la mairie ou la DDT. Le dossier comprend le formulaire Cerfa n°13406, un plan de situation (PC1), un plan de masse coté (PC2), une notice descriptive, les plans de façades et un document graphique d'insertion. Le délai légal d'instruction est de 2 mois pour une maison individuelle et de 3 mois pour les autres constructions. Projego constitue votre dossier en 48 à 72h.`,
    })),
    150
  );

  // ── 8. DP type × ville ────────────────────────────────────────────────────
  console.log(`[8/9] DP type × ville (${dpTypes.length * franceVilles.length})...`);
  await generateBatch(
    dpTypes.flatMap((t) =>
      franceVilles.map((v) => ({
        cacheKey: `dp-type-ville/${t.slug}/${v.slug}`,
        prompt: `Tu es expert en urbanisme. Écris 150 mots sur la déclaration préalable pour une ${t.name.toLowerCase()} à ${v.name} (${v.department}). Mentionne la mairie de ${v.name}, les règles du PLU local, les délais d'instruction d'un mois, et pourquoi confier son dossier à Projego (24-48h, 100% à distance). Ton naturel et local, prose continue, pas de markdown.`,
        fallback: `Pour une ${t.name.toLowerCase()} à ${v.name} (${v.department}), une déclaration préalable est obligatoire selon les règles du PLU local. Le dossier est instruit par la mairie de ${v.name} dans un délai légal d'un mois. Projego constitue votre dossier complet en 24 à 48h, 100 % à distance, avec analyse PLU incluse.`,
      }))
    ),
    120
  );

  // ── 9. PC type × ville ────────────────────────────────────────────────────
  console.log(`[9/9] PC type × ville (${pcTypes.length * franceVilles.length})...`);
  await generateBatch(
    pcTypes.flatMap((t) =>
      franceVilles.map((v) => ({
        cacheKey: `pc-type-ville/${t.slug}/${v.slug}`,
        prompt: `Tu es expert en urbanisme. Écris 150 mots sur le permis de construire pour ${t.name.toLowerCase()} à ${v.name} (${v.department}). Mentionne la mairie de ${v.name}, les règles du PLU, les délais d'instruction (2 ou 3 mois), et comment Projego constitue un dossier complet en 48-72h. Ton naturel et local, prose continue, pas de markdown.`,
        fallback: `Pour ${t.name.toLowerCase()} à ${v.name} (${v.department}), un permis de construire est obligatoire. Le dossier est instruit par la mairie de ${v.name} dans un délai de 2 mois pour une maison individuelle, 3 mois pour les autres constructions. Projego constitue votre dossier complet en 48 à 72h, 100 % à distance.`,
      }))
    ),
    120
  );

  console.log('\n✅ Pre-generation complete!');
  console.log('Run `npm run build` to build the site with all content.\n');
}

main().catch(console.error);
