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
    title: `Maîtrise d'œuvre à ${city.name} — ${city.department}`,
    description: `Projego réalise vos projets de maîtrise d'œuvre à ${city.name} (${city.department}). Construction neuve, extension, rénovation. Dossier complet, suivi personnalisé.`,
    openGraph: {
      title: `Maîtrise d'œuvre à ${city.name} — ${city.department} | Projego`,
      description: `Projego réalise vos projets de maîtrise d'œuvre à ${city.name} (${city.department}). Construction neuve, extension, rénovation.`,
      url: `https://www.projego.fr/maitrise-oeuvre/${ville}`,
      type: 'website' as const,
    },
  };
}

export default async function MOeVillePage({ params }: Params) {
  const { ville } = await params;
  const city = getCityBySlug(ville);
  if (!city) notFound();

  const subServices = [
    { href: `/construction-maison-neuve/${ville}`, title: 'Construction maison neuve', desc: `Maison sur mesure à ${city.name} : plans, 3D, permis.` },
    { href: `/extension-maison/${ville}`, title: 'Extension de maison', desc: `Agrandissement à ${city.name}, horizontal ou en surélévation.` },
    { href: '/renovation-maison', title: 'Rénovation', desc: `Réhabilitation complète ou partielle à ${city.name}.` },
    { href: '/suivi-de-chantier', title: 'Suivi de chantier', desc: `Coordination et contrôle des travaux à ${city.name}.` },
  ];

  return (
    <>
      <PageBackground />
      <section className="bg-[#1a1a2e] pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <Link href="/maitrise-oeuvre" className="hover:text-white transition-colors">Maîtrise d&apos;œuvre</Link>
            <span>/</span>
            <span className="text-white">{city.name}</span>
          </nav>
          <span className="inline-block bg-[#29abe2]/20 text-[#29abe2] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            Service Type B — Vendée 30 km
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Maîtrise d&apos;œuvre<br />
            <span className="text-[#29abe2]">à {city.name}</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
            Projego pilote vos projets de construction, extension et rénovation à {city.name}. Un interlocuteur unique du crayon au chantier.
          </p>
        </div>
      </section>

      <section className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-4">Nos services de maîtrise d&apos;œuvre à {city.name}</h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 gap-6">
            {subServices.map((s, i) => (
              <AnimatedSection key={s.href} delay={i * 0.1}>
                <Link href={s.href} className="group block h-full">
                  <div className="h-full border-2 border-gray-100 hover:border-[#29abe2] rounded-2xl p-6 transition-all hover:shadow-lg">
                    <h3 className="font-bold text-[#3d3d3d] group-hover:text-[#29abe2] transition-colors mb-2">{s.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-3">{s.desc}</p>
                    <span className="text-[#29abe2] text-sm font-semibold">Découvrir →</span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-4">Maître d&apos;œuvre à {city.name} : pourquoi Projego ?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Projego est un cabinet de maîtrise d&apos;œuvre basé aux Herbiers (85500), à proximité de {city.name}. Nous intervenons régulièrement à {city.name} et dans ses environs pour des projets de construction neuve, d&apos;extension et de rénovation.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Notre connaissance du territoire vendéen et des règles d&apos;urbanisme locales nous permet de vous proposer un accompagnement efficace et personnalisé. Nous gérons pour vous les démarches administratives, la conception des plans et la coordination des entreprises.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Pour vérifier si {city.name} est dans notre zone d&apos;intervention ou pour discuter de votre projet, contactez-nous. Premier rendez-vous gratuit et sans engagement.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 bg-[#2a2a2a]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Votre projet à {city.name}</h2>
          <p className="text-gray-300 mb-6 text-sm">Premier rendez-vous gratuit. Étude de faisabilité et devis personnalisé.</p>
          <StartProjectButton className="inline-flex items-center gap-2 bg-[#29abe2] hover:bg-[#1a9fd6] text-white font-bold px-8 py-3.5 rounded-full transition-all shadow-lg">
            Démarrer mon projet
          </StartProjectButton>
        </div>
      </section>
    </>
  );
}
