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
    title: `Maître d'œuvre & Urbanisme à ${city.name} — ${city.department}`,
    description: `Projego réalise vos démarches administratives (DP/PC) et votre maîtrise d'œuvre à ${city.name} (${city.department}). Dossier complet, délai rapide, 100% en ligne pour les démarches.`,
    openGraph: {
      title: `Maître d'œuvre & Urbanisme à ${city.name} — ${city.department} | Projego`,
      description: `Projego réalise vos démarches administratives (DP/PC) et votre maîtrise d'œuvre à ${city.name} (${city.department}). Dossier complet, délai rapide.`,
      url: `https://www.projego.fr/villes/${ville}`,
      type: 'website' as const,
    },
  };
}

export default async function VillePage({ params }: Params) {
  const { ville } = await params;
  const city = getCityBySlug(ville);
  if (!city) notFound();
  const detail = getCityDetail(ville);

  const services = [
    { href: `/declaration-prealable/${ville}`, title: 'Déclaration Préalable', desc: `Piscine, pergola, clôture, extension à ${city.name}. Dossier en 24-48h.`, tag: '24-48h' },
    { href: `/permis-de-construire/${ville}`, title: 'Permis de Construire', desc: `Maison neuve, extension > 40 m² à ${city.name}. Dossier en 48-72h.`, tag: '48-72h' },
    { href: `/maitrise-oeuvre/${ville}`, title: "Maîtrise d'œuvre", desc: `Conception et pilotage de vos travaux à ${city.name} et ses environs.`, tag: 'Local' },
    { href: `/extension-maison/${ville}`, title: 'Extension de maison', desc: `Agrandissement horizontal ou surélévation à ${city.name}.`, tag: 'Sur devis' },
    { href: `/construction-maison-neuve/${ville}`, title: 'Construction neuve', desc: `Maison sur mesure à ${city.name} : plans, 3D et permis.`, tag: 'Sur devis' },
  ];

  return (
    <>
      <PageBackground />
      {/* Hero */}
      <section className="bg-[#1a1a2e] pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-gray-300">Villes</span>
            <span>/</span>
            <span className="text-white">{city.name}</span>
          </nav>
          <span className="inline-block bg-[#29abe2]/20 text-[#29abe2] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            {city.department} — {city.region}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Maître d&apos;œuvre & Urbanisme<br />
            <span className="text-[#29abe2]">à {city.name}</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
            Projego vous accompagne dans tous vos projets de construction à {city.name} : déclaration préalable, permis de construire, maîtrise d&apos;œuvre et suivi de chantier.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#3d3d3d] mb-4">Nos services à {city.name}</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Que vous soyez à {city.name} ou dans ses environs, Projego prend en charge vos démarches et vos projets de construction.
            </p>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <AnimatedSection key={s.href} delay={i * 0.08}>
                <Link href={s.href} className="group block h-full">
                  <div className="h-full border-2 border-gray-100 hover:border-[#29abe2] rounded-2xl p-6 transition-all hover:shadow-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-[#3d3d3d] group-hover:text-[#29abe2] transition-colors">{s.title}</h3>
                      <span className="text-xs bg-[#29abe2]/10 text-[#29abe2] font-bold px-3 py-1 rounded-full">{s.tag}</span>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>
                    <span className="text-[#29abe2] text-sm font-semibold">En savoir plus →</span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Local content */}
      <section className="py-20 bg-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-[#3d3d3d] mb-6">Projego à {city.name} : expertise locale</h2>
            <div className="prose max-w-none text-gray-600 space-y-4">
              {detail && (
                <p>
                  {detail.localContext} Les démarches administratives relèvent de la <strong>{detail.mairie}</strong> ou de la communauté de communes compétente. Projego prend en charge l&apos;ensemble du dossier, de l&apos;analyse du PLU jusqu&apos;au dépôt en mairie.
                </p>
              )}
              <p>
                La commune de <strong>{city.name}</strong>, située en {city.department}, est régie par un <strong>Plan Local d&apos;Urbanisme (PLU)</strong> ou un PLU intercommunal (PLUi) qui définit les règles de construction applicables à votre projet.
              </p>
              <p>
                Projego, basé à Beaurepaire (85), intervient régulièrement sur des projets à {city.name} : <strong>déclaration préalable</strong> (piscine, pergola, clôture, extension ≤ 40 m²), <strong>permis de construire</strong> (maison neuve, extension &gt; 40 m²) et <strong>maîtrise d&apos;œuvre</strong> (construction, extension, rénovation dans notre zone de 30 km autour des Herbiers).
              </p>
              {detail?.typicalProjects && (
                <p>
                  Projets courants à {city.name} : {detail.typicalProjects.join(', ')}.
                </p>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#2a2a2a]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Votre projet à {city.name}</h2>
          <p className="text-gray-300 mb-8">Contactez Projego pour une étude de faisabilité gratuite. Réponse sous 24h.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-[#29abe2] hover:bg-[#1a9fd6] text-white font-bold px-10 py-4 rounded-full transition-all shadow-lg">
            Nous contacter
          </Link>
        </div>
      </section>
    </>
  );
}
