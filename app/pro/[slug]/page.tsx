import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Script from 'next/script';
import { proPages, getProPageBySlug } from '@/lib/proMetiers';
import { getOrGenerateContent } from '@/lib/generateContent';
import { PageBackground } from '@/components/PageBackground';
import AnimatedSection from '@/components/AnimatedSection';

interface Params { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return proPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = getProPageBySlug(slug);
  if (!p) return {};
  const serviceLabel =
    p.service === 'declaration-prealable' ? 'Déclaration Préalable'
    : p.service === 'permis-de-construire' ? 'Permis de Construire'
    : 'Plans AutoCAD';
  return {
    title: `${serviceLabel} pour ${p.metier.name}s — Déléguez à Projego`,
    description: `${p.metier.name}s : déléguez vos ${serviceLabel.toLowerCase()}s à Projego. Dossiers complets en ${p.service === 'declaration-prealable' ? '24-48h' : p.service === 'permis-de-construire' ? '48-72h' : '24-48h'}, confidentiels, partout en France.`,
    openGraph: {
      title: `${serviceLabel} pour ${p.metier.name}s | Projego Pro`,
      description: `Service B2B pour ${p.metier.name}s. Externalisation DP/PC et plans AutoCAD.`,
      url: `https://www.projego.fr/pro/${slug}`,
      type: 'website',
    },
  };
}

export default async function ProPage({ params }: Params) {
  const { slug } = await params;
  const p = getProPageBySlug(slug);
  if (!p) notFound();

  const projects =
    p.service === 'declaration-prealable' ? p.metier.dpProjects
    : p.service === 'permis-de-construire' ? p.metier.pcProjects
    : p.metier.planProjects;

  const serviceLabel =
    p.service === 'declaration-prealable' ? 'Déclaration Préalable'
    : p.service === 'permis-de-construire' ? 'Permis de Construire'
    : 'Plans AutoCAD';

  const delay = p.service === 'declaration-prealable' ? '24-48h' : p.service === 'permis-de-construire' ? '48-72h' : '24-48h';

  const content = await getOrGenerateContent(
    `pro/${p.slug}`,
    '',
    `Projego gère vos ${serviceLabel}s en tant que partenaire confidentiel. En tant que ${p.metier.name}, vous intervenez sur des projets comme ${projects.join(', ')}. Projego prend en charge l'intégralité de la démarche en ${delay} : analyse PLU, constitution du dossier, dépôt et suivi. Service B2B, facturation par mission.`
  );

  return (
    <>
      <Script
        id="meta-pixel-pro"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: `if(typeof fbq==='function')fbq('trackCustom','VisitePro');` }}
      />
      <PageBackground />
      <section className="bg-[#1a1a2e] pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <Link href="/espace-pro" className="hover:text-white transition-colors">Espace Pro</Link>
            <span>/</span>
            <span className="text-white">{serviceLabel} — {p.metier.name}</span>
          </nav>
          <span className="inline-block bg-[#29abe2]/20 text-[#29abe2] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            Pour les Pros · {delay} · Confidentiel
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {serviceLabel}<br />
            <span className="text-[#29abe2]">pour les {p.metier.name}s</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
            Déléguez vos {serviceLabel.toLowerCase()}s à Projego. Dossier en {delay}, 100% confidentiel, partout en France.
          </p>
        </div>
      </section>

      <section className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <AnimatedSection direction="left">
              <h2 className="text-2xl font-bold text-[#3d3d3d] mb-6">
                {p.service === 'plans-pro'
                  ? `Plans AutoCAD pour les ${p.metier.name}s`
                  : `${serviceLabel} pour les ${p.metier.name}s`}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">{content}</p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { icon: '⚡', label: `Livraison ${delay}` },
                  { icon: '🔒', label: 'Totalement confidentiel' },
                  { icon: '🇫🇷', label: 'Toute la France' },
                  { icon: '💼', label: 'Facture par mission' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 bg-white shadow-sm border border-gray-100 rounded-xl p-3">
                    <span>{item.icon}</span>
                    <span className="text-sm font-semibold text-[#3d3d3d]">{item.label}</span>
                  </div>
                ))}
              </div>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-[#29abe2] text-white font-semibold px-7 py-3.5 rounded-full hover:bg-[#1a9fd6] transition-all">
                Envoyer une demande
              </Link>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-7">
                <h3 className="font-bold text-[#3d3d3d] mb-5">
                  Projets concernés — {p.metier.name}
                </h3>
                <ul className="space-y-3">
                  {projects.map((proj) => (
                    <li key={proj} className="flex items-center gap-3 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-[#29abe2] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      {proj}
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
          <p className="text-gray-500 text-sm mb-4">Autres services pro :</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/espace-pro" className="text-sm bg-white border border-gray-200 hover:border-[#29abe2] hover:text-[#29abe2] text-[#3d3d3d] px-4 py-2 rounded-full transition-all">
              Espace Pro — Vue d&apos;ensemble
            </Link>
            {p.service !== 'declaration-prealable' && (
              <Link href={`/pro/declaration-prealable-${p.metier.slug}`} className="text-sm bg-white border border-gray-200 hover:border-[#29abe2] hover:text-[#29abe2] text-[#3d3d3d] px-4 py-2 rounded-full transition-all">
                DP pour {p.metier.name}s
              </Link>
            )}
            {p.service !== 'permis-de-construire' && (
              <Link href={`/pro/permis-de-construire-${p.metier.slug}`} className="text-sm bg-white border border-gray-200 hover:border-[#29abe2] hover:text-[#29abe2] text-[#3d3d3d] px-4 py-2 rounded-full transition-all">
                PC pour {p.metier.name}s
              </Link>
            )}
            {p.service !== 'plans-pro' && (
              <Link href={`/pro/plans-pro-${p.metier.slug}`} className="text-sm bg-white border border-gray-200 hover:border-[#29abe2] hover:text-[#29abe2] text-[#3d3d3d] px-4 py-2 rounded-full transition-all">
                Plans AutoCAD pour {p.metier.name}s
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#2a2a2a]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Travaillons ensemble</h2>
          <p className="text-gray-300 mb-6 text-sm">Contactez-nous pour discuter de vos besoins. Devis rapide, sans engagement.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-[#29abe2] hover:bg-[#1a9fd6] text-white font-bold px-8 py-3.5 rounded-full transition-all shadow-lg">
            Envoyer une demande pro
          </Link>
        </div>
      </section>
    </>
  );
}
