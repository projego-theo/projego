import type { Metadata } from 'next';
import AnimatedSection from '@/components/AnimatedSection';
import PageHero from '@/components/PageHero';
import { PageBackground } from '@/components/PageBackground';
import { ServiceCTA } from '@/components/ServiceCTA';
import { SectionCloud } from '@/components/SectionCloud';
import StartProjectButton from '@/components/StartProjectButton';

export const metadata: Metadata = {
  title: 'Construction Maison Neuve Vendée — Plans sur mesure',
  description: "Projego conçoit votre maison neuve sur mesure en Vendée : plans 2D, modélisation 3D, permis de construire. Chaque maison est unique.",
  openGraph: {
    title: 'Construction Maison Neuve en Vendée — Plans sur mesure | Projego',
    description: "Projego conçoit votre maison neuve sur mesure en Vendée : plans 2D, modélisation 3D, permis de construire. Chaque maison est unique.",
    url: 'https://www.projego.fr/construction-maison-neuve',
    type: 'website',
  },
};

const included = [
  { step: '01', title: 'Étude de terrain', desc: "Analyse du PLU, contraintes réglementaires, orientation et implantation optimale." },
  { step: '02', title: 'Esquisse architecturale', desc: "Première ébauche du projet pour valider le concept et les grandes lignes." },
  { step: '03', title: 'Plans 2D détaillés', desc: "Plans de masse, de façades, de coupe et plans intérieurs cotés." },
  { step: '04', title: 'Rendu 3D photoréaliste', desc: "Visualisation de votre future maison avant le premier coup de pioche." },
  { step: '05', title: 'Permis de construire', desc: "Constitution et dépôt du dossier complet de permis de construire." },
  { step: '06', title: 'Consultation entreprises', desc: "Appel d'offres, analyse des devis et recommandation des artisans." },
  { step: '07', title: 'Suivi de chantier', desc: "Option : visites régulières, comptes-rendus et réception finale des travaux." },
];

const advantages = [
  { title: "Maison 100% personnalisée", desc: "Pas de catalogue, pas de plan type. Votre maison est conçue selon votre mode de vie, vos goûts et votre terrain." },
  { title: "Économies vs constructeur", desc: "Pas de marge intermédiaire sur les travaux. Vous choisissez vos artisans et maîtrisez votre budget." },
  { title: "Accompagnement complet", desc: "Un seul interlocuteur de l'esquisse jusqu'à la remise des clés. Disponibilité et réactivité garanties." },
  { title: "Expertise locale", desc: "Connaissance parfaite des PLU vendéens, des artisans locaux et des contraintes du territoire." },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Construction maison neuve',
  provider: { '@type': 'LocalBusiness', name: 'Projego', url: 'https://www.projego.fr' },
  areaServed: 'Vendée',
  description: 'Conception et réalisation de maisons neuves sur mesure en Vendée : plans 2D/3D, permis de construire, coordination des entreprises.',
  serviceType: 'Maîtrise d\'œuvre',
};

export default function ConstructionMaisonNeuvePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <PageBackground />
      <PageHero
        title="Construction Maison Neuve en Vendée — Plans sur mesure"
        subtitle="Votre maison sur mesure en Vendée — plans personnalisés, rendu 3D, permis de construire et coordination des entreprises."
        badge="Maîtrise d'œuvre — Vendée 30 km"
        typewriterTexts={["plans uniques", "modélisation 3D", "permis de construire", "votre maison sur mesure"]}
      />

      <section className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <h2 className="text-3xl font-bold text-[#3d3d3d] mb-6">Votre maison de rêve,<br />conçue sur mesure</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Construire sa maison est le projet d&apos;une vie. Projego vous accompagne à chaque étape avec une approche personnalisée, loin des plans catalogue des constructeurs traditionnels.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Nous concevons votre maison selon <strong>votre terrain, votre mode de vie et votre budget</strong>, en respectant les règles d&apos;urbanisme locales.
              </p>
              <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-6 mb-6">
                <p className="text-sm font-bold text-[#3d3d3d] mb-1">Seuil d&apos;intervention</p>
                <p className="text-gray-500 text-sm">Nous intervenons sans architecte pour les maisons jusqu&apos;à <strong>150 m² de surface de plancher</strong>. Au-delà, nous collaborons avec des architectes partenaires.</p>
              </div>
              <StartProjectButton className="inline-flex items-center gap-2 bg-[#29abe2] text-white font-semibold px-7 py-3.5 rounded-full hover:bg-[#1a9fd6] transition-all">
                Un besoin ? Contactez-nous
              </StartProjectButton>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="grid grid-cols-2 gap-4">
                {advantages.map((a) => (
                  <div key={a.title} className="bg-white shadow-sm border border-gray-100 rounded-2xl p-5">
                    <svg className="w-5 h-5 text-[#29abe2] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    <p className="font-bold text-[#3d3d3d] text-sm mb-1">{a.title}</p>
                    <p className="text-gray-500 text-xs leading-relaxed">{a.desc}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── ÉTAPES ── */}
      <section className="relative py-20 bg-transparent">
        <SectionCloud />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#3d3d3d] mb-4">Nos étapes de mission</h2>
            <p className="text-gray-500 max-w-xl mx-auto">De l&apos;analyse du terrain à la réception des travaux, voici comment nous travaillons.</p>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {included.map((s, i) => (
              <AnimatedSection key={s.step} delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-6 h-full border border-gray-100">
                  <span className="text-xs font-bold bg-[#29abe2] text-white px-2.5 py-1 rounded-full mb-3 inline-block">{s.step}</span>
                  <h3 className="font-bold text-[#3d3d3d] mb-2 text-sm">{s.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── TARIFS ── */}
      <section className="py-20 bg-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#3d3d3d] mb-4">Nos honoraires</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Mission PC seule', price: 'Sur devis', desc: "Plans + permis de construire uniquement, sans suivi de chantier.", features: ['Plans 2D complets', 'Rendu 3D', 'Permis de construire'] },
              { title: 'Mission complète', price: 'Sur devis', desc: "Conception, permis, consultation entreprises et suivi de chantier.", features: ['Tout compris', 'Consultation entreprises', 'Suivi de chantier', 'Réception des travaux'], featured: true },
              { title: 'Mission partielle', price: 'Sur devis', desc: "Vous choisissez les étapes dont vous avez besoin.", features: ['À la carte', 'Souplesse maximale', 'Tarif horaire ou forfait'] },
            ].map((plan) => (
              <AnimatedSection key={plan.title}>
                <div className={`rounded-2xl p-7 h-full ${plan.featured ? 'bg-[#3d3d3d] text-white' : 'bg-white shadow-sm border border-gray-100'}`}>
                  <h3 className={`font-bold text-lg mb-1 ${plan.featured ? 'text-white' : 'text-[#3d3d3d]'}`}>{plan.title}</h3>
                  <p className={`text-2xl font-bold mb-2 ${plan.featured ? 'text-[#29abe2]' : 'text-[#29abe2]'}`}>{plan.price}</p>
                  <p className={`text-sm mb-5 ${plan.featured ? 'text-gray-300' : 'text-gray-500'}`}>{plan.desc}</p>
                  <ul className="space-y-2">
                    {plan.features.map((f) => (
                      <li key={f} className={`flex items-center gap-2 text-sm ${plan.featured ? 'text-gray-200' : 'text-gray-600'}`}>
                        <svg className="w-4 h-4 text-[#29abe2] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection className="mt-8 text-center">
            <p className="text-gray-400 text-sm">Les honoraires sont calculés en fonction de la complexité et de la surface du projet. Devis personnalisé gratuit.</p>
          </AnimatedSection>
        </div>
      </section>

      <ServiceCTA
        title="Construisons votre projet ensemble"
        description="Premier rendez-vous gratuit et sans engagement. Parlez-nous de votre terrain, de vos envies et de votre budget."
        photo="/69a577618e65c_ChatGPTImage2mars202612_36_08.png"
      />
    </>
  );
}
