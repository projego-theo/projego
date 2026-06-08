import type { Metadata } from 'next';
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';
import PageHero from '@/components/PageHero';
import { PageBackground } from '@/components/PageBackground';
import { ServiceCTA } from '@/components/ServiceCTA';
import { SectionCloud } from '@/components/SectionCloud';

export const metadata: Metadata = {
  title: "Auto-Rénovation — Démarches Administratives 100% en Ligne, toute la France",
  description:
    "Vous rénovez vous-même ? Projego gère votre déclaration préalable ou permis de construire 100% en ligne. Analyse PLU incluse. Partout en France, dossier en 24-72h.",
  openGraph: {
    title: "Auto-Rénovation — Démarches Administratives prises en charge | Projego",
    description:
      "Vous rénovez vous-même ? Projego gère votre déclaration préalable ou permis de construire 100% en ligne. Analyse PLU incluse. Partout en France, dossier en 24-72h.",
    url: 'https://www.projego.fr/auto-renovation',
    type: 'website',
  },
};

const avantages = [
  {
    icon: '🔨',
    title: 'Vous rénover, on gère le papier',
    desc: 'Déclaration préalable, permis de construire, analyse PLU — pris en charge à distance pendant que vous travaillez.',
  },
  {
    icon: '⚡',
    title: 'Dossier en 24-72h',
    desc: 'DP livré en 24-48h, PC en 48-72h. Pas de délai inutile avant de commencer vos travaux.',
  },
  {
    icon: '🇫🇷',
    title: 'Toute la France',
    desc: "On s'adapte au PLU de votre commune, quelle que soit la région. 100% à distance.",
  },
  {
    icon: '🔍',
    title: 'Analyse PLU offerte',
    desc: "On vérifie ce que votre commune autorise avant de constituer le dossier. Pas de mauvaise surprise.",
  },
];

const travauxAvecAutorisation = [
  {
    type: 'DP',
    label: 'Déclaration Préalable',
    travaux: [
      { title: 'Extension ≤ 40 m²', desc: 'Agrandissement en zone avec PLU (≤ 20 m² hors zone)' },
      { title: 'Ravalement de façade', desc: "Si changement d'aspect dans une commune réglementée" },
      { title: 'Changement de fenêtres', desc: "Si modification de l'aspect extérieur du bâtiment" },
      { title: 'Création d\'ouverture en toiture', desc: "Vélux, chassis de toit — modification de la toiture" },
      { title: 'Modification de toiture', desc: "Changement de matériaux, de couleur ou de pente" },
      { title: 'Pergola / carport', desc: "Toute surface supérieure à 5 m²" },
    ],
  },
  {
    type: 'PC',
    label: 'Permis de Construire',
    travaux: [
      { title: 'Extension > 40 m²', desc: 'En zone avec PLU (> 20 m² hors zone)' },
      { title: 'Surélévation', desc: "Ajout d'un niveau ou aménagement de combles en surface habitable" },
      { title: 'Changement de destination avec travaux', desc: "Ex : grange en habitation, garage en studio" },
      { title: 'Reconstruction après démolition', desc: "Reconstruction à l'identique ou modifiée" },
    ],
  },
];

const steps = [
  {
    n: '01',
    title: 'Décrivez vos travaux',
    desc: 'Nature des travaux, surface, commune. On répond sous 24h avec la bonne autorisation à demander et une étude gratuite.',
  },
  {
    n: '02',
    title: 'On analyse votre PLU',
    desc: "On vérifie ce que votre commune autorise : règles d'implantation, aspect, hauteur, emprise au sol.",
  },
  {
    n: '03',
    title: 'On monte le dossier',
    desc: "Cerfa, plans, photos, notice, document graphique — tout est préparé. Vous n'avez rien à constituer.",
  },
  {
    n: '04',
    title: 'Vous récupérez et vous déposez',
    desc: "Dossier livré en 24-72h selon le type d'autorisation. Dépôt en mairie en ligne ou par courrier, vous choisissez.",
  },
];

