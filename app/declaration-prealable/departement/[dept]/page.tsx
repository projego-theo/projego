import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { departements, getDepartementBySlug } from '@/lib/departements';
import { getOrGenerateContent } from '@/lib/generateContent';
import { PageBackground } from '@/components/PageBackground';
import AnimatedSection from '@/components/AnimatedSection';
import StartProjectButton from '@/components/StartProjectButton';

interface Params { params: Promise<{ dept: string }> }

export async function generateStaticParams() {
  return departements.map((d) => ({ dept: d.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { dept } = await params;
  const d = getDepartementBySlug(dept);
  if (!d) return {};
  return {
    title: `Déclaration Préalable dans le ${d.name} (${d.code}) — ${d.region}`,
    description: `Projego réalise vos déclarations préalables dans le ${d.name} (${d.code}). Dossier complet en 24-48h, 100% à distance. Piscine, pergola, extension, clôture.`,
    openGraph: {
      title: `Déclaration Préalable dans le ${d.name} (${d.code}) | Projego`,
      description: `Dossier complet en 24-48h dans le ${d.name}. Service 100% à distance.`,
      url: `https://www.projego.fr/declaration-prealable/departement/${dept}`,
      type: 'website',
    },
  };
}

export default async function DPDeptPage({ params }: Params) {
  const { dept } = await params;
  const d = getDepartementBySlug(dept);
  if (!d) notFound();

  const content = await getOrGenerateContent(
    `dp-dept/${d.slug}`,
    '',
    `Dans le département ${d.name} (${d.code}), la déclaration préalable de travaux est obligatoire pour de nombreux projets courants. La préfecture est à ${d.prefecture}. Projego constitue votre dossier complet en 24 à 48h, partout en France, 100 % à distance.`
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
            <span className="text-white">{d.name}</span>
          </nav>
          <span className="inline-block bg-[#29abe2]/20 text-[#29abe2] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            Département {d.code} — {d.region}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Déclaration Préalable<br />
            <span className="text-[#29abe2]">dans le {d.name}</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
            Projego réalise vos déclarations préalables dans le {d.name} (préfecture : {d.prefecture}) en 24 à 48h, 100% à distance.
          </p>
        </div>
      </section>

      <section className="py-20 bg-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-6">La déclaration préalable dans le {d.name}</h2>
            <p className="text-gray-600 leading-relaxed mb-8">{content}</p>
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-xl p-5 border border-gray-100 text-center">
                <p className="text-2xl font-bold text-[#29abe2]">24-48h</p>
                <p className="text-xs text-gray-500 mt-1">Constitution du dossier</p>
              </div>
              <div className="bg-white rounded-xl p-5 border border-gray-100 text-center">
                <p className="text-2xl font-bold text-[#29abe2]">1 mois</p>
                <p className="text-xs text-gray-500 mt-1">Délai mairie</p>
              </div>
              <div className="bg-white rounded-xl p-5 border border-gray-100 text-center">
                <p className="text-2xl font-bold text-[#29abe2]">100%</p>
                <p className="text-xs text-gray-500 mt-1">Distanciel</p>
              </div>
            </div>
            <StartProjectButton className="inline-flex items-center gap-2 bg-[#29abe2] text-white font-semibold px-7 py-3.5 rounded-full hover:bg-[#1a9fd6] transition-all">
              Démarrer mon dossier
            </StartProjectButton>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 bg-[#2a2a2a]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">DP dans le {d.name} en 24-48h</h2>
          <p className="text-gray-300 mb-6 text-sm">Analyse PLU incluse, dossier complet, prêt à déposer en mairie.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <StartProjectButton className="inline-flex items-center gap-2 bg-[#29abe2] hover:bg-[#1a9fd6] text-white font-bold px-8 py-3.5 rounded-full transition-all shadow-lg">
              Démarrer mon projet
            </StartProjectButton>
            <Link href="/declaration-prealable" className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white text-white font-semibold px-6 py-3.5 rounded-full transition-all">
              Retour à la DP nationale
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
