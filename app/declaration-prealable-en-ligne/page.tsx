import type { Metadata } from 'next';
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';
import PageHero from '@/components/PageHero';
import { PageBackground } from '@/components/PageBackground';
import { ServiceCTA } from '@/components/ServiceCTA';
import { SectionCloud } from '@/components/SectionCloud';

export const metadata: Metadata = {
  title: 'Déclaration Préalable en Ligne — Dossier complet 24-48h, toute la France',
  description:
    "Déposez votre déclaration préalable en ligne avec Projego : dossier complet en 24-48h, 100% dématérialisé, partout en France. Piscine, pergola, extension, clôture.",
  openGraph: {
    title: 'Déclaration Préalable en Ligne — Dossier complet 24-48h | Projego',
    description:
      "Déposez votre déclaration préalable en ligne avec Projego : dossier complet en 24-48h, 100% dématérialisé, partout en France. Piscine, pergola, extension, clôture.",
    url: 'https://www.projego.fr/declaration-prealable-en-ligne',
    type: 'website',
  },
};

const avantages = [
  {
    icon: '💻',
    title: '100% en ligne',
    desc: 'Échanges, envoi des documents, livraison du dossier : tout se passe à distance. Aucun déplacement.',
  },
  {
    icon: '⚡',
    title: 'Dossier en 24-48h',
    desc: 'Une fois vos éléments reçus, votre dossier complet vous est livré en 24 à 48 heures ouvrées.',
  },
  {
    icon: '🇫🇷',
    title: 'Toute la France',
    desc: "Vendée, Île-de-France, Bretagne, PACA... nous intervenons partout, sans supplément.",
  },
  {
    icon: '🔍',
    title: 'Analyse PLU incluse',
    desc: "Nous vérifions les règles d'urbanisme de votre commune avant de constituer le dossier.",
  },
];

const projets = [
  { title: 'Piscine hors-sol ou semi-enterrée', desc: 'Moins de 100 m², non couverte' },
  { title: 'Pergola et carport', desc: 'Toute surface > 5 m², adossés ou indépendants' },
  { title: 'Clôture et portail', desc: 'Dans la plupart des communes (variable selon PLU)' },
  { title: 'Extension ≤ 40 m²', desc: 'En zone avec PLU (≤ 20 m² hors zone)' },
  { title: 'Vélux et ouvertures en toiture', desc: "Modification de l'aspect extérieur" },
  { title: 'Abri de jardin (5 à 20 m²)', desc: 'Construction légère de stockage' },
  { title: 'Ravalement de façade', desc: "Si changement d'aspect en zone réglementée" },
  { title: 'Panneaux solaires', desc: "En façade ou toiture, selon règles locales" },
  { title: 'Terrasse surélevée', desc: "Structure supérieure à 0,60 m" },
];

const steps = [
  {
    n: '01',
    title: 'Vous nous contactez',
    desc: 'Formulaire en ligne, e-mail ou téléphone. Décrivez votre projet en quelques lignes. Réponse sous 4h.',
  },
  {
    n: '02',
    title: 'Analyse gratuite',
    desc: "Nous étudions le PLU de votre commune et vérifions la faisabilité avant de démarrer.",
  },
  {
    n: '03',
    title: 'Constitution du dossier',
    desc: "Cerfa, plan de masse, plan de situation, photos, document graphique — tout est préparé par nos soins.",
  },
  {
    n: '04',
    title: 'Livraison & dépôt',
    desc: "Dossier complet livré en 24-48h. Dépôt en mairie en ligne (Démarches Simplifiées) ou par courrier.",
  },
];

