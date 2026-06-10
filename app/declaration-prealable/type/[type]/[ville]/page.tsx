import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { dpTypes, getDpTypeBySlug } from '@/lib/workTypes';
import { franceVilles, getFranceVilleBySlug } from '@/lib/franceVilles';
import { getOrGenerateContent } from '@/lib/generateContent';
import { PageBackground } from '@/components/PageBackground';
import AnimatedSection from '@/components/AnimatedSection';
import StartProjectButton from '@/components/StartProjectButton';

interface Params { params: Promise<{ type: string; ville: string }> }

export async function generateStaticParams() {
  return dpTypes.flatMap((t) =>
    franceVilles.map((v) => ({ type: t.slug, ville: v.slug }))
  );
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { type, ville } = await params;
  const t = getDpTypeBySlug(type);
  const v = getFranceVilleBySlug(ville);
  if (!t || !v) return {};
  return {
    title: `Déclaration Préalable ${t.name} à ${v.name} — Dossier 24-48h`,
    description: `Projego réalise votre déclaration préalable pour ${t.name.toLowerCase()} à ${v.name} (${v.department}). Dossier complet en 24-48h, 100% à distance.`,
    openGraph: {
      title: `Déclaration Préalable ${t.name} à ${v.name} | Projego`,
      description: `Dossier complet en 24-48h pour ${t.name.toLowerCase()} à ${v.name}. 100% à distance.`,
      url: `https://www.projego.fr/declaration-prealable/type/${type}/${ville}`,
      type: 'website',
    },
  };
}

export default async function DPTypeVillePage({ params }: Params) {
  const { type, ville } = await params;
  const t = getDpTypeBySlug(type);
  const v = getFranceVilleBySlug(ville);
  if (!t || !v) notFound();

  const fallback = `La déclaration préalable pour ${t.name.toLowerCase()} à ${v.name} est instruite par la mairie de ${v.name} dans un délai d'un mois. Le dossier comprend le formulaire Cerfa, un plan de situation, un plan de masse, des photos et un document graphique d'insertion. Projego constitue votre dossier complet en 24 à 48h, partout en France, 100% à distance.`;

  const content = await getOrGenerateContent(
    `dp-type-ville/${t.slug}/${v.slug}`,
    '',
    fallback
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
            <Link href={`/declaration-prealable/type/${t.slug}`} className="hover:text-white transition-colors">{t.name}</Link>
            <span>/</span>
            <span className="text-white">{v.name}</span>
          </nav>
          <span className="inline-block bg-[#29abe2]/20 text-[#29abe2] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            Service Type A — 24-48h — {v.department}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Déclaration Préalable {t.name}<br />
            <span className="text-[#29abe2]">à {v.name}</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
            {t.description}. Projego constitue votre dossier complet à {v.name} en 24 à 48h, 100% à distance.
          </p>
        </div>
      </section>

      <section className="py-20 bg-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-6">
              Déclaration préalable {t.name.toLowerCase()} à {v.name} : ce qu&apos;il faut savoir
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">{content}</p>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                { icon: '⚡', title: 'Dossier en 24-48h', desc: 'Cerfa, plan de masse, plan de situation, photos, document graphique' },
                { icon: '🔍', title: 'Analyse PLU incluse', desc: `Vérification des règles d'urbanisme de ${v.name} avant constitution du dossier` },
                { icon: '🇫🇷', title: '100% à distance', desc: `Depuis chez vous, sans vous déplacer à ${v.name}` },
                { icon: '✅', title: 'Dossier complet garanti', desc: 'Zéro pièce manquante pour le premier dépôt' },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-xl p-5 border border-gray-100">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="font-semibold text-[#3d3d3d] text-sm">{item.title}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-[#29abe2] text-white font-semibold px-7 py-3.5 rounded-full hover:bg-[#1a9fd6] transition-all">
              Démarrer mon dossier à {v.name}
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 bg-[#2a2a2a]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Votre DP {t.name} à {v.name} en 24-48h
          </h2>
          <p className="text-gray-300 mb-6 text-sm">
            Dossier complet, prêt à déposer en mairie de {v.name}, partout en France.
          </p>
          <StartProjectButton className="inline-flex items-center gap-2 bg-[#29abe2] hover:bg-[#1a9fd6] text-white font-bold px-8 py-3.5 rounded-full transition-all shadow-lg">
            Démarrer mon projet
          </StartProjectButton>
        </div>
      </section>
    </>
  );
}
