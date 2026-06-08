import type { Metadata } from 'next';
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';
import PageHero from '@/components/PageHero';
import { PageBackground } from '@/components/PageBackground';
import { ServiceCTA } from '@/components/ServiceCTA';
import { SectionCloud } from '@/components/SectionCloud';

export const metadata: Metadata = {
  title: 'Permis de Construire en Ligne — Dossier complet 48-72h, toute la France',
  description:
    "Obtenez votre permis de construire en ligne avec Projego : dossier complet en 48-72h, 100% dématérialisé, partout en France. Architectes DPLG partenaires si besoin.",
  openGraph: {
    title: 'Permis de Construire en Ligne — Dossier complet 48-72h | Projego',
    description:
      "Obtenez votre permis de construire en ligne avec Projego : dossier complet en 48-72h, 100% dématérialisé, partout en France. Architectes DPLG partenaires si besoin.",
    url: 'https://www.projego.fr/permis-construire-en-ligne',
    type: 'website',
  },
};

const avantages = [
  {
    icon: '💻',
    title: '100% en ligne',
    desc: 'Tout se passe à distance : échanges, envoi des documents, livraison du dossier. Pas de déplacement nécessaire.',
  },
  {
    icon: '⚡',
    title: 'Dossier en 48-72h',
    desc: 'Une fois vos documents reçus, nous constituons votre dossier complet en 48 à 72 heures.',
  },
  {
    icon: '🇫🇷',
    title: 'Toute la France',
    desc: "Nous intervenons dans toutes les communes françaises. Pas de limite géographique.",
  },
  {
    icon: '🏛️',
    title: 'Architectes DPLG partenaires',
    desc: "Pour les surfaces de plancher supérieures à 150 m², nous mobilisons un architecte DPLG partenaire.",
  },
];

const inclus = [
  { code: 'Cerfa', title: 'Formulaire Cerfa', desc: "Cerfa n°13406 rempli et signé" },
  { code: 'PC1', title: 'Plan de situation', desc: "Localisation du terrain dans la commune" },
  { code: 'PC2', title: 'Plan de masse coté 3D', desc: "Emprise, accès, réseaux, plantations" },
  { code: 'PC3', title: 'Plan en coupe', desc: "Coupe du terrain et du bâtiment coté" },
  { code: 'PC4', title: 'Notice descriptive', desc: "Présentation du terrain et du projet" },
  { code: 'PC5', title: 'Plans de façades', desc: "4 façades avec matériaux et couleurs" },
  { code: 'PC7', title: 'Document graphique', desc: "Simulation d'insertion dans le paysage" },
  { code: 'PC8', title: 'Photographies', desc: "Vues depuis et vers le terrain" },
];

const steps = [
  {
    n: '01',
    title: 'Vous nous contactez en ligne',
    desc: 'Décrivez votre projet via notre formulaire. Réponse sous 24h avec une étude de faisabilité gratuite.',
  },
  {
    n: '02',
    title: 'Envoi de vos documents',
    desc: 'Vous nous transmettez les informations nécessaires (photos, plan cadastral, descriptif). Tout se fait par e-mail.',
  },
  {
    n: '03',
    title: 'Constitution du dossier',
    desc: "Nous préparons l'intégralité des pièces : plans, notice, formulaire Cerfa — rien ne manque.",
  },
  {
    n: '04',
    title: 'Livraison & dépôt',
    desc: "Vous recevez votre dossier complet en 48-72h. Dépôt en mairie en ligne (via Démarches Simplifiées) ou par courrier.",
  },
];

