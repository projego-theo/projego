import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { pcTypes, getPcTypeBySlug } from '@/lib/workTypes';
import { franceVilles, getFranceVilleBySlug } from '@/lib/franceVilles';
import { getOrGenerateContent } from '@/lib/generateContent';
import { PageBackground } from '@/components/PageBackground';
import AnimatedSection from '@/components/AnimatedSection';

interface Params { params: Promise<{ type: string; ville: string }> }

export async function generateStaticParams() {
  return pcTypes.flatMap((t) =>
    franceVilles.map((v) => ({ type: t.slug, ville: v.slug }))
  );
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { type, ville } = await params;
  const t = getPcTypeBySlug(type);
  const v = getFranceVilleBySlug(ville);
  if (!t || !v) return {};
  return {
    title: `Permis de Construire ${t.name} à ${v.name} — ${v.department}`,
    description: `Vous construisez ${t.name.toLowerCase()} à ${v.name} ? Projego gère votre permis de construire en 48-72h. Dossier complet, analyse PLU, suivi mairie.`,
    openGraph: {
      title: `PC ${t.name} à ${v.name} | Projego`,
      description: `Permis de construire pour ${t.name.toLowerCase()} à ${v.name} en 48-72h.`,
      url: `https://www.projego.fr/permis-de-construire/type/${type}/${ville}`,
      type: 'website',
    },
  };
}

export default async function PCTypeVillePage({ params }: Params) {
  const { type, ville } = await params;
  const t = getPcTypeBySlug(type);
  const v = getFranceVilleBySlug(ville);
  if (!t || !v) notFound();

  const content = await getOrGenerateContent(
    `pc-type-ville/${t.slug}/${v.slug}`,
    '',
    `Pour ${t.name.toLowerCase()} à ${v.name} (${v.department}), un permis de construire est obligatoire. Le dossier est instruit par la mairie de ${v.name} dans un délai de 2 mois pour une maison individuelle, 3 mois pour les autres constructions. Projego constitue votre dossier complet en 48 à 72h, 100 % à distance.`
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
            <Link href={`/permis-de-construire/type/${t.slug}`} className="hover:text-white transition-colors">{t.name}</Link>
            <span>/</span>
            <span className="text-white">{v.name}</span>
          </nav>
          <span className="inline-block bg-[#29abe2]/20 text-[#29abe2] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            48-72h · {v.department} ({v.deptCode})
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Permis de Construire {t.name}<br />
            <span className="text-[#29abe2]">à {v.name}</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
            Projego réalise votre permis de construire pour {t.name.toLowerCase()} à {v.name} en 48-72h.
          </p>
        </div>
      </section>

      <section className="py-20 bg-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-6">
              PC {t.name.toLowerCase()} à {v.name} : règles et délais
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">{content}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[
                { icon: '⚡', label: '48-72h' },
                { icon: '🔍', label: 'PLU inclus' },
                { icon: '🇫🇷', label: '100% en ligne' },
                { icon: '✅', label: 'Complet' },
              ].map((item) => (
                <div key={item.label} className="bg-white shadow-sm border border-gray-100 rounded-xl p-4 text-center">
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <p className="text-xs font-semibold text-[#3d3d3d]">{item.label}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2 bg-[#29abe2] text-white font-semibold px-7 py-3.5 rounded-full hover:bg-[#1a9fd6] transition-all">
                Démarrer mon dossier
              </Link>
              <Link href={`/permis-de-construire/type/${t.slug}`} className="inline-flex items-center gap-2 border-2 border-gray-200 text-[#3d3d3d] font-semibold px-6 py-3.5 rounded-full hover:border-[#29abe2] transition-all text-sm">
                PC {t.name} — toute la France
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 bg-[#2a2a2a]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">PC {t.name} à {v.name} en 48-72h</h2>
          <p className="text-gray-300 mb-6 text-sm">Dossier prêt à déposer à la mairie de {v.name}.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-[#29abe2] hover:bg-[#1a9fd6] text-white font-bold px-8 py-3.5 rounded-full transition-all shadow-lg">
            Nous contacter
          </Link>
        </div>
      </section>
    </>
  );
}
