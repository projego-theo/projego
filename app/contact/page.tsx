import type { Metadata } from 'next';
import ContactForm from './ContactForm';
import AnimatedSection from '@/components/AnimatedSection';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { PageBackground } from '@/components/PageBackground';
import { SectionCloud } from '@/components/SectionCloud';

export const metadata: Metadata = {
  title: 'Nous Contacter',
  description: "Contactez Projego pour votre projet de construction, rénovation ou démarches administratives. Réponse immédiate via le chat.",
  openGraph: {
    title: 'Nous Contacter | Projego',
    description: "Contactez Projego pour votre projet de construction, rénovation ou démarches administratives. Réponse immédiate via le chat.",
    url: 'https://www.projego.fr/contact',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <>
      <PageBackground />
      <PageHero
        title="Parlons de votre projet"
        subtitle="Décrivez-nous votre projet, nous vous répondons rapidement."
        badge="Contact"
        compact
      />

      {/* Chat CTA */}
      <section className="py-10 bg-transparent border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <AnimatedSection>
            <div className="flex items-center gap-3 p-4 rounded-xl" style={{background: 'rgba(41,171,226,0.08)'}}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{background: 'rgba(41,171,226,0.15)'}}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#29abe2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <p className="text-gray-800 font-medium">
                <strong>Le moyen le plus rapide</strong> — utilisez le chat en bas à droite pour une réponse immédiate.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="relative py-20 bg-transparent">
        <SectionCloud />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Info sidebar */}
            <AnimatedSection direction="left" className="lg:col-span-1">
              <div className="space-y-6 lg:sticky lg:top-28">
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#29abe2] mb-1">Adresse</p>
                  <p className="font-semibold text-[#3d3d3d]">Beaurepaire, Vendée (85)</p>
                  <p className="text-gray-400 text-xs mt-0.5">Intervention MOe : 30 km autour des Herbiers</p>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#29abe2] mb-1">Email</p>
                  <a href="mailto:contact@projego.fr" className="font-semibold text-[#3d3d3d] hover:text-[#29abe2] transition-colors">contact@projego.fr</a>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-[#3d3d3d] mb-3">Zone d&apos;intervention</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-[#29abe2] rounded-full flex-shrink-0" />
                      <p className="text-sm text-gray-600"><strong>Type A DP/PC :</strong> Toute la France</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-[#3d3d3d] rounded-full flex-shrink-0" />
                      <p className="text-sm text-gray-600"><strong>Type B MOe :</strong> Vendée, 30 km des Herbiers</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#29abe2]/10 rounded-2xl p-6 border border-[#29abe2]/20">
                  <h3 className="font-bold text-[#3d3d3d] mb-2">Vous êtes un artisan ?</h3>
                  <p className="text-gray-600 text-sm mb-3">Menuisiers, piscinistes, maçons — découvrez notre espace dédié.</p>
                  <Link href="/espace-pro" className="text-[#29abe2] font-semibold text-sm hover:text-[#1a9fd6] transition-colors">
                    Pour les Pros →
                  </Link>
                </div>
              </div>
            </AnimatedSection>

            {/* Form */}
            <AnimatedSection direction="right" className="lg:col-span-2">
              <ContactForm />
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
