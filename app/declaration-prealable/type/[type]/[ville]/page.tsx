import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { dpTypes, getDpTypeBySlug } from '@/lib/workTypes';
import { franceVilles, getFranceVilleBySlug } from '@/lib/franceVilles';
import { getOrGenerateContent } from '@/lib/generateContent';
import { PageBackground } from '@/components/PageBackground';
import AnimatedSection from '@/components/AnimatedSection';

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
    title: `Déclaration Préalable ${t.name} à ${v.name} — ${v.department}`,
    description: `Vous voulez installer ${t.name.toLowerCase()} à ${v.name} ? Projego gère votre déclaration préalable en 24-48h. Dossier complet, suivi mairie.`,
    openGraph: {
      title: `DP ${t.name} à ${v.name} | Projego`,
      description: `Déclaration préalable pour ${t.name.toLowerCase()} à ${v.name} en 24-48h.`,
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

  const content = await getOrGenerateContent(
    `dp-type-ville/${t.slug}/${v.slug}`,
    '',
    `Pour une ${t.name.toLowerCase()} à ${v.name} (${v.department}), une déclaration préalable est obligatoire selon les règles du PLU local. Le dossier est instruit par la mairie de ${v.name} dans un délai légal d'un mois. Projego constitue votre dossier complet en 24 à 48h, 100 % à distance, avec analyse PLU incluse.`
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
            24-48h · {v.department} ({v.deptCode})
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Déclaration Préalable {t.name}<br />
            <span className="text-[#29abe2]">à {v.name}</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
            Projego réalise votre déclaration préalable pour {t.name.toLowerCase()} à {v.name} en 24-48h. Dossier complet garanti.
          </p>
        </div>
      </section>

      <section className="py-20 bg-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-6">
              DP {t.name.toLowerCase()} à {v.name} : les règles applicables
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">{content}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[
                { icon: '⚡', label: '24-48h' },
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
              <Link href={`/declaration-prealable/type/${t.slug}`} className="inline-flex items-center gap-2 border-2 border-gray-200 text-[#3d3d3d] font-semibold px-6 py-3.5 rounded-full hover:border-[#29abe2] transition-all text-sm">
                DP {t.name} — toute la France
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 bg-[#2a2a2a]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">DP {t.name} à {v.name} en 24-48h</h2>
          <p className="text-gray-300 mb-6 text-sm">Dossier prêt à déposer à la mairie de {v.name}.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-[#29abe2] hover:bg-[#1a9fd6] text-white font-bold px-8 py-3.5 rounded-full transition-all shadow-lg">
            Nous contacter
          </Link>
        </div>
      </section>
    </>
  );
}
