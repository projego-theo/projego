import type { Metadata } from 'next';
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';
import PageHero from '@/components/PageHero';
import { PageBackground } from '@/components/PageBackground';
import { ServiceCTA } from '@/components/ServiceCTA';
import { SectionCloud } from '@/components/SectionCloud';

export const metadata: Metadata = {
  title: "Autoconstruction Maison — Permis de Construire & Démarches pris en charge",
  description:
    "Vous construisez votre maison vous-même ? Projego gère toutes vos démarches administratives (permis de construire, DP) 100% en ligne, partout en France. Architectes DPLG partenaires si besoin.",
  openGraph: {
    title: "Autoconstruction Maison — Démarches administratives prises en charge | Projego",
    description:
      "Vous construisez votre maison vous-même ? Projego gère toutes vos démarches administratives (permis de construire, DP) 100% en ligne, partout en France. Architectes DPLG partenaires si besoin.",
    url: 'https://www.projego.fr/autoconstruction-maison',
    type: 'website',
  },
};

const priseEnCharge = [
  {
    icon: '📋',
    title: 'Permis de construire',
    desc: 'Constitution du dossier complet (Cerfa, plans, notice, photos) en 48-72h. Architecte DPLG mobilisé si surface &gt; 150 m².',
  },
  {
    icon: '📄',
    title: 'Déclaration préalable',
    desc: 'Pour les annexes, abris, clôtures ou modifications d\'aspect liés à votre projet. Dossier en 24-48h.',
  },
  {
    icon: '🗺️',
    title: 'Analyse PLU',
    desc: 'Vérification des règles d\'urbanisme de votre commune avant de démarrer : COS, prospect, hauteur, aspect.',
  },
  {
    icon: '🏛️',
    title: 'Architectes DPLG partenaires',
    desc: 'Obligatoire au-delà de 150 m² de surface de plancher. Nous gérons le lien — sans démarche de votre côté.',
  },
];

const etapesAdmin = [
  {
    code: 'PC',
    title: 'Permis de construire',
    desc: 'Obligatoire pour toute maison neuve, quelle que soit sa surface. Instruction : 2 mois pour une maison individuelle.',
  },
  {
    code: 'DOC',
    title: "Déclaration d'ouverture de chantier",
    desc: "À déposer en mairie avant le début des travaux. Formalité rapide, mais obligatoire pour faire courir les délais légaux.",
  },
  {
    code: 'AFF',
    title: 'Affichage du permis',
    desc: "Le panneau de permis doit être affiché sur le terrain dès l'obtention de l'autorisation et pendant toute la durée du chantier.",
  },
  {
    code: 'DAACT',
    title: 'Déclaration d\'achèvement',
    desc: "La DAACT (Déclaration Attestant l'Achèvement et la Conformité des Travaux) doit être déposée en fin de chantier.",
  },
];

const steps = [
  {
    n: '01',
    title: 'Vous nous décrivez votre projet',
    desc: 'Surface, commune, type de construction. On répond sous 24h avec une analyse de faisabilité gratuite.',
  },
  {
    n: '02',
    title: 'On analyse votre PLU',
    desc: "Vérification des règles locales : zonage, coefficient d'emprise, hauteur maximale, aspect extérieur.",
  },
  {
    n: '03',
    title: 'On monte le dossier',
    desc: 'Plans, Cerfa, notice, document graphique — l\'intégralité des pièces, sans rien à préparer de votre côté.',
  },
  {
    n: '04',
    title: 'Vous déposez, vous construisez',
    desc: "Dossier livré en 48-72h, prêt à déposer en mairie. Vous passez directement à l'action sur votre chantier.",
  },
];

