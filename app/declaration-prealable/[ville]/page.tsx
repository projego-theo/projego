import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { cities, getCityBySlug } from '@/lib/cities';
import { getCityDetail } from '@/lib/cityDetails';
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
    title: `Déclaration Préalable à ${city.name} — ${city.department}`,
    description: `Projego réalise votre déclaration préalable à ${city.name} (${city.department}). Dossier complet en 24-48h, 100% à distance. Piscine, pergola, clôture, extension.`,
    openGraph: {
      title: `Déclaration Préalable à ${city.name} — ${city.department} | Projego`,
      description: `Projego réalise votre déclaration préalable à ${city.name} (${city.department}). Dossier complet en 24-48h, 100% à distance.`,
      url: `https://www.projego.fr/declaration-prealable/${ville}`,
      type: 'website' as const,
    },
  };
}

const projectTypes = ['Piscine (< 100 m²)', 'Pergola / Carport', 'Clôture et portail', 'Extension ≤ 40 m²', 'Vélux / ouvertures', 'Abri de jardin (5-20 m²)', 'Ravalement de façade', 'Panneaux solaires'];

export default async function DPVillePage({ params }: Params) {
  const { ville } = await params;
  const city = getCityBySlug(ville);
  if (!city) notFound();
  const detail = getCityDetail(ville);

  return (
    <>
      <PageBackground />
      <section className="bg-[#1a1a2e] pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <Link href="/declaration-prealable" className="hover:text-white transition-colors">Déclaration Préalable</Link>
            <span>/</span>
            <span className="text-white">{city.name}</span>
          </nav>
          <span className="inline-block bg-[#29abe2]/20 text-[#29abe2] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            Service Type A — 24-48h
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Déclaration Préalable<br />
            <span className="text-[#29abe2]">à {city.name}</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
            Projego prépare votre dossier de déclaration préalable à {city.name} en 24 à 48h. Service 100% distanciel, partout en France.
          </p>
        </div>
      </section>

      <section className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <AnimatedSection direction="left">
              <h2 className="text-2xl font-bold text-[#3d3d3d] mb-6">Déclaration préalable à {city.name} : comment ça marche ?</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                À <strong>{city.name}</strong>, comme dans toutes les communes de {city.department}, la déclaration préalable est obligatoire pour de nombreux travaux d&apos;aménagement et de construction. Le dossier est instruit par la <strong>{detail?.mairie ?? `mairie de ${city.name}`}</strong> dans un délai légal d&apos;un mois.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Projego analyse les règles d&apos;urbanisme applicables à {city.name} (PLU ou carte communale) et constitue votre dossier en 24 à 48h. Vous n&apos;avez qu&apos;à le déposer en mairie — ou nous pouvons le faire pour vous.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { icon: '⚡', label: 'Dossier en 24-48h' },
                  { icon: '🇫🇷', label: '100% distanciel' },
                  { icon: '✅', label: 'Dossier complet' },
                  { icon: '🔍', label: 'Analyse PLU incluse' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 bg-white shadow-sm border border-gray-100 rounded-xl p-3">
                    <span>{item.icon}</span>
                    <span className="text-sm font-semibold text-[#3d3d3d]">{item.label}</span>
                  </div>
                ))}
              </div>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-[#29abe2] text-white font-semibold px-7 py-3.5 rounded-full hover:bg-[#1a9fd6] transition-all">
                Nous contacter
              </Link>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-7">
                <h3 className="font-bold text-[#3d3d3d] mb-5">Travaux concernés à {city.name}</h3>
                <ul className="space-y-3">
                  {projectTypes.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-[#29abe2] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      {p}
                    </li>
                  ))}
                </ul>
                <p className="text-gray-400 text-xs mt-5">Liste non exhaustive. Les travaux concernés dépendent des règles du PLU de {city.name}.</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#2a2a2a]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Votre DP à {city.name} en 24-48h</h2>
          <p className="text-gray-300 mb-6 text-sm">Décrivez votre projet. Nous constituons votre dossier complet, prêt à déposer en mairie de {city.name}.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-[#29abe2] hover:bg-[#1a9fd6] text-white font-bold px-8 py-3.5 rounded-full transition-all shadow-lg">
            Nous contacter
          </Link>
        </div>
      </section>
    </>
  );
}
