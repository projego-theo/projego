import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { pcTypes, getPcTypeBySlug } from '@/lib/workTypes';
import { franceVilles } from '@/lib/franceVilles';
import { getOrGenerateContent } from '@/lib/generateContent';
import { PageBackground } from '@/components/PageBackground';
import AnimatedSection from '@/components/AnimatedSection';
import StartProjectButton from '@/components/StartProjectButton';

interface Params { params: Promise<{ type: string }> }

export async function generateStaticParams() {
  return pcTypes.map((t) => ({ type: t.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { type } = await params;
  const t = getPcTypeBySlug(type);
  if (!t) return {};
  return {
    title: `Permis de Construire ${t.name} — Dossier en 48-72h`,
    description: `Projego réalise votre permis de construire pour ${t.name.toLowerCase()} partout en France. Dossier complet en 48-72h, 100% à distance. ${t.description}.`,
    openGraph: {
      title: `Permis de Construire ${t.name} — Dossier en 48-72h | Projego`,
      description: `Dossier complet en 48-72h pour ${t.name.toLowerCase()}.`,
      url: `https://www.projego.fr/permis-de-construire/type/${type}`,
      type: 'website',
    },
  };
}

const DISPLAY_CITIES = franceVilles.slice(0, 16);

export default async function PCTypePage({ params }: Params) {
  const { type } = await params;
  const t = getPcTypeBySlug(type);
  if (!t) notFound();

  const content = await getOrGenerateContent(
    `pc-type/${t.slug}`,
    '',
    `Le permis de construire pour ${t.name.toLowerCase()} est obligatoire en France. Le dossier comprend le formulaire Cerfa n°13406, un plan de situation, un plan de masse coté 3D, une notice descriptive, les plans de façades et un document graphique d'insertion. Le délai légal d'instruction est de 2 mois pour une maison individuelle et de 3 mois pour les autres constructions. Projego constitue votre dossier en 48 à 72h.`
  );

  return (
    <>
      <PageBackground />
      <section className="bg-[#1a1a2e] pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <Link href="/permis-de-construire" className="hover:text-white transition-colors">Permis de Construire</Link>
            <span>/</span>
            <span className="text-white">{t.name}</span>
          </nav>
          <span className="inline-block bg-[#29abe2]/20 text-[#29abe2] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            Service Type A — 48-72h — Toute la France
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Permis de Construire<br />
            <span className="text-[#29abe2]">{t.name}</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
            {t.description}. Projego constitue votre dossier complet en 48 à 72h, partout en France.
          </p>
        </div>
      </section>

      <section className="py-20 bg-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-6">PC {t.name.toLowerCase()} : tout ce qu&apos;il faut savoir</h2>
            <p className="text-gray-600 leading-relaxed mb-8">{content}</p>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                { icon: '⚡', title: 'Dossier en 48-72h', desc: 'Cerfa, PC1 à PC8, notice descriptive' },
                { icon: '🔍', title: 'Analyse PLU incluse', desc: 'Règles locales vérifiées avant dossier' },
                { icon: '🇫🇷', title: 'Partout en France', desc: '100% à distance' },
                { icon: '✅', title: 'Dossier complet garanti', desc: 'Premier dépôt sans pièces manquantes' },
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
              Démarrer mon dossier
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-12 bg-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-6">
            <h2 className="text-xl font-bold text-[#3d3d3d]">PC {t.name.toLowerCase()} par ville</h2>
          </AnimatedSection>
          <div className="flex flex-wrap gap-2 justify-center">
            {DISPLAY_CITIES.map((v) => (
              <Link
                key={v.slug}
                href={`/permis-de-construire/type/${t.slug}/${v.slug}`}
                className="text-xs bg-white border border-gray-200 text-[#3d3d3d] hover:border-[#29abe2] hover:text-[#29abe2] px-3 py-1.5 rounded-full transition-all"
              >
                PC {t.name} {v.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#2a2a2a]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Votre PC {t.name} en 48-72h</h2>
          <p className="text-gray-300 mb-6 text-sm">Dossier complet, prêt à déposer en mairie, partout en France.</p>
          <StartProjectButton className="inline-flex items-center gap-2 bg-[#29abe2] hover:bg-[#1a9fd6] text-white font-bold px-8 py-3.5 rounded-full transition-all shadow-lg">
            Démarrer mon projet
          </StartProjectButton>
        </div>
      </section>
    </>
  );
}
