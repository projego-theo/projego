import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import AnimatedSection from '@/components/AnimatedSection';
import HeroSection from '@/components/HeroSection';
import { PageBackground } from '@/components/PageBackground';
import { SectionCloud } from '@/components/SectionCloud';
import { getAllPostsMeta } from '@/lib/blog';

export const metadata: Metadata = {
  title: { absolute: "Projego — Permis de construire & Maîtrise d'œuvre Vendée" },
  description:
    "Projego gère vos démarches administratives (DP, PC) partout en France en 24-72h, et votre maîtrise d'œuvre en Vendée. Basé à Beaurepaire (85).",
  openGraph: {
    title: "Projego — Permis de construire & Maîtrise d'œuvre Vendée",
    description: "Projego gère vos démarches administratives (DP, PC) partout en France en 24-72h, et votre maîtrise d'œuvre en Vendée. Basé à Beaurepaire (85).",
    url: 'https://www.projego.fr',
    type: 'website',
  },
};

const typeAServices = [
  {
    title: 'Déclaration Préalable',
    delay: '24-48h',
    href: '/declaration-prealable',
    items: ['Piscine hors-sol', 'Pergola / Carport', 'Clôture', 'Extension < 40m²', 'Vélux / ouvertures', 'Abri de jardin'],
  },
  {
    title: 'Permis de Construire',
    delay: '48-72h',
    href: '/permis-de-construire',
    items: ['Maison individuelle', 'Extension > 40m²', 'Surélévation', 'Changement de destination', 'Annexe habitable'],
  },
];

const typeBServices = [
  { title: 'Construction maison neuve', icon: '🏠', href: '/construction-maison-neuve', desc: 'Plans personnalisés, rendu 3D, permis de construire et coordination des entreprises.' },
  { title: 'Extension & Surélévation', icon: '📐', href: '/extension-maison', desc: 'Agrandissement horizontal ou vertical, conçu en harmonie avec votre maison existante.' },
  { title: 'Rénovation', icon: '🔨', href: '/renovation-maison', desc: "Réhabilitation complète ou partielle de maison ou d'appartement." },
  { title: 'Suivi de chantier', icon: '📋', href: '/suivi-de-chantier', desc: "Service optionnel de coordination et de contrôle de l'avancement des travaux." },
];

const carouselImages = [
  { src: '/69a577316fe18_ChatGPTImage2mars202612_40_20.png', alt: 'Maison neuve en Vendée — réalisation Projego' },
  { src: '/69a577618e65c_ChatGPTImage2mars202612_36_08.png', alt: 'Maison neuve à Beaurepaire — Projego 2022' },
  { src: '/69a577733d611_ChatGPTImage2mars202612_36_01.png', alt: 'Construction maison neuve en bocage vendéen — Projego' },
  { src: '/maison-neuve-saint-fulgent-2026.png', alt: 'Maison neuve à Saint-Fulgent — Projego 2026' },
  { src: '/maison-neuve-les-herbiers-2026.png', alt: 'Maison neuve aux Herbiers — Projego 2026' },
  { src: '/69a5817b3f4ba_ChatGPTImage2mars202612_36_32.png', alt: 'Extension et rénovation maison Vendée — Projego' },
  { src: '/surelevation-challans-2026.png', alt: 'Surélévation à Challans — Projego 2026' },
  { src: '/garage-preau-poire-sur-vie-2026.png', alt: 'Garage 50m² et préau au Poiré-sur-Vie — Projego 2026' },
  { src: '/69a577a4ee4a3_ChatGPTImage2mars202612_36_40.png', alt: 'Rénovation complète maison — Projego Vendée' },
  { src: '/69a577cd2edf2_ChatGPTImage2mars202612_36_45.png', alt: 'Transformation garage en loft — réalisation Projego' },
  { src: '/69a5784f3f45f_ChatGPTImage2mars202612_36_37.png', alt: 'Rénovation salle de bain — Projego Vendée' },
  { src: '/69a5785ea193e_ChatGPTImage2mars202612_36_12.png', alt: 'Rénovation cuisine en Vendée — Projego' },
];

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Projego',
  description: "Spécialiste des démarches administratives (DP/PC) et maîtrise d'œuvre en Vendée",
  url: 'https://www.projego.fr',
  email: 'contact@projego.fr',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '20B rue de la Maine',
    addressLocality: 'Beaurepaire',
    postalCode: '85500',
    addressCountry: 'FR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 46.9333,
    longitude: -1.1833,
  },
  areaServed: 'France',
  foundingDate: '2019',
  sameAs: [],
};

