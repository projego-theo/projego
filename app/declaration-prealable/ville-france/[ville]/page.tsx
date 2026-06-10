import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { franceVilles, getFranceVilleBySlug } from '@/lib/franceVilles';
import { getOrGenerateContent } from '@/lib/generateContent';
import { PageBackground } from '@/components/PageBackground';
import AnimatedSection from '@/components/AnimatedSection';
import StartProjectButton from '@/components/StartProjectButton';

interface Params { params: Promise<{ ville: string }> }

export async function generateStaticParams() {
  return franceVilles.map((v) => ({ ville: v.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { ville } = await params;
  const v = getFranceVilleBySlug(ville);
  if (!v) return {};
  return {
    title: `Déclaration Préalable à ${v.name} — ${v.department} (${v.deptCode})`,
    description: `Projego réalise votre déclaration préalable à ${v.name} (${v.department}). Dossier complet en 24-48h, 100% à distance. Piscine, pergola, extension, clôture.`,
    openGraph: {
      title: `Déclaration Préalable à ${v.name} — ${v.department} | Projego`,
      description: `Dossier complet en 24-48h, 100% à distance. Piscine, pergola, extension, clôture à ${v.name}.`,
      url: `https://www.projego.fr/declaration-prealable/ville-france/${ville}`,
      type: 'website',
    },
  };
}

const projectTypes = ['Piscine (< 100 m²)', 'Pergola / Carport', 'Clôture et portail', 'Extension ≤ 40 m²', 'Vélux / ouvertures', 'Abri de jardin (5-20 m²)', 'Ravalement de façade', 'Panneaux solaires'];

export default async function DPVilleFrancePage({ params }: Params) {
  const { ville } = await params;
  const v = getFranceVilleBySlug(ville);
  if (!v) notFound();

  const content = await getOrGenerateContent(
    `dp-ville-france/${v.slug}`,
    '',
    `À ${v.name} (${v.department}), la déclaration préalable de travaux est obligatoire pour de nombreux projets courants. Le dossier est instruit par la mairie de ${v.name} dans un délai légal d'un mois. Projego constitue votre dossier complet en 24 à 48h, partout en France, 100 % à distance.`
  );

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
            <span className="text-white">{v.name}</span>
          </nav>
          <span className="inline-block bg-[#29abe2]/20 text-[#29abe2] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            {v.department} ({v.deptCode}) — {v.region}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Déclaration Préalable<br />
            <span className="text-[#29abe2]">à {v.name}</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
            Projego prépare votre dossier de déclaration préalable à {v.name} en 24 à 48h. Service 100% distanciel, partout en France.
          </p>
        </div>
      </section>

      <section className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <AnimatedSection direction="left">
              <h2 className="text-2xl font-bold text-[#3d3d3d] mb-6">Déclaration préalable à {v.name} : tout ce qu&apos;il faut savoir</h2>
              <p className="text-gray-600 leading-relaxed mb-6">{content}</p>
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
                Démarrer mon dossier
              </Link>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-7">
                <h3 className="font-bold text-[#3d3d3d] mb-5">Travaux concernés à {v.name}</h3>
                <ul className="space-y-3">
                  {projectTypes.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-[#29abe2] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-12 bg-transparent">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AnimatedSection>
            <p className="text-gray-500 text-sm mb-4">Voir aussi :</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/declaration-prealable" className="text-sm bg-white border border-gray-200 hover:border-[#29abe2] hover:text-[#29abe2] text-[#3d3d3d] px-4 py-2 rounded-full transition-all">
                Déclaration Préalable — toute la France
              </Link>
              <Link href={`/permis-de-construire/ville-france/${ville}`} className="text-sm bg-white border border-gray-200 hover:border-[#29abe2] hover:text-[#29abe2] text-[#3d3d3d] px-4 py-2 rounded-full transition-all">
                Permis de Construire à {v.name}
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 bg-[#2a2a2a]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Votre DP à {v.name} en 24-48h</h2>
          <p className="text-gray-300 mb-6 text-sm">Dossier complet, prêt à déposer à la mairie de {v.name}.</p>
          <StartProjectButton className="inline-flex items-center gap-2 bg-[#29abe2] hover:bg-[#1a9fd6] text-white font-bold px-8 py-3.5 rounded-full transition-all shadow-lg">
            Démarrer mon projet
          </StartProjectButton>
        </div>
      </section>
    </>
  );
}
