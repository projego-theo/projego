import type { Metadata } from 'next';
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';
import PageHero from '@/components/PageHero';
import { PageBackground } from '@/components/PageBackground';
import { ServiceCTA } from '@/components/ServiceCTA';
import { SectionCloud } from '@/components/SectionCloud';

export const metadata: Metadata = {
  title: 'Extension Maison Vendée — Agrandissement',
  description: "Extension, surélévation, agrandissement en Vendée. Projego s'occupe de la conception, des plans et du dossier administratif.",
  openGraph: {
    title: "Extension et Agrandissement Maison Vendée | Projego",
    description: "Extension, surélévation, agrandissement en Vendée. Projego s'occupe de la conception, des plans et du dossier administratif.",
    url: 'https://www.projego.fr/extension-maison',
    type: 'website',
  },
};

const types = [
  { icon: '↔️', title: 'Extension horizontale', desc: "Agrandissement sur le terrain, accolé ou relié à la maison existante. Solution idéale pour les terrains spacieux." },
  { icon: '⬆️', title: 'Surélévation', desc: "Ajout d'un niveau supplémentaire. Solution privilégiée quand le terrain est limité. Nécessite une étude de structure." },
  { icon: '🏗️', title: 'Aménagement de combles', desc: "Transformation de combles perdus en espace habitable. La solution la plus économique si la hauteur est suffisante (≥ 1,80 m)." },
  { icon: '🌿', title: 'Véranda', desc: "Extension vitrée apportant lumière et lien avec le jardin. Attention particulière à l'isolation thermique." },
];

const steps = [
  { step: '01', title: 'Analyse de l\'existant', desc: "Visite du bien, étude des plans existants, contraintes structurelles et réglementaires." },
  { step: '02', title: 'Étude de faisabilité', desc: "Vérification du PLU, droits à construire restants, possibilités d'extension." },
  { step: '03', title: 'Conception du projet', desc: "Plans d'extension en 2D et 3D, intégration architecturale avec l'existant." },
  { step: '04', title: 'Autorisation', desc: "Déclaration préalable (< 40 m²) ou permis de construire (> 40 m²)." },
  { step: '05', title: 'Consultation', desc: "Sélection des entreprises, analyse comparative des devis, recommandation." },
  { step: '06', title: 'Suivi de chantier', desc: "Option : coordination des artisans, contrôle de l'avancement et réception." },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Extension et agrandissement de maison',
  provider: { '@type': 'LocalBusiness', name: 'Projego', url: 'https://www.projego.fr' },
  areaServed: 'Vendée',
  description: 'Extension horizontale, surélévation et aménagement de combles en Vendée. Conception, permis et suivi de chantier.',
  serviceType: 'Maîtrise d\'œuvre',
};

export default function ExtensionMaisonPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <PageBackground />
      <PageHero
        title="Extension et Agrandissement de Maison en Vendée"
        subtitle="Plus d'espace sans déménager. Projego conçoit votre extension en harmonie avec votre maison, en Vendée."
        badge="Maîtrise d'œuvre — Vendée 30 km"
        typewriterTexts={["plus d'espace", "surélévation", "agrandissement", "valorisez votre bien"]}
      />

      <section className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#3d3d3d] mb-4">Quel type d&apos;extension pour votre projet ?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Plusieurs solutions existent selon votre terrain, votre maison et vos besoins. Nous vous aidons à choisir la plus adaptée.</p>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {types.map((t, i) => (
              <AnimatedSection key={t.title} delay={i * 0.1}>
                <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-6 h-full">
                  <div className="text-4xl mb-4">{t.icon}</div>
                  <h3 className="font-bold text-[#3d3d3d] mb-2">{t.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{t.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 bg-transparent">
        <SectionCloud />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <h2 className="text-3xl font-bold text-[#3d3d3d] mb-6">Autorisations nécessaires</h2>
              <div className="space-y-4">
                {[
                  { label: '< 5 m²', auth: 'Aucune', color: 'bg-green-100 text-green-700' },
                  { label: '5 à 40 m² (zone urbaine PLU)', auth: 'Déclaration préalable', color: 'bg-blue-100 text-blue-700' },
                  { label: '5 à 20 m² (hors zone PLU)', auth: 'Déclaration préalable', color: 'bg-blue-100 text-blue-700' },
                  { label: '> 40 m² (zone urbaine PLU)', auth: 'Permis de construire', color: 'bg-orange-100 text-orange-700' },
                  { label: 'Total > 150 m² après travaux', auth: 'Architecte obligatoire', color: 'bg-red-100 text-red-700' },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between gap-4 bg-white rounded-xl p-4 border border-gray-100">
                    <p className="text-sm text-[#3d3d3d] font-medium">{row.label}</p>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap ${row.color}`}>{row.auth}</span>
                  </div>
                ))}
              </div>
              <p className="text-gray-400 text-xs mt-4">Ces seuils peuvent varier selon le PLU de votre commune. Nous vérifions toujours avant de commencer.</p>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="bg-[#3d3d3d] rounded-2xl p-8 text-white">
                <h3 className="font-bold text-xl mb-6">Budget indicatif</h3>
                <div className="space-y-4">
                  {[
                    { type: 'Extension horizontale', budget: '1 500 – 2 500 €/m²' },
                    { type: 'Surélévation', budget: '1 800 – 3 000 €/m²' },
                    { type: 'Aménagement combles', budget: '800 – 1 500 €/m²' },
                    { type: 'Véranda (alu/PVC)', budget: '600 – 2 000 €/m²' },
                  ].map((b) => (
                    <div key={b.type} className="flex justify-between items-center border-b border-white/10 pb-3">
                      <span className="text-gray-300 text-sm">{b.type}</span>
                      <span className="text-[#29abe2] font-bold text-sm">{b.budget}</span>
                    </div>
                  ))}
                </div>
                <p className="text-gray-400 text-xs mt-4">Hors honoraires de maîtrise d&apos;œuvre. Budget à affiner selon les finitions et les entreprises choisies.</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#3d3d3d] mb-4">Nos étapes de mission</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {steps.map((s, i) => (
              <AnimatedSection key={s.step} delay={i * 0.07}>
                <div className="text-center">
                  <div className="w-10 h-10 bg-[#29abe2] text-white font-bold rounded-full flex items-center justify-center mx-auto mb-3 text-sm">{s.step}</div>
                  <h3 className="font-bold text-[#3d3d3d] text-xs mb-1">{s.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{s.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <ServiceCTA
        title="Agrandissons votre maison"
        description="Premier rendez-vous gratuit. Nous étudions la faisabilité de votre extension et vous proposons des solutions adaptées à votre budget."
        photo="/69a5817b3f4ba_ChatGPTImage2mars202612_36_32.png"
      />
    </>
  );
}