export default async function HomePage() {
  const posts = getAllPostsMeta().slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <PageBackground />

      {/* ── HERO ── */}
      <HeroSection />

      {/* ── SERVICE TYPE A ── */}
      <section className="py-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-8 h-8 bg-[#29abe2] rounded-full flex items-center justify-center text-white font-bold text-sm">A</span>
                <span className="inline-block bg-[#29abe2]/10 text-[#29abe2] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                  Permis &amp; Démarches · Toute la France · 100% à distance
                </span>
              </div>
              <h2 className="sr-only">Type A — Démarches administratives</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Nous constituons votre dossier de déclaration préalable ou de permis de construire en 24 à 72h, partout en France, 100% en ligne.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-8">
            {typeAServices.map((service, i) => (
              <AnimatedSection key={service.href} delay={i * 0.15}>
                <Link href={service.href} className="group block h-full">
                  <div className="h-full border-2 border-[#29abe2]/20 hover:border-[#29abe2] rounded-2xl p-8 transition-all hover:shadow-xl bg-gradient-to-br from-white to-[#29abe2]/3">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-[#3d3d3d] group-hover:text-[#29abe2] transition-colors">{service.title}</h3>
                      <span className="bg-[#29abe2]/10 text-[#29abe2] text-sm font-bold px-4 py-1.5 rounded-full">{service.delay}</span>
                    </div>
                    <ul className="space-y-2 mb-8">
                      {service.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-gray-600 text-sm">
                          <svg className="w-4 h-4 text-[#29abe2] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="inline-flex items-center gap-1 text-[#29abe2] font-semibold text-sm group-hover:gap-3 transition-all">
                      En savoir plus
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE TYPE B ── */}
      <section className="relative py-24 bg-transparent">
        <SectionCloud />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-8 h-8 bg-[#3d3d3d]/10 border border-[#3d3d3d]/30 rounded-full flex items-center justify-center text-[#3d3d3d] font-bold text-sm">B</span>
                <span className="inline-block bg-[#3d3d3d]/5 text-gray-600 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                  Conception &amp; Maîtrise d&apos;œuvre · Vendée · 30km autour des Herbiers
                </span>
              </div>
              <h2 className="sr-only">Type B — Maîtrise d&apos;œuvre</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                De la conception des plans jusqu&apos;à la réception des travaux, nous pilotons votre projet de A à Z en Vendée.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {typeBServices.map((service, i) => (
              <AnimatedSection key={service.href} delay={i * 0.1}>
                <Link href={service.href} className="group block h-full">
                  <div className="h-full bg-white shadow-sm border border-gray-100 hover:shadow-md hover:border-[#29abe2]/30 rounded-2xl p-6 transition-all">
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <h3 className="font-bold text-[#3d3d3d] mb-2 group-hover:text-[#29abe2] transition-colors">{service.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{service.desc}</p>
                    <span className="text-[#29abe2] text-sm font-semibold">Découvrir →</span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection className="mt-10 text-center">
            <Link href="/maitrise-oeuvre" className="inline-flex items-center gap-2 border-2 border-[#3d3d3d]/30 hover:border-[#3d3d3d] text-[#3d3d3d] font-semibold px-8 py-3.5 rounded-full transition-all">
              Vue d&apos;ensemble maîtrise d&apos;œuvre
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ── POUR LES PROS TEASER ── */}
      <section className="py-16 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="bg-white shadow-sm rounded-2xl p-8 md:p-12 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <span className="inline-block bg-[#29abe2]/10 text-[#29abe2] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">Pour les Pros</span>
                <h3 className="text-2xl font-bold text-[#3d3d3d] mb-2">Vous êtes un artisan du BTP ?</h3>
                <p className="text-gray-500">
                  Menuisiers, piscinistes, maçons, paysagistes — sous-traitez vos DP/PC et obtenez des plans AutoCAD professionnels en 48h.
                </p>
              </div>
              <Link
                href="/espace-pro"
                className="flex-shrink-0 inline-flex items-center gap-2 bg-[#29abe2] hover:bg-[#1a9fd6] text-white font-semibold px-8 py-4 rounded-full transition-all shadow-lg hover:-translate-y-0.5"
              >
                Pour les Pros
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── PROCESSUS ── */}
      <section className="relative py-24 bg-transparent">
        <SectionCloud />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#3d3d3d] mb-4">Comment ça marche ?</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Un processus simple et transparent, de la première prise de contact à la livraison.</p>
          </AnimatedSection>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Prise de contact', desc: 'Expliquez-nous votre projet en quelques lignes. Réponse sous 24h.' },
              { step: '02', title: 'Étude gratuite', desc: 'Analyse de votre PLU et faisabilité de votre projet.' },
              { step: '03', title: 'Constitution du dossier', desc: 'Nous préparons tous les documents nécessaires.' },
              { step: '04', title: 'Dépôt & suivi', desc: "Dépôt en mairie et suivi jusqu'à l'obtention de l'autorisation." },
            ].map((step, i) => (
              <AnimatedSection key={step.step} delay={i * 0.1}>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#29abe2] text-white font-bold text-lg rounded-full flex items-center justify-center mx-auto mb-4">{step.step}</div>
                  <h3 className="font-bold text-[#3d3d3d] mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── RÉALISATIONS — Auto-scrolling carousel ── */}
      <section className="py-24 bg-transparent overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <AnimatedSection className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#29abe2]">Portfolio</span>
              <h2 className="text-3xl font-bold text-[#3d3d3d] mt-2">Quelques réalisations</h2>
            </div>
            <Link href="/nos-realisations" className="text-[#29abe2] font-semibold text-sm hover:text-[#1a9fd6] transition-colors">
              Voir tout le portfolio →
            </Link>
          </AnimatedSection>
        </div>
        <div className="overflow-hidden">
          <div
            className="carousel-scroll flex"
            style={{ width: '7104px' }}
          >
            {[...carouselImages, ...carouselImages].map((img, i) => (
              <div
                key={i}
                className="relative flex-shrink-0 rounded-2xl overflow-hidden"
                style={{ width: '280px', height: '210px', marginRight: '16px' }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="280px"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {posts.length > 0 && (
        <section className="relative py-24 bg-transparent">
          <SectionCloud />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#29abe2]">Ressources</span>
                <h2 className="text-3xl font-bold text-[#3d3d3d] mt-2">Guides & conseils</h2>
              </div>
              <Link href="/blog" className="text-[#29abe2] font-semibold text-sm hover:text-[#1a9fd6] transition-colors">Tous les articles →</Link>
            </AnimatedSection>
            <div className="grid md:grid-cols-3 gap-8">
              {posts.map((post, i) => (
                <AnimatedSection key={post.slug} delay={i * 0.1}>
                  <Link href={`/blog/${post.slug}`} className="group block">
                    <div className="h-1.5 bg-gradient-to-r from-[#29abe2] to-[#1a9fd6] rounded-t-2xl" />
                    <div className="border border-t-0 border-gray-100 rounded-b-2xl p-6 group-hover:shadow-lg transition-all">
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-xs bg-[#29abe2]/10 text-[#29abe2] px-2.5 py-0.5 rounded-full">{tag}</span>
                        ))}
                      </div>
                      <h3 className="font-bold text-[#3d3d3d] group-hover:text-[#29abe2] transition-colors mb-2 line-clamp-2">{post.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">{post.description}</p>
                      <p className="text-xs text-gray-400 mt-4">{new Date(post.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── ZONE ── */}
      <section className="py-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#3d3d3d] mb-4">Zone d&apos;intervention</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Notre agence est basée à <strong>Beaurepaire (85)</strong>, Vendée. Maîtrise d&apos;œuvre dans un rayon de 30 km autour des Herbiers, démarches administratives partout en France.
            </p>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-6">
            <AnimatedSection direction="left">
              <div className="bg-white rounded-2xl p-8 border-2 border-[#29abe2]/20 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#29abe2] rounded-full flex items-center justify-center text-white font-bold">A</div>
                  <div>
                    <h3 className="font-bold text-[#3d3d3d]">Permis &amp; Démarches</h3>
                    <p className="text-xs text-[#29abe2] font-semibold">100% distanciel · Toute la France</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">DP et PC partout en France. Nous travaillons avec votre mairie à distance, sans déplacement.</p>
                <div className="flex flex-wrap gap-2">
                  {['Vendée', 'Loire-Atlantique', 'Maine-et-Loire', 'Deux-Sèvres', 'Île-de-France', '...et toute la France'].map((z) => (
                    <span key={z} className="text-xs bg-[#29abe2]/10 text-[#29abe2] px-2.5 py-1 rounded-full">{z}</span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right">
              <div className="bg-white rounded-2xl p-8 border-2 border-[#3d3d3d]/10 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#3d3d3d] rounded-full flex items-center justify-center text-white font-bold">B</div>
                  <div>
                    <h3 className="font-bold text-[#3d3d3d]">Conception &amp; Maîtrise d&apos;œuvre</h3>
                    <p className="text-xs text-gray-500 font-semibold">30 km autour des Herbiers</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">Nous nous déplaçons sur chantier. Zone : bocage vendéen et communes limitrophes.</p>
                <div className="flex flex-wrap gap-2">
                  {['Les Herbiers', 'Montaigu', 'Cholet', 'Bressuire', 'Pouzauges', 'Saint-Fulgent', 'Mortagne-sur-Sèvre', '...'].map((z) => (
                    <span key={z} className="text-xs bg-gray-100 text-[#3d3d3d] px-2.5 py-1 rounded-full">{z}</span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── CTA FINALE ── */}
      <section className="py-24 bg-transparent">
        <AnimatedSection className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] mb-4">Prêt à lancer votre projet ?</h2>
          <p className="text-gray-600 text-lg mb-10">Décrivez-nous votre projet en quelques mots. Nous vous répondons sous 24h avec une étude de faisabilité gratuite.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-[#29abe2] hover:bg-[#1a9fd6] text-white font-bold px-10 py-4 rounded-full transition-all hover:-translate-y-0.5 shadow-lg">
              Démarrer mon projet
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/espace-pro" className="inline-flex items-center gap-2 border-2 border-gray-300 hover:border-[#1a1a1a] text-[#1a1a1a] font-semibold px-8 py-4 rounded-full transition-all">
              Pour les Pros
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
