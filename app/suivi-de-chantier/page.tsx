import type { Metadata } from 'next';
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';
import PageHero from '@/components/PageHero';
import { PageBackground } from '@/components/PageBackground';
import { ServiceCTA } from '@/components/ServiceCTA';

export const metadata: Metadata = {
  title: 'Suivi de Chantier Vendée',
  description: "Service optionnel de suivi de chantier en Vendée. Coordination des artisans, visites régulières, respect des délais et du budget.",
  openGraph: {
    title: "Suivi de Chantier en Vendée | Projego",
    description: "Service optionnel de suivi de chantier en Vendée. Coordination des artisans, visites régulières, respect des délais et du budget.",
    url: 'https://www.projego.fr/suivi-de-chantier',
    type: 'website',
  },
};

const missions = [
  { icon: '👁️', title: 'Visites régulières', desc: "Déplacements sur chantier selon la phase des travaux (hebdomadaire, bimensuel...)." },
  { icon: '📊', title: 'Comptes-rendus', desc: "Rapport détaillé après chaque visite : avancement, points de vigilance, décisions à prendre." },
  { icon: '📐', title: 'Contrôle de conformité', desc: "Vérification que les travaux sont conformes aux plans et aux descriptifs techniques." },
  { icon: '⚠️', title: 'Gestion des réserves', desc: "Identification et suivi des malfaçons, levée de réserves avec les entreprises." },
  { icon: '📅', title: 'Planning', desc: "Coordination du planning entre les différents corps de métier pour éviter les retards." },
  { icon: '🏆', title: 'Réception des travaux', desc: "Assistance lors de la réception de chantier, rédaction du procès-verbal." },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Suivi de chantier',
  provider: { '@type': 'LocalBusiness', name: 'Projego', url: 'https://www.projego.fr' },
  areaServed: 'Vendée',
  description: 'Service optionnel de suivi de chantier en Vendée : visites régulières, comptes-rendus, contrôle de conformité, réception des travaux.',
  serviceType: 'Maîtrise d\'œuvre',
};

export default function SuiviChantierPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <PageBackground />
      <PageHero
        title="Suivi de Chantier en Vendée — Coordination et contrôle"
        subtitle="Service optionnel de pilotage et de contrôle de l'avancement de vos travaux, pour une construction sans mauvaise surprise."
        badge="Service optionnel — Vendée 30 km"
        typewriterTexts={["coordination des artisans", "visites de chantier", "respect des délais", "tranquillité d'esprit"]}
      />

      <section className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <h2 className="text-3xl font-bold text-[#3d3d3d] mb-6">Pourquoi faire appel à un maître d&apos;œuvre pour le suivi ?</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Sans suivi professionnel, il est difficile pour un particulier de détecter les malfaçons en cours de chantier, de respecter le planning et de faire valoir ses droits en cas de problème.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Projego intervient comme <strong>représentant du maître d&apos;ouvrage</strong> (vous) face aux entreprises, pour s&apos;assurer que votre chantier avance correctement, dans le respect des plans et des délais contractuels.
              </p>
              <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-5 mb-6">
                <p className="text-sm font-bold text-[#3d3d3d] mb-1">Service optionnel</p>
                <p className="text-gray-500 text-sm">Le suivi de chantier peut être ajouté à notre mission de conception, ou commandé de façon indépendante si vous avez déjà vos plans et vos entreprises.</p>
              </div>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-[#29abe2] text-white font-semibold px-7 py-3.5 rounded-full hover:bg-[#1a9fd6] transition-all">
                Me renseigner sur cette option
              </Link>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="grid grid-cols-2 gap-4">
                {missions.map((m) => (
                  <div key={m.title} className="bg-white shadow-sm border border-gray-100 rounded-xl p-5">
                    <div className="text-3xl mb-2">{m.icon}</div>
                    <h3 className="font-bold text-[#3d3d3d] text-sm mb-1">{m.title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">{m.desc}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <ServiceCTA
        title="Ajoutez le suivi à votre projet"
        description="Contactez-nous pour discuter de vos besoins en suivi de chantier et obtenir un devis personnalisé."
        photo="/69a2126908188_Capturedecran2026-02-27a22.52.17.png"
      />
    </>
  );
}