const faq = [
  {
    q: "Tous mes travaux de rénovation nécessitent-ils une autorisation ?",
    a: "Non. Les travaux intérieurs (peinture, isolation, refaire une salle de bain, changer les sols) ne nécessitent généralement aucune autorisation si ils ne modifient pas la structure porteuse ni l'aspect extérieur. En revanche, dès que vous touchez à la façade, à la toiture, créez une ouverture ou ajoutez de la surface, une déclaration préalable ou un permis de construire est obligatoire.",
  },
  {
    q: "Comment savoir si mon projet nécessite une DP ou un PC ?",
    a: "La règle générale : déclaration préalable pour les travaux créant jusqu'à 40 m² de surface ou modifiant l'aspect extérieur sans créer de surface importante. Permis de construire pour les extensions de plus de 40 m², les surélévations ou les changements de destination avec modification de structure. En cas de doute, contactez-nous — on vous dit exactement ce qu'il faut déposer après avoir consulté votre PLU.",
  },
  {
    q: "Je rénove moi-même, sans entreprise. Le dossier est-il différent ?",
    a: "Le dossier administratif est identique, que vous fassiez appel à des entreprises ou que vous rénoviez en auto-rénovation. Les pièces demandées (plan de masse, plan de situation, notice, photos, document graphique) sont les mêmes. La seule différence : en tant qu'autorénovateur, vous êtes à la fois maître d'ouvrage et exécutant — Projego prend en charge le dossier dans les deux cas.",
  },
  {
    q: "Peut-on déposer une déclaration préalable pour une rénovation en ligne ?",
    a: "Oui. Depuis 2022, les communes de plus de 3 500 habitants acceptent les dépôts en ligne via Démarches Simplifiées. Projego vous livre un dossier numérique prêt à déposer sur la plateforme, ou un dossier papier pour les communes qui l'exigent encore.",
  },
  {
    q: "Quels sont les risques si je commence les travaux sans autorisation ?",
    a: "Les travaux réalisés sans autorisation ou non conformes au permis obtenu peuvent être sanctionnés par une mise en demeure de stopper le chantier, une amende, voire une obligation de démolition dans les cas les plus graves. L'administration dispose de 10 ans pour constater l'infraction. Régulariser après coup est toujours plus compliqué et coûteux que d'obtenir l'autorisation avant de commencer.",
  },
  {
    q: "Intervenez-vous dans ma région ?",
    a: "Oui. Notre service est 100% à distance — nous intervenons dans toutes les communes de France. Notre expertise est ancrée en Vendée (Beaurepaire, Les Herbiers, Montaigu...) mais nous traitons des dossiers partout : Bretagne, Normandie, Île-de-France, PACA, Occitanie et toutes les autres régions.",
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

export default function AutoRenovationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PageBackground />
      <PageHero
        title="Vous rénovez vous-même ? Concentrez-vous sur votre chantier."
        subtitle="On gère votre déclaration préalable ou permis de construire. 100% en ligne, toute la France."
        badge="Auto-Rénovation — Service Type A"
        typewriterTexts={["ravalement de façade", "extension", "surélévation", "ouverture en toiture", "changement de fenêtres"]}
      />

      {/* ── INTRO ── */}
      <section className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <span className="text-xs font-bold uppercase tracking-widest text-[#29abe2] mb-3 block">Pour les auto-rénovateurs</span>
              <h2 className="text-3xl font-bold text-[#3d3d3d] mb-6">Vous posez les carreaux. On fait les dossiers.</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                L&apos;auto-rénovation, c&apos;est beaucoup de temps, d&apos;énergie et de compétences investis. Comprendre si vos travaux nécessitent une autorisation, identifier la bonne procédure, constituer un dossier conforme au PLU de votre commune — c&apos;est une autre paire de manches.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Projego prend en charge <strong>l&apos;intégralité de vos démarches administratives</strong>, à distance. Vous nous décrivez vos travaux, on analyse les règles locales et on vous livre un dossier complet prêt à déposer — en 24 à 72h selon l&apos;autorisation.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Résultat : vous commencez vos travaux dans les règles, sans perdre de semaines sur les formulaires et la réglementation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-[#29abe2] text-white font-semibold px-7 py-3.5 rounded-full hover:bg-[#1a9fd6] transition-all">
                  Démarrer mon dossier
                </Link>
                <Link href="/renovation-maison" className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-[#3d3d3d] font-semibold px-7 py-3.5 rounded-full hover:border-[#29abe2] transition-all">
                  Voir nos services rénovation
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

      {/* ── TRAVAUX CONCERNÉS ── */}
      <section className="relative py-20 bg-transparent">
        <SectionCloud />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#3d3d3d] mb-4">Quels travaux de rénovation nécessitent une autorisation ?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Toutes les autorisations ci-dessous sont prises en charge par Projego, 100% en ligne.
            </p>
          </AnimatedSection>
          <div className="grid lg:grid-cols-2 gap-8">
            {travauxAvecAutorisation.map((cat) => (
              <AnimatedSection key={cat.type}>
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden h-full">
                  <div className={`px-6 py-4 flex items-center gap-3 ${cat.type === 'DP' ? 'bg-[#29abe2]/10' : 'bg-[#3d3d3d]/5'}`}>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${cat.type === 'DP' ? 'bg-[#29abe2] text-white' : 'bg-[#3d3d3d] text-white'}`}>{cat.type}</span>
                    <span className="font-bold text-[#3d3d3d]">{cat.label}</span>
                  </div>
                  <ul className="p-6 space-y-3">
                    {cat.travaux.map((t) => (
                      <li key={t.title} className="flex items-start gap-3">
                        <svg className="w-4 h-4 text-[#29abe2] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          <p className="font-semibold text-[#3d3d3d] text-sm">{t.title}</p>
                          <p className="text-gray-400 text-xs mt-0.5">{t.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Votre projet n&apos;est pas dans cette liste ?{' '}
              <Link href="/contact" className="text-[#29abe2] font-semibold">Contactez-nous</Link>
              , on l&apos;analyse gratuitement.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── PROCESSUS ── */}
      <section className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#3d3d3d] mb-4">Comment ça marche ?</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Tout se passe en ligne. Vous n&apos;avez qu&apos;à nous décrire vos travaux.</p>
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

      {/* ── FAQ ── */}
      <section className="relative py-20 bg-transparent">
        <SectionCloud />
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
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-2">Aller plus loin</h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/declaration-prealable" className="group block border-2 border-gray-100 hover:border-[#29abe2] rounded-2xl p-6 transition-all hover:shadow-md">
              <h3 className="font-bold text-[#3d3d3d] group-hover:text-[#29abe2] transition-colors mb-1">Déclaration Préalable</h3>
              <p className="text-gray-500 text-sm">Tout sur la DP : cas concernés, pièces du dossier, délais d&apos;instruction.</p>
              <span className="text-[#29abe2] text-sm font-semibold mt-3 inline-block">En savoir plus →</span>
            </Link>
            <Link href="/declaration-prealable-en-ligne" className="group block border-2 border-gray-100 hover:border-[#29abe2] rounded-2xl p-6 transition-all hover:shadow-md">
              <h3 className="font-bold text-[#3d3d3d] group-hover:text-[#29abe2] transition-colors mb-1">Déclaration Préalable en Ligne</h3>
              <p className="text-gray-500 text-sm">Notre service 100% dématérialisé pour déposer votre DP sans vous déplacer.</p>
              <span className="text-[#29abe2] text-sm font-semibold mt-3 inline-block">En savoir plus →</span>
            </Link>
          </div>
        </div>
      </section>

      <ServiceCTA
        title="Vos travaux de rénovation méritent un dossier sans faille"
        description="Décrivez-nous vos travaux. On analyse la faisabilité gratuitement, on identifie la bonne autorisation et on vous prépare le dossier complet — pour que vous puissiez commencer à rénover l'esprit tranquille."
        photo="/69a21054581df_Capturedecran2026-02-27a22.42.46.png"
      />
    </>
  );
}
