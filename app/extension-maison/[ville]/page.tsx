import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { cities, getCityBySlug } from '@/lib/cities';
import AnimatedSection from '@/components/AnimatedSection';
import { PageBackground } from '@/components/PageBackground';
import StartProjectButton from '@/components/StartProjectButton';

interface Params { params: Promise<{ ville: string }> }

export async function generateStaticParams() {
  return cities.map((c) => ({ ville: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { ville } = await params;
  const city = getCityBySlug(ville);
  if (!city) return {};
  return {
    title: `Extension de Maison à ${city.name} — ${city.department}`,
    description: `Projego réalise votre extension de maison à ${city.name} (${city.department}). Dossier complet, délai rapide, 100% en ligne pour les démarches administratives.`,
    openGraph: {
      title: `Extension de Maison à ${city.name} — ${city.department} | Projego`,
      description: `Projego réalise votre extension de maison à ${city.name} (${city.department}). Dossier complet, suivi personnalisé.`,
      url: `https://www.projego.fr/extension-maison/${ville}`,
      type: 'website' as const,
    },
  };
}

export default async function ExtensionVillePage({ params }: Params) {
  const { ville } = await params;
  const city = getCityBySlug(ville);
  if (!city) notFound();

  return (
    <>
      <PageBackground />
      <section className="bg-[#1a1a2e] pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <Link href="/extension-maison" className="hover:text-white transition-colors">Extension de Maison</Link>
            <span>/</span>
            <span className="text-white">{city.name}</span>
          </nav>
          <span className="inline-block bg-[#29abe2]/20 text-[#29abe2] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            Maîtrise d&apos;œuvre — Vendée 30 km
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Extension de maison<br />
            <span className="text-[#29abe2]">à {city.name}</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
            Plus d&apos;espace sans déménager. Projego conçoit et pilote votre extension de maison à {city.name}, en harmonie avec votre construction existante.
          </p>
        </div>
      </section>

      <section className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <AnimatedSection direction="left">
              <h2 className="text-2xl font-bold text-[#3d3d3d] mb-6">Extension de maison à {city.name}</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Vous souhaitez agrandir votre maison à <strong>{city.name}</strong> ? Projego prend en charge l&apos;ensemble du projet : analyse du PLU de {city.name}, conception des plans, obtention des autorisations et suivi des travaux si souhaité.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Selon la surface d&apos;extension, il faudra soit une <strong>déclaration préalable</strong> (&lt; 40 m² en zone avec PLU), soit un <strong>permis de construire</strong> (&gt; 40 m²). Nous gérons ces démarches pour vous.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  { label: 'Extension horizontale', desc: 'Agrandissement au sol, solution la plus courante' },
                  { label: 'Surélévation', desc: "Ajout d'un niveau, idéal si le terrain est limité" },
                  { label: 'Aménagement de combles', desc: "Transformation de combles perdus en espace habitable" },
                  { label: 'Véranda / extension vitrée', desc: 'Espace lumineux en lien avec le jardin' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3 bg-white shadow-sm border border-gray-100 rounded-xl p-4">
                    <svg className="w-4 h-4 text-[#29abe2] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    <div>
                      <p className="font-semibold text-[#3d3d3d] text-sm">{item.label}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <StartProjectButton className="inline-flex items-center gap-2 bg-[#29abe2] text-white font-semibold px-7 py-3.5 rounded-full hover:bg-[#1a9fd6] transition-all">
                Étude gratuite à {city.name}
              </StartProjectButton>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="bg-[#3d3d3d] rounded-2xl p-8 text-white">
                <h3 className="font-bold text-lg mb-6">Notre mission à {city.name}</h3>
                <div className="space-y-4">
                  {[
                    { n: '01', title: 'Visite et analyse', desc: `Déplacement sur place à ${city.name}, étude de l'existant et du PLU local.` },
                    { n: '02', title: 'Conception', desc: 'Plans 2D et rendu 3D de votre extension, intégrés à la maison existante.' },
                    { n: '03', title: 'Autorisation', desc: 'Déclaration préalable ou permis de construire constitués et déposés.' },
                    { n: '04', title: 'Travaux', desc: 'Consultation des artisans locaux, analyse des devis, coordination optionnelle.' },
                  ].map((s) => (
                    <div key={s.n} className="flex gap-4">
                      <div className="w-8 h-8 bg-[#29abe2] text-white font-bold rounded-full flex items-center justify-center flex-shrink-0 text-xs">{s.n}</div>
                      <div>
                        <p className="font-bold text-white text-sm">{s.title}</p>
                        <p className="text-gray-400 text-xs mt-0.5">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#2a2a2a]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Votre extension à {city.name}</h2>
          <p className="text-gray-300 mb-6 text-sm">Premier rendez-vous gratuit. Étude de faisabilité et devis personnalisé.</p>
          <StartProjectButton className="inline-flex items-center gap-2 bg-[#29abe2] hover:bg-[#1a9fd6] text-white font-bold px-8 py-3.5 rounded-full transition-all shadow-lg">
            Demander une étude gratuite
          </StartProjectButton>
        </div>
      </section>
    </>
  );
}
