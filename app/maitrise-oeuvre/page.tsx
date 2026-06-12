import type { Metadata } from 'next';
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';
import PageHero from '@/components/PageHero';
import { PageBackground } from '@/components/PageBackground';
import { ServiceCTA } from '@/components/ServiceCTA';
import { SectionCloud } from '@/components/SectionCloud';
import StartProjectButton from '@/components/StartProjectButton';

export const metadata: Metadata = {
  title: "Maîtrise d'œuvre en Vendée — Conception et suivi de projet",
  description: "Projego assure la maîtrise d'œuvre de vos projets de construction, extension et rénovation en Vendée (30km autour des Herbiers). Plans 2D/3D, permis, suivi.",
  openGraph: {
    title: "Maîtrise d'œuvre en Vendée — Conception et suivi de projet | Projego",
    description: "Projego assure la maîtrise d'œuvre de vos projets de construction, extension et rénovation en Vendée (30km autour des Herbiers). Plans 2D/3D, permis, suivi.",
    url: 'https://www.projego.fr/maitrise-oeuvre',
    type: 'website',
  },
};

const faq = [
  {
    q: "Quelle est la différence entre un architecte et un maître d'œuvre ?",
    a: "L'architecte est un professionnel libéral diplômé, obligatoire pour les projets dépassant 150 m² de surface de plancher. Le maître d'œuvre (MOe) comme Projego intervient sur les projets sous 150 m² : il assure les mêmes missions (conception, plans, permis, suivi) à des honoraires plus compétitifs (généralement 8 à 12 % du montant des travaux contre 10 à 15 % pour un architecte).",
  },
  {
    q: "Dans quelle zone intervenez-vous pour la maîtrise d'œuvre ?",
    a: "Projego intervient en maîtrise d'œuvre dans un rayon de 30 km autour des Herbiers (Vendée), ce qui couvre notamment : Les Herbiers, Montaigu, Cholet, Bressuire, Pouzauges, Saint-Fulgent, Chantonnay, Mortagne-sur-Sèvre, Tiffauges, Clisson et de nombreuses communes du bocage vendéen. Pour les démarches administratives (DP/PC), nous intervenons partout en France.",
  },
  {
    q: "Quel est le coût d'une mission de maîtrise d'œuvre ?",
    a: "Les honoraires de maîtrise d'œuvre représentent généralement 8 à 12 % du montant HT des travaux. Pour une mission complète (conception + permis + consultation entreprises + suivi de chantier), comptez environ 10 % d'un projet de 200 000 € = 20 000 € d'honoraires. Nous proposons également des missions partielles (conception + permis uniquement) à des tarifs inférieurs. Devis personnalisé et gratuit.",
  },
  {
    q: "La maîtrise d'œuvre est-elle obligatoire ?",
    a: "Non, la maîtrise d'œuvre n'est pas obligatoire (sauf au-delà de 150 m² où un architecte est requis). Cependant, pour un projet de construction ou rénovation important, faire appel à un maître d'œuvre permet d'éviter les malfaçons, de maîtriser les coûts et les délais, et de gérer les relations avec les entreprises. Le coût de la mission est souvent compensé par les économies réalisées.",
  },
  {
    q: "Combien de temps dure une mission de maîtrise d'œuvre ?",
    a: "La durée dépend du projet. Pour une maison neuve : comptez 2 à 4 mois pour la conception et le permis, puis la durée du chantier (12 à 18 mois en moyenne). Pour une extension : 1 à 3 mois de conception + permis, puis 3 à 6 mois de travaux. Pour une rénovation : variable selon l'ampleur. Projego reste votre interlocuteur du début à la fin.",
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

const moeCityLinks = [
  { name: 'Les Herbiers', slug: 'les-herbiers' },
  { name: 'Cholet', slug: 'cholet' },
  { name: 'Montaigu', slug: 'montaigu' },
  { name: 'La Roche-sur-Yon', slug: 'la-roche-sur-yon' },
  { name: 'Bressuire', slug: 'bressuire' },
  { name: 'Saint-Fulgent', slug: 'saint-fulgent' },
  { name: 'Pouzauges', slug: 'pouzauges' },
  { name: 'Chantonnay', slug: 'chantonnay' },
];

const services = [
  {
    icon: '🏠',
    title: 'Construction maison neuve',
    href: '/construction-maison-neuve',
    desc: 'Conception sur mesure, plans 2D/3D, permis de construire et coordination des entreprises pour votre projet clé en main.',
    items: ['Plans personnalisés', 'Rendu 3D photoréaliste', 'Permis de construire', 'Consultation entreprises'],
  },
  {
    icon: '📐',
    title: 'Extension & Surélévation',
    href: '/extension-maison',
    desc: "Agrandissez votre maison horizontalement ou verticalement, avec une intégration architecturale soignée.",
    items: ['Étude de faisabilité', 'Plans d\'extension', 'Déclaration préalable ou PC', 'Suivi des travaux'],
  },
  {
    icon: '🔨',
    title: 'Rénovation',
    href: '/renovation-maison',
    desc: "Transformation complète ou partielle de votre maison ou appartement, de l'esquisse au chantier fini.",
    items: ['Diagnostic existant', 'Conception du projet', 'Consultation entreprises', 'Coordination chantier'],
  },
  {
    icon: '📋',
    title: 'Suivi de chantier',
    href: '/suivi-de-chantier',
    desc: "Service optionnel de pilotage et de contrôle de votre chantier, pour vous assurer que les travaux avancent conformément aux plans.",
    items: ['Visites régulières', 'Compte-rendu hebdomadaire', 'Contrôle de conformité', 'Réception des travaux'],
  },
];

const steps = [
  { n: '01', title: 'Rendez-vous', desc: 'Premier échange gratuit pour comprendre votre projet, votre budget et vos attentes.' },
  { n: '02', title: 'Esquisse & faisabilité', desc: 'Première esquisse du projet et vérification des contraintes réglementaires (PLU).' },
  { n: '03', title: 'Avant-projet', desc: 'Plans détaillés, rendu 3D, descriptif technique et estimation du coût travaux.' },
  { n: '04', title: 'Autorisation', desc: "Constitution et dépôt de la déclaration préalable ou du permis de construire." },
  { n: '05', title: 'Consultation entreprises', desc: "Rédaction du DCE, consultation des artisans locaux, analyse des devis." },
  { n: '06', title: 'Chantier & réception', desc: "Suivi optionnel de l'avancement des travaux et réception finale du chantier." },
];

export default function MaitriseOeuvrePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PageBackground />
      <PageHero
        title="Maîtrise d'œuvre en Vendée — Conception et suivi de projet"
        subtitle="Projego pilote vos projets de construction, extension et rénovation de A à Z, dans un rayon de 30 km autour des Herbiers."
        badge="Service Type B — Vendée • 30 km"
        typewriterTexts={["conception sur mesure", "plans 2D et 3D", "suivi de chantier", "dossier administratif"]}
      />

      <section className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#29abe2] mb-3 block">Nos missions</span>
            <h2 className="text-3xl font-bold text-[#3d3d3d] mb-4">Toutes nos prestations de maîtrise d&apos;œuvre</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Que vous construisiez, agrandissiez ou rénuviez, Projego est votre interlocuteur unique du premier crayon jusqu&apos;à la remise des clés.</p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <AnimatedSection key={service.href} delay={i * 0.1}>
                <Link href={service.href} className="group block h-full">
                  <div className="h-full border-2 border-gray-100 hover:border-[#29abe2] rounded-2xl p-8 transition-all hover:shadow-xl">
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <h3 className="text-xl font-bold text-[#3d3d3d] group-hover:text-[#29abe2] transition-colors mb-3">{service.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-5">{service.desc}</p>
                    <ul className="space-y-2 mb-6">
                      {service.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-gray-600 text-sm">
                          <svg className="w-4 h-4 text-[#29abe2] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <span className="text-[#29abe2] font-semibold text-sm group-hover:underline">En savoir plus →</span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESSUS ── */}
      <section className="relative py-20 bg-transparent">
        <SectionCloud />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#3d3d3d] mb-4">Notre processus</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Un accompagnement structuré à chaque étape de votre projet</p>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <AnimatedSection key={s.n} delay={i * 0.08}>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#29abe2] text-white font-bold rounded-full flex items-center justify-center flex-shrink-0 text-sm">{s.n}</div>
                  <div>
                    <h3 className="font-bold text-[#3d3d3d] mb-1">{s.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── ZONE ── */}
      <section className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <h2 className="text-3xl font-bold text-[#3d3d3d] mb-4">Zone d&apos;intervention</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Basés à <strong>Beaurepaire (85)</strong>, nous intervenons dans un rayon de 30 km pour tous nos services de maîtrise d&apos;œuvre. Cette zone couvre une grande partie du bocage vendéen et des communes limitrophes (Deux-Sèvres, Maine-et-Loire, Loire-Atlantique).
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Beaurepaire (85)', 'Montaigu', 'Cholet', 'Bressuire', 'Pouzauges', 'Saint-Fulgent', 'Mortagne-sur-Sèvre', 'Tiffauges', 'Chantonnay', 'Clisson', 'Legé'].map((city) => (
                  <span key={city} className="text-xs bg-white border border-gray-200 text-[#3d3d3d] px-3 py-1.5 rounded-full">{city}</span>
                ))}
                <span className="text-xs bg-[#29abe2]/10 text-[#29abe2] px-3 py-1.5 rounded-full font-semibold">+30 communes</span>
              </div>
              <StartProjectButton className="inline-flex items-center gap-2 bg-[#29abe2] text-white font-semibold px-7 py-3.5 rounded-full hover:bg-[#1a9fd6] transition-all">
                Vérifier si vous êtes dans la zone
              </StartProjectButton>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-8">
                <h3 className="font-bold text-[#3d3d3d] mb-4">Pourquoi Projego ?</h3>
                <div className="space-y-4">
                  {[
                    { icon: '🎯', title: 'Interlocuteur unique', desc: 'Un seul contact du début à la fin de votre projet' },
                    { icon: '💰', title: 'Honoraires compétitifs', desc: 'Alternative économique à l\'architecte pour les projets sous 150 m²' },
                    { icon: '🔧', title: 'Réseau local de confiance', desc: 'Artisans vendéens sélectionnés pour leur qualité et fiabilité' },
                    { icon: '📍', title: 'Connaissance du territoire', desc: 'Maîtrise parfaite des PLU locaux et des spécificités vendéennes' },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                      <div className="text-2xl">{item.icon}</div>
                      <div>
                        <p className="font-semibold text-[#3d3d3d] text-sm">{item.title}</p>
                        <p className="text-gray-500 text-xs mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
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

      {/* ── LIENS VILLES ── */}
      <section className="py-12 bg-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <p className="text-gray-400 text-sm mb-4">Maîtrise d&apos;œuvre par ville :</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {moeCityLinks.map((city) => (
                <Link
                  key={city.slug}
                  href={`/maitrise-oeuvre/${city.slug}`}
                  className="text-xs bg-white border border-gray-200 text-[#3d3d3d] hover:border-[#29abe2] hover:text-[#29abe2] px-3 py-1.5 rounded-full transition-all"
                >
                  MOe {city.name}
                </Link>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <ServiceCTA
        title="Parlez-nous de votre projet"
        description="Premier rendez-vous gratuit et sans engagement. Nous étudions votre projet et vous proposons une solution adaptée à votre budget."
        photo="/69a2126908188_Capturedecran2026-02-27a22.52.17.png"
      />
    </>
  );
}
