import type { Metadata } from 'next';
import AnimatedSection from '@/components/AnimatedSection';
import PageHero from '@/components/PageHero';
import { PageBackground } from '@/components/PageBackground';
import { ServiceCTA } from '@/components/ServiceCTA';
import { SectionCloud } from '@/components/SectionCloud';
import StartProjectButton from '@/components/StartProjectButton';

export const metadata: Metadata = {
  title: "Rénovation Maison et Appartement Vendée",
  description: "Projego accompagne vos projets de rénovation en Vendée : redistribution des espaces, plans projetés, démarches administratives si nécessaires.",
  openGraph: {
    title: "Rénovation Maison et Appartement Vendée | Projego",
    description: "Projego accompagne vos projets de rénovation en Vendée : redistribution des espaces, plans projetés, démarches administratives si nécessaires.",
    url: 'https://www.projego.fr/renovation-maison',
    type: 'website',
  },
};

const services = [
  "Rénovation complète (intérieure et extérieure)",
  "Réhabilitation de l'enveloppe (isolation, façade, toiture)",
  "Redistribution intérieure (suppression de cloisons, création d'ouvertures)",
  "Rénovation de salle de bains et de cuisine",
  "Mise aux normes électriques et plomberie",
  "Changement de menuiseries (fenêtres, portes)",
  "Remplacement de système de chauffage",
  "Aménagement de sous-sol ou de grenier",
  "Rénovation énergétique (isolation, VMC, pompe à chaleur)",
  "Transformation d'un immeuble en logements",
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Rénovation maison et appartement',
  provider: { '@type': 'LocalBusiness', name: 'Projego', url: 'https://www.projego.fr' },
  areaServed: 'Vendée',
  description: 'Maîtrise d\'œuvre pour vos projets de rénovation en Vendée : diagnostic, conception, consultation entreprises et suivi de chantier.',
  serviceType: 'Maîtrise d\'œuvre',
};

export default function RenovationMaisonPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <PageBackground />
      <PageHero
        title="Rénovation Maison et Appartement en Vendée"
        subtitle="De la conception à la réception, Projego pilote votre rénovation en Vendée avec des artisans locaux de confiance."
        badge="Maîtrise d'œuvre — Vendée 30 km"
        typewriterTexts={["redistribution des espaces", "optimisation des volumes", "plans sur mesure", "nouveau départ"]}
      />

      <section className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <h2 className="text-3xl font-bold text-[#3d3d3d] mb-6">Rénover avec un professionnel à vos côtés</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Une rénovation, surtout complète, est un projet complexe qui nécessite de coordonner de nombreux corps de métier. Sans pilotage, les retards et les malfaçons sont fréquents.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Projego assure la <strong>maîtrise d&apos;œuvre de votre rénovation</strong> : diagnostic de l&apos;existant, conception du projet, consultation des entreprises et suivi de chantier.
              </p>
              <StartProjectButton className="inline-flex items-center gap-2 bg-[#29abe2] text-white font-semibold px-7 py-3.5 rounded-full hover:bg-[#1a9fd6] transition-all">
                Démarrer mon projet
              </StartProjectButton>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-8">
                <h3 className="font-bold text-[#3d3d3d] mb-4">Types de rénovations</h3>
                <ul className="space-y-2">
                  {services.map((s) => (
                    <li key={s} className="flex items-start gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-[#29abe2] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="relative py-20 bg-transparent">
        <SectionCloud />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#3d3d3d] mb-4">Notre approche</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { n: '01', title: 'Diagnostic', desc: "Visite et analyse complète de l'existant : état du bâtiment, réseaux, isolation, structure." },
              { n: '02', title: 'Conception', desc: "Définition du programme de rénovation, plans avant/après, descriptif travaux." },
              { n: '03', title: 'Consultation', desc: "Appel d'offres auprès d'artisans locaux sélectionnés, analyse des devis." },
              { n: '04', title: 'Coordination', desc: "Planification et coordination des corps de métier, suivi de chantier, réception." },
            ].map((s, i) => (
              <AnimatedSection key={s.n} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-6 text-center h-full border border-gray-100">
                  <div className="w-12 h-12 bg-[#3d3d3d] text-white font-bold rounded-full flex items-center justify-center mx-auto mb-4">{s.n}</div>
                  <h3 className="font-bold text-[#3d3d3d] mb-2">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <ServiceCTA
        title="Votre projet de rénovation"
        description="Décrivez-nous votre bien et vos travaux envisagés. Premier rendez-vous gratuit pour évaluer l'étendue de la mission."
        photo="/69a577a4ee4a3_ChatGPTImage2mars202612_36_40.png"
      />
    </>
  );
}