const faq = [
  {
    q: "Peut-on vraiment déposer un permis de construire entièrement en ligne ?",
    a: "Oui. Depuis janvier 2022, toutes les communes de plus de 3 500 habitants sont tenues d'accepter les dépôts de permis de construire via la plateforme nationale Démarches Simplifiées (ou leur propre portail). Pour les communes plus petites, le dépôt par courrier recommandé reste l'option la plus fiable. Projego vous livre un dossier prêt pour les deux modes de dépôt.",
  },
  {
    q: "Quels documents dois-je fournir pour démarrer ?",
    a: "Le minimum pour une première étude : l'adresse du terrain, la nature de votre projet (maison neuve, extension, surélévation...), les surfaces envisagées et quelques photos. Nous vous demanderons ensuite les documents complémentaires (plan cadastral, devis d'entreprise si disponible) uniquement s'ils sont nécessaires.",
  },
  {
    q: "Faut-il un architecte pour un permis de construire en ligne ?",
    a: "L'architecte est obligatoire uniquement si la surface de plancher du projet dépasse 150 m² (pour les particuliers). En dessous, Projego peut constituer et signer le dossier. Au-dessus de ce seuil, nous faisons appel à l'un de nos architectes DPLG partenaires, sans que vous ayez à en chercher un vous-même.",
  },
  {
    q: "Combien de temps dure l'instruction du permis de construire ?",
    a: "Le délai légal d'instruction est de 2 mois pour une maison individuelle, 3 mois pour les autres constructions. Ce délai commence à courir à réception du dossier complet par la mairie. Un dossier incomplet provoque des demandes de pièces et rallonge ce délai — d'où l'importance de constituer un dossier solide dès le premier dépôt.",
  },
  {
    q: "Quel est le délai de Projego pour préparer le dossier ?",
    a: "Nous livrons le dossier complet en 48 à 72 heures ouvrées à compter de la réception de tous les éléments nécessaires. Pour les projets complexes nécessitant un architecte, comptez 3 à 5 jours ouvrés.",
  },
  {
    q: "Intervenez-vous partout en France ?",
    a: "Oui, notre service de permis de construire en ligne couvre l'ensemble du territoire français. Notre expertise de terrain est ancrée en Vendée (Beaurepaire, Les Herbiers, Montaigu...) mais nous traitons des dossiers dans toutes les communes, avec la même rigueur.",
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

export default function PermisEnLignePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PageBackground />
      <PageHero
        title="Permis de Construire en Ligne — Dossier complet en 48-72h, toute la France"
        subtitle="100% dématérialisé. Architectes DPLG partenaires si besoin."
        badge="Service Type A — Toute la France"
        typewriterTexts={["maison neuve", "extension > 40m²", "surélévation", "transformation de combles"]}
      />

      {/* ── INTRO ── */}
      <section className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <span className="text-xs font-bold uppercase tracking-widest text-[#29abe2] mb-3 block">Service 100% en ligne</span>
              <h2 className="text-3xl font-bold text-[#3d3d3d] mb-6">Votre permis de construire, sans vous déplacer</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Obtenir un permis de construire implique de maîtriser le PLU de votre commune, de rassembler jusqu&apos;à 8 pièces graphiques et administratives, et de les assembler dans les règles. Une erreur ou un oubli entraîne des demandes de compléments qui repoussent l&apos;instruction de plusieurs semaines.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Projego prend en charge l&apos;intégralité de cette démarche <strong>à distance</strong>. Vous nous envoyez les informations sur votre projet, nous constituons le dossier complet en 48-72h et vous le livrons prêt à déposer — en mairie ou en ligne via Démarches Simplifiées.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Pour les projets dont la surface de plancher dépasse 150 m², nous mobilisons l&apos;un de nos <strong>architectes DPLG partenaires</strong> — sans démarche supplémentaire de votre côté.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-[#29abe2] text-white font-semibold px-7 py-3.5 rounded-full hover:bg-[#1a9fd6] transition-all">
                Démarrer mon dossier
              </Link>
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

      {/* ── PIÈCES DU DOSSIER ── */}
      <section className="relative py-20 bg-transparent">
        <SectionCloud />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#3d3d3d] mb-4">Ce qui est inclus dans votre dossier</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Nous préparons l&apos;intégralité des pièces obligatoires. Rien à prévoir de votre côté.
            </p>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {inclus.map((doc, i) => (
              <AnimatedSection key={doc.code} delay={i * 0.05}>
                <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-5">
                  <span className="text-xs font-bold bg-[#29abe2] text-white px-2.5 py-1 rounded-full mb-3 inline-block">{doc.code}</span>
                  <p className="font-semibold text-[#3d3d3d] text-sm mb-1">{doc.title}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{doc.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESSUS ── */}
      <section className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#3d3d3d] mb-4">Comment ça se passe, de A à Z ?</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Un process simple, entièrement dématérialisé.</p>
          </AnimatedSection>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <AnimatedSection key={s.n} delay={i * 0.1}>
                <div className="text-center">
                  <div className="w-14 h-14 bg-[#29abe2] text-white font-bold text-xl rounded-full flex items-center justify-center mx-auto mb-4">{s.n}</div>
                  <h3 className="font-bold text-[#3d3d3d] mb-2">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── ARCHITECTES DPLG ── */}
      <section className="relative py-20 bg-transparent">
        <SectionCloud />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="bg-white rounded-2xl p-8 md:p-12 border-2 border-[#29abe2]/20">
              <span className="text-xs font-bold uppercase tracking-widest text-[#29abe2] mb-3 block">Pour les projets &gt; 150 m²</span>
              <h2 className="text-2xl font-bold text-[#3d3d3d] mb-4">Architectes DPLG partenaires disponibles</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                La loi impose le recours à un architecte lorsque la surface de plancher du projet dépasse <strong>150 m²</strong>. Pour couvrir ces cas, Projego travaille avec un réseau d&apos;architectes DPLG (Diplômés Par Le Gouvernement) partenaires.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Concrètement : vous n&apos;avez pas à chercher un architecte vous-même. Nous faisons le lien, coordonnons les échanges et vous livrons le dossier signé, prêt à déposer — toujours en ligne, toujours depuis chez vous.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Maison neuve > 150 m²', 'Extension portant le total > 150 m²', 'Surélévation avec surface > 150 m²'].map((cas) => (
                  <span key={cas} className="text-sm bg-[#29abe2]/10 text-[#29abe2] px-3 py-1.5 rounded-full font-medium">{cas}</span>
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
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-2">En savoir plus sur nos services</h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/permis-de-construire" className="group block border-2 border-gray-100 hover:border-[#29abe2] rounded-2xl p-6 transition-all hover:shadow-md">
              <h3 className="font-bold text-[#3d3d3d] group-hover:text-[#29abe2] transition-colors mb-1">Permis de Construire</h3>
              <p className="text-gray-500 text-sm">Tous les détails sur notre service : cas concernés, pièces du dossier, délais d&apos;instruction.</p>
              <span className="text-[#29abe2] text-sm font-semibold mt-3 inline-block">En savoir plus →</span>
            </Link>
            <Link href="/declaration-prealable-en-ligne" className="group block border-2 border-gray-100 hover:border-[#29abe2] rounded-2xl p-6 transition-all hover:shadow-md">
              <h3 className="font-bold text-[#3d3d3d] group-hover:text-[#29abe2] transition-colors mb-1">Déclaration Préalable en Ligne</h3>
              <p className="text-gray-500 text-sm">Piscine, pergola, extension &lt; 40 m² — dossier en ligne en 24-48h.</p>
              <span className="text-[#29abe2] text-sm font-semibold mt-3 inline-block">En savoir plus →</span>
            </Link>
          </div>
        </div>
      </section>

      <ServiceCTA
        title="Votre permis de construire en ligne, en 48-72h"
        description="Décrivez votre projet en quelques lignes. Nous analysons la faisabilité gratuitement et vous préparons un dossier complet et optimisé — sans que vous ayez à vous déplacer."
        photo="/69a21054581df_Capturedecran2026-02-27a22.42.46.png"
      />
    </>
  );
}