const faq = [
  {
    q: "Un autoconstructeur a-t-il besoin d'un permis de construire ?",
    a: "Oui, sans exception. Toute construction d'une maison individuelle neuve est soumise à permis de construire, quelle que soit la surface et que vous fassiez appel à des entreprises ou que vous construisiez vous-même. Le statut d'autoconstructeur ne dispense d'aucune obligation administrative. C'est précisément pour ça que Projego intervient : vous concentrer sur le chantier pendant qu'on gère le dossier.",
  },
  {
    q: "Faut-il obligatoirement un architecte pour une autoconstruction ?",
    a: "Oui, si la surface de plancher dépasse 150 m². En dessous de ce seuil, un maître d'œuvre comme Projego peut constituer et signer le dossier. Pour les projets à plus de 150 m², nous faisons appel à l'un de nos architectes DPLG partenaires — vous n'avez pas à en trouver un vous-même.",
  },
  {
    q: "Combien de temps faut-il pour obtenir un permis de construire ?",
    a: "L'instruction légale est de 2 mois pour une maison individuelle. Ce délai court à compter du dépôt d'un dossier complet et conforme. Un dossier incomplet provoque des demandes de pièces et peut repousser l'instruction de plusieurs semaines. Projego prépare le dossier en 48-72h pour vous permettre de déposer rapidement avec un maximum de chances d'obtenir une réponse favorable.",
  },
  {
    q: "Intervenez-vous partout en France pour les autoconstructeurs ?",
    a: "Oui, notre service est 100% en ligne. Que vous construisiez en Vendée, en Bretagne, en Île-de-France ou dans le Sud, nous consultons le PLU de votre commune et préparons le dossier adapté. Aucun déplacement n'est nécessaire de votre côté.",
  },
  {
    q: "Quelles démarches dois-je gérer moi-même en tant qu'autoconstructeur ?",
    a: "En dehors du permis de construire que nous prenons en charge, vous devrez : souscrire une assurance dommages-ouvrage (DO) avant le démarrage, déposer la déclaration d'ouverture de chantier (DOC), afficher le panneau de permis sur le terrain, et déposer la DAACT (déclaration d'achèvement) en fin de chantier. Nous pouvons vous accompagner sur chacune de ces étapes.",
  },
  {
    q: "Peut-on faire une déclaration préalable en même temps qu'un permis de construire ?",
    a: "Dans la plupart des cas, le permis de construire inclut tous les éléments nécessaires pour la construction principale. Certains aménagements annexes (clôture, portail, abri de jardin indépendant) peuvent nécessiter une déclaration préalable séparée. Nous évaluons votre projet dans sa globalité et vous indiquons exactement ce qu'il faut déposer.",
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

export default function AutoconstructionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PageBackground />
      <PageHero
        title="Vous construisez votre maison vous-même ? On gère toutes vos démarches."
        subtitle="Permis de construire, analyse PLU, architectes DPLG si besoin. 100% en ligne, toute la France."
        badge="Autoconstruction — Service Type A"
        typewriterTexts={["maison individuelle", "maison passive", "maison ossature bois", "tiny house", "maison en paille"]}
      />

      {/* ── INTRO ── */}
      <section className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <span className="text-xs font-bold uppercase tracking-widest text-[#29abe2] mb-3 block">Pour les autoconstructeurs</span>
              <h2 className="text-3xl font-bold text-[#3d3d3d] mb-6">Concentrez-vous sur votre chantier. On s&apos;occupe du reste.</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                L&apos;autoconstruction, c&apos;est un projet de vie. Des mois de préparation, d&apos;apprentissage, de travail de vos mains. La dernière chose dont vous avez besoin, c&apos;est de passer des heures à décrypter un PLU ou à composer un dossier de permis de construire.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Projego prend en charge <strong>l&apos;intégralité de vos démarches administratives</strong> à distance. Vous nous envoyez les informations sur votre projet, on analyse les règles d&apos;urbanisme de votre commune et on vous livre un dossier complet en 48-72h — prêt à déposer en mairie.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Si votre surface dépasse 150 m², on mobilise l&apos;un de nos <strong>architectes DPLG partenaires</strong>. Pas de recherche de votre côté : on gère le lien.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-[#29abe2] text-white font-semibold px-7 py-3.5 rounded-full hover:bg-[#1a9fd6] transition-all">
                Démarrer mon dossier
              </Link>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="grid grid-cols-2 gap-4">
                {priseEnCharge.map((item) => (
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

      {/* ── ÉTAPES ADMIN AUTOCONSTRUCTION ── */}
      <section className="relative py-20 bg-transparent">
        <SectionCloud />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#3d3d3d] mb-4">Les démarches clés d&apos;une autoconstruction</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              De la demande de permis à la déclaration d&apos;achèvement, voici les étapes administratives incontournables — et ce que Projego prend en charge.
            </p>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {etapesAdmin.map((e, i) => (
              <AnimatedSection key={e.code} delay={i * 0.07}>
                <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-5 h-full hover:border-[#29abe2]/30 hover:shadow-md transition-all">
                  <span className="text-xs font-bold bg-[#29abe2] text-white px-2.5 py-1 rounded-full mb-3 inline-block">{e.code}</span>
                  <p className="font-semibold text-[#3d3d3d] text-sm mb-2">{e.title}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{e.desc}</p>
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
            <h2 className="text-3xl font-bold text-[#3d3d3d] mb-4">Comment ça se passe ?</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Quatre étapes simples. Vous n&apos;avez qu&apos;à nous décrire votre projet.</p>
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
              <span className="text-xs font-bold uppercase tracking-widest text-[#29abe2] mb-3 block">Surface &gt; 150 m²</span>
              <h2 className="text-2xl font-bold text-[#3d3d3d] mb-4">Architecte DPLG : on s&apos;en charge</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                La loi impose le recours à un architecte dès que la surface de plancher dépasse <strong>150 m²</strong>. Pour les autoconstructeurs qui projettent une maison de grande surface, trouver un architecte qui accepte de signer un dossier sans assurer la maîtrise d&apos;œuvre peut être compliqué.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Projego travaille avec un réseau d&apos;architectes DPLG partenaires habitués aux projets en autoconstruction. Nous coordonnons les échanges et vous livrons le dossier signé, sans que vous ayez à chercher ou négocier avec un cabinet.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Maison individuelle &gt; 150 m²', 'Extension portant le total &gt; 150 m²', 'Construction passive grande surface'].map((cas) => (
                  <span key={cas} className="text-sm bg-[#29abe2]/10 text-[#29abe2] px-3 py-1.5 rounded-full font-medium" dangerouslySetInnerHTML={{ __html: cas }} />
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
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-2">En savoir plus</h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/permis-de-construire" className="group block border-2 border-gray-100 hover:border-[#29abe2] rounded-2xl p-6 transition-all hover:shadow-md">
              <h3 className="font-bold text-[#3d3d3d] group-hover:text-[#29abe2] transition-colors mb-1">Permis de Construire</h3>
              <p className="text-gray-500 text-sm">Tout sur le dossier PC : pièces obligatoires, délais d&apos;instruction, cas concernés.</p>
              <span className="text-[#29abe2] text-sm font-semibold mt-3 inline-block">En savoir plus →</span>
            </Link>
            <Link href="/permis-construire-en-ligne" className="group block border-2 border-gray-100 hover:border-[#29abe2] rounded-2xl p-6 transition-all hover:shadow-md">
              <h3 className="font-bold text-[#3d3d3d] group-hover:text-[#29abe2] transition-colors mb-1">Permis de Construire en Ligne</h3>
              <p className="text-gray-500 text-sm">Notre service 100% dématérialisé : comment ça marche, ce qui est inclus.</p>
              <span className="text-[#29abe2] text-sm font-semibold mt-3 inline-block">En savoir plus →</span>
            </Link>
          </div>
        </div>
      </section>

      <ServiceCTA
        title="Votre autoconstruction mérite un dossier sans faille"
        description="Décrivez-nous votre projet en quelques lignes. On analyse la faisabilité gratuitement et on vous prépare le dossier complet — pour que vous puissiez vous concentrer sur ce qui compte vraiment : construire."
        photo="/69a21054581df_Capturedecran2026-02-27a22.42.46.png"
      />
    </>
  );
}
