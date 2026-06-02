import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { cities, getCityBySlug } from '@/lib/cities';
import AnimatedSection from '@/components/AnimatedSection';
import { PageBackground } from '@/components/PageBackground';

interface Params { params: Promise<{ ville: string }> }

export async function generateStaticParams() {
  return cities.map((c) => ({ ville: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { ville } = await params;
  const city = getCityBySlug(ville);
  if (!city) return {};
  return {
    title: `Construction Maison Neuve à ${city.name} — ${city.department}`,
    description: `Projego réalise votre construction de maison neuve à ${city.name} (${city.department}). Plans sur mesure, dossier complet, délai rapide, 100% en ligne pour les démarches.`,
    openGraph: {
      title: `Construction Maison Neuve à ${city.name} — ${city.department} | Projego`,
      description: `Projego réalise votre construction de maison neuve à ${city.name} (${city.department}). Plans sur mesure, suivi personnalisé.`,
      url: `https://www.projego.fr/construction-maison-neuve/${ville}`,
      type: 'website' as const,
    },
  };
}

export default async function ConstructionVillePage({ params }: Params) {
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
            <Link href="/construction-maison-neuve" className="hover:text-white transition-colors">Construction Maison Neuve</Link>
            <span>/</span>
            <span className="text-white">{city.name}</span>
          </nav>
          <span className="inline-block bg-[#29abe2]/20 text-[#29abe2] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            Maîtrise d&apos;œuvre — Vendée 30 km
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Construction Maison Neuve<br />
            <span className="text-[#29abe2]">à {city.name}</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
            Construisez la maison de vos rêves à {city.name} avec Projego — plans 100% personnalisés, rendu 3D, permis de construire et coordination des entreprises.
          </p>
        </div>
      </section>

      <section className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <AnimatedSection direction="left">
              <h2 className="text-2xl font-bold text-[#3d3d3d] mb-6">Votre maison sur mesure à {city.name}</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Vous avez un terrain à {city.name} ou dans ses environs et vous souhaitez y construire votre maison ? Projego, maître d&apos;œuvre basé aux Herbiers, vous accompagne de la conception à la remise des clés.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Contrairement aux constructeurs de maisons individuelles, nous concevons votre projet <strong>sur mesure</strong>, adapté à votre terrain, votre style de vie et votre budget. Pas de plan catalogue, pas de compromis.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Nous analysons le PLU de {city.name}, concevons les plans, obtenons le permis de construire et coordonnons les entreprises locales.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-[#29abe2] text-white font-semibold px-7 py-3.5 rounded-full hover:bg-[#1a9fd6] transition-all">
                Premier rendez-vous gratuit
              </Link>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-7">
                <h3 className="font-bold text-[#3d3d3d] mb-5">Notre mission à {city.name}</h3>
                <ul className="space-y-3">
                  {[
                    'Analyse du PLU de ' + city.name + ' et faisabilité',
                    'Esquisse architecturale personnalisée',
                    'Plans 2D détaillés (masse, façades, coupe, intérieurs)',
                    'Rendu 3D photoréaliste de votre future maison',
                    'Constitution et dépôt du permis de construire',
                    'Consultation des artisans et entreprises locales',
                    'Suivi de chantier (option)',
                    'Réception des travaux',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-[#29abe2] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#2a2a2a]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Construisons ensemble à {city.name}</h2>
          <p className="text-gray-300 mb-6 text-sm">Premier rendez-vous gratuit pour découvrir votre terrain et vos besoins. Devis personnalisé.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-[#29abe2] hover:bg-[#1a9fd6] text-white font-bold px-8 py-3.5 rounded-full transition-all shadow-lg">
            Nous contacter
          </Link>
        </div>
      </section>
    </>
  );
}