const faq = [
  {
    q: "Peut-on déposer une déclaration préalable entièrement en ligne ?",
    a: "Oui. Depuis 2022, les communes de plus de 3 500 habitants doivent accepter les dépôts de déclaration préalable via la plateforme Démarches Simplifiées ou leur propre guichet numérique. Pour les communes plus petites, le dépôt par courrier recommandé reste valable. Projego vous livre un dossier adapté aux deux modes de dépôt.",
  },
  {
    q: "Quels documents me faut-il pour démarrer ?",
    a: "Pour une première étude : l'adresse du terrain, la nature du projet (piscine, pergola, extension...) et quelques photos actuelles de votre maison ou terrain. Nous vous demanderons les compléments uniquement si nécessaire. Aucun document technique n'est requis de votre part en amont.",
  },
  {
    q: "Combien de temps dure l'instruction d'une déclaration préalable ?",
    a: "Le délai légal est d'un mois à compter du dépôt d'un dossier complet. En secteur protégé (abords de monument historique, AVAP), le délai est porté à 2 mois. En l'absence de réponse dans ces délais, c'est une autorisation tacite. Projego prépare votre dossier en 24 à 48h pour ne pas perdre de temps.",
  },
  {
    q: "Vous intervenez dans ma commune, même si elle est petite ?",
    a: "Oui. Nous traitons des dossiers dans toutes les communes françaises. Notre expertise est ancrée en Vendée (Beaurepaire, Les Herbiers, Montaigu, Cholet...) mais s'applique à n'importe quelle commune : les règles d'urbanisme sont nationales, et nous consultons le PLU local pour chaque projet.",
  },
  {
    q: "Faut-il un architecte pour une déclaration préalable ?",
    a: "Non. La déclaration préalable ne nécessite pas le recours à un architecte, quelle que soit la surface créée. Projego constitue et signe le dossier en qualité de maître d'œuvre. Pour les projets nécessitant un permis de construire avec surface > 150 m², nous faisons appel à nos architectes DPLG partenaires.",
  },
  {
    q: "Que se passe-t-il si la mairie demande des pièces complémentaires ?",
    a: "Nous prenons en charge la réponse aux demandes de pièces complémentaires dans le cadre de notre mission. Nos dossiers sont conçus pour être complets dès le premier dépôt, ce qui réduit drastiquement le risque de retour mairie.",
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

export default function DPEnLignePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PageBackground />
      <PageHero
        title="Déclaration Préalable en Ligne — Dossier complet en 24-48h, toute la France"
        subtitle="100% dématérialisé, sans déplacement. Analyse PLU gratuite."
        badge="Service Type A — Toute la France"
        typewriterTexts={["piscine", "pergola", "extension < 40m²", "clôture", "carport", "véranda"]}
      />

      {/* ── INTRO ── */}
      <section className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <span className="text-xs font-bold uppercase tracking-widest text-[#29abe2] mb-3 block">Service 100% dématérialisé</span>
              <h2 className="text-3xl font-bold text-[#3d3d3d] mb-6">La déclaration préalable en ligne, sans prise de tête</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                La <strong>déclaration préalable (DP)</strong> est obligatoire pour de nombreux travaux courants : piscine, pergola, extension, clôture... Un dossier incomplet entraîne des demandes de pièces complémentaires et peut retarder votre autorisation de plusieurs semaines.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Projego prend en charge l&apos;intégralité de la démarche <strong>en ligne</strong> : analyse du PLU, constitution des pièces, livraison du dossier prêt à déposer en mairie ou via Démarches Simplifiées.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Résultat : un dossier solide en 24-48h, depuis n&apos;importe quelle commune de France — sans que vous ayez à vous déplacer ni à interpréter les règles d&apos;urbanisme locales.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-[#29abe2] text-white font-semibold px-7 py-3.5 rounded-full hover:bg-[#1a9fd6] transition-all">
                  Démarrer mon dossier
                </Link>
                <Link href="/declaration-prealable" className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-[#3d3d3d] font-semibold px-7 py-3.5 rounded-full hover:border-[#29abe2] transition-all">
                  En savoir plus sur la DP
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="grid grid-cols-2 gap-4">
                {avantages.map((item) => (
                  <div key={item.title} className="bg-white shadow-sm border border-gray-100 rounded-2xl p-6">
                    <div className="text-3xl mb-3">{item.icon}</div>
                    <p className="font-bold text-[#3d3d3d] text-sm mb-1">{item.title}</p>
                    <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── PROJETS CONCERNÉS ── */}
      <section className="relative py-20 bg-transparent">
        <SectionCloud />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#3d3d3d] mb-4">Quels projets traite-t-on en ligne ?</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Tous ces travaux nécessitent une déclaration préalable. Nous les traitons à distance, partout en France.
            </p>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projets.map((p, i) => (
              <AnimatedSection key={p.title} delay={i * 0.05}>
                <div className="bg-white rounded-xl p-5 border border-gray-100 hover:border-[#29abe2]/30 hover:shadow-md transition-all">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#29abe2] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <p className="font-semibold text-[#3d3d3d] text-sm">{p.title}</p>
                      <p className="text-gray-400 text-xs mt-1">{p.desc}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Votre projet n&apos;est pas dans cette liste ?{' '}
              <Link href="/contact" className="text-[#29abe2] font-semibold">
                Contactez-nous
              </Link>
              , nous l&apos;étudions gratuitement.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── PROCESSUS ── */}
      <section className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#3d3d3d] mb-4">Comment ça se passe, en ligne ?</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Quatre étapes simples, entièrement dématérialisées.</p>
          </AnimatedSection>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <AnimatedSection key={s.n} delay={i * 0.1}>
                <div className="text-center">
                  <div className="w-14 h-14 bg-[#3d3d3d] text-white font-bold text-xl rounded-full flex items-center justify-center mx-auto mb-4">{s.n}</div>
                  <h3 className="font-bold text-[#3d3d3d] mb-2">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERTISE VENDÉE / NATIONAL ── */}
      <section className="relative py-20 bg-transparent">
        <SectionCloud />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="bg-white rounded-2xl p-8 md:p-12 border-2 border-[#29abe2]/20">
              <span className="text-xs font-bold uppercase tracking-widest text-[#29abe2] mb-3 block">Expertise locale, portée nationale</span>
              <h2 className="text-2xl font-bold text-[#3d3d3d] mb-4">Basés en Vendée, actifs partout en France</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Notre agence est implantée à <strong>Beaurepaire (85)</strong>, en Vendée. Cette ancrage local nous a permis de développer une expertise pointue des PLU et des pratiques des services d&apos;urbanisme de la région — mais notre service en ligne s&apos;applique à n&apos;importe quelle commune de France.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Que vous soyez en Loire-Atlantique, en Île-de-France, en Bretagne ou en PACA, nous consultons le PLU de votre commune, appliquons les mêmes règles et vous livrons un dossier adapté au contexte local — avec la même réactivité.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Vendée', 'Loire-Atlantique', 'Maine-et-Loire', 'Deux-Sèvres', 'Île-de-France', 'Bretagne', 'PACA', '...et toute la France'].map((z) => (
                  <span key={z} className="text-xs bg-[#29abe2]/10 text-[#29abe2] px-2.5 py-1.5 rounded-full font-medium">{z}</span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#3d3d3d] mb-4">Questions fréquentes</h2>
          </AnimatedSection>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.07}>
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                  <h3 className="font-bold text-[#3d3d3d] mb-2">{item.q}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIENS INTERNES ── */}
      <section className="py-16 bg-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-2">Besoin d&apos;une autre autorisation ?</h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/declaration-prealable" className="group block border-2 border-gray-100 hover:border-[#29abe2] rounded-2xl p-6 transition-all hover:shadow-md">
              <h3 className="font-bold text-[#3d3d3d] group-hover:text-[#29abe2] transition-colors mb-1">Déclaration Préalable</h3>
              <p className="text-gray-500 text-sm">Tous les détails : cas concernés, pièces du dossier, délais d&apos;instruction.</p>
              <span className="text-[#29abe2] text-sm font-semibold mt-3 inline-block">En savoir plus →</span>
            </Link>
            <Link href="/permis-construire-en-ligne" className="group block border-2 border-gray-100 hover:border-[#29abe2] rounded-2xl p-6 transition-all hover:shadow-md">
              <h3 className="font-bold text-[#3d3d3d] group-hover:text-[#29abe2] transition-colors mb-1">Permis de Construire en Ligne</h3>
              <p className="text-gray-500 text-sm">Maison neuve, extension &gt; 40 m², surélévation — dossier en ligne en 48-72h.</p>
              <span className="text-[#29abe2] text-sm font-semibold mt-3 inline-block">En savoir plus →</span>
            </Link>
          </div>
        </div>
      </section>

      <ServiceCTA
        title="Votre déclaration préalable en ligne, en 24-48h"
        description="Envoyez-nous les informations sur votre projet. Nous analysons la faisabilité gratuitement et vous préparons le dossier complet, prêt à déposer — sans sortir de chez vous."
        photo="/69a21054581df_Capturedecran2026-02-27a22.42.46.png"
      />
    </>
  );
}
