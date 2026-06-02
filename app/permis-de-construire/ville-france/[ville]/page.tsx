import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { franceVilles, getFranceVilleBySlug } from '@/lib/franceVilles';
import { getOrGenerateContent } from '@/lib/generateContent';
import { PageBackground } from '@/components/PageBackground';
import AnimatedSection from '@/components/AnimatedSection';

interface Params { params: Promise<{ ville: string }> }

export async function generateStaticParams() {
  return franceVilles.map((v) => ({ ville: v.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { ville } = await params;
  const v = getFranceVilleBySlug(ville);
  if (!v) return {};
  return {
    title: `Permis de Construire à ${v.name} — ${v.department} (${v.deptCode})`,
    description: `Projego réalise votre dossier de permis de construire à ${v.name} (${v.department}). Dossier complet en 48-72h, 100% à distance. Maison neuve, extension, surélévation.`,
    openGraph: {
      title: `Permis de Construire à ${v.name} — ${v.department} | Projego`,
      description: `Dossier complet en 48-72h à ${v.name}. Maison neuve, extension, surélévation.`,
      url: `https://www.projego.fr/permis-de-construire/ville-france/${ville}`,
      type: 'website',
    },
  };
}

const projectTypes = ['Maison individuelle neuve', 'Extension > 40 m²', 'Surélévation', 'Changement de destination', 'Piscine couverte > 100 m²', 'Annexe habitable'];

export default async function PCVilleFrancePage({ params }: Params) {
  const { ville } = await params;
  const v = getFranceVilleBySlug(ville);
  if (!v) notFound();

  const content = await getOrGenerateContent(
    `pc-ville-france/${v.slug}`,
    '',
    `À ${v.name} (${v.department}), le permis de construire est obligatoire pour toute maison neuve, toute extension de plus de 40 m² et la plupart des grandes constructions. Le dossier est instruit par la mairie de ${v.name} dans un délai légal de 2 mois pour une maison individuelle. Projego constitue votre dossier complet en 48 à 72h, partout en France, 100 % à distance.`
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
            <span className="text-white">{v.name}</span>
          </nav>
          <span className="inline-block bg-[#29abe2]/20 text-[#29abe2] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            {v.department} ({v.deptCode}) — {v.region}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Permis de Construire<br />
            <span className="text-[#29abe2]">à {v.name}</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
            Projego constitue votre permis de construire à {v.name} en 48 à 72h. Dossier complet garanti, 100% à distance.
          </p>
        </div>
      </section>

      <section className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <AnimatedSection direction="left">
              <h2 className="text-2xl font-bold text-[#3d3d3d] mb-6">Permis de construire à {v.name} : les règles essentielles</h2>
              <p className="text-gray-600 leading-relaxed mb-6">{content}</p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { icon: '⚡', label: 'Dossier en 48-72h' },
                  { icon: '🇫🇷', label: '100% distanciel' },
                  { icon: '📋', label: 'Plans inclus' },
                  { icon: '🔍', label: `Analyse PLU ${v.name}` },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 bg-white shadow-sm border border-gray-100 rounded-xl p-3">
                    <span>{item.icon}</span>
                    <span className="text-sm font-semibold text-[#3d3d3d]">{item.label}</span>
                  </div>
                ))}
              </div>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-[#29abe2] text-white font-semibold px-7 py-3.5 rounded-full hover:bg-[#1a9fd6] transition-all">
                Demander un devis
              </Link>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-7">
                <h3 className="font-bold text-[#3d3d3d] mb-5">Projets nécessitant un PC à {v.name}</h3>
                <ul className="space-y-3 mb-6">
                  {projectTypes.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-[#29abe2] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-xs mb-2"><span className="text-gray-500">Maison individuelle</span><span className="font-bold text-[#3d3d3d]">2 mois</span></div>
                  <div className="flex justify-between text-xs"><span className="text-gray-500">Autres constructions</span><span className="font-bold text-[#3d3d3d]">3 mois</span></div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#2a2a2a]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Votre PC à {v.name} en 48-72h</h2>
          <p className="text-gray-300 mb-6 text-sm">Dossier complet, prêt à déposer à la mairie de {v.name}.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-[#29abe2] hover:bg-[#1a9fd6] text-white font-bold px-8 py-3.5 rounded-full transition-all shadow-lg">
            Nous contacter
          </Link>
        </div>
      </section>
    </>
  );
}
