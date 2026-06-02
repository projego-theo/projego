import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import AnimatedSection from '@/components/AnimatedSection';
import PageHero from '@/components/PageHero';
import { PageBackground } from '@/components/PageBackground';
import { SectionCloud } from '@/components/SectionCloud';

export const metadata: Metadata = {
  title: { absolute: 'À propos — Projego, anciennement TConseils' },
  description: "Projego, anciennement TConseils, accompagne les projets de construction et d'aménagement depuis 2019. Basé à Beaurepaire (85), Vendée.",
  openGraph: {
    title: 'À propos de Projego — Anciennement TConseils depuis 2019 | Projego',
    description: "Projego, anciennement TConseils, accompagne les projets de construction et d'aménagement depuis 2019. Basé à Beaurepaire (85), Vendée.",
    url: 'https://www.projego.fr/a-propos',
    type: 'website',
  },
};

const values = [
  { icon: '🎯', title: 'Précision', desc: 'Chaque dossier est traité avec le plus grand soin. Nous ne déposons que des dossiers complets et conformes.' },
  { icon: '⚡', title: 'Réactivité', desc: 'Réponse sous 24h, dossiers livrés en 24-72h. Le respect de vos délais est notre priorité.' },
  { icon: '🤝', title: 'Transparence', desc: 'Tarifs clairs, devis détaillés, suivi régulier. Vous savez toujours où en est votre projet.' },
  { icon: '📍', title: 'Ancrage local', desc: 'Basés à Beaurepaire (Vendée), nous connaissons le territoire, ses acteurs et ses spécificités réglementaires.' },
];

const expertise = [
  { label: "Droit de l'urbanisme", level: 95 },
  { label: 'Conception architecturale', level: 90 },
  { label: 'Gestion de projet', level: 88 },
  { label: 'Dessin technique AutoCAD (2D/3D)', level: 92 },
];

export default function AProposPage() {
  return (
    <>
      <PageBackground />
      <PageHero
        title="À propos de Projego"
        subtitle="8 ans d'expérience dans les démarches administratives et la maîtrise d'œuvre, au cœur du bocage vendéen."
        badge="Notre histoire"
        compact
      />

      {/* ── PRÉSENTATION ── */}
      <section className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <span className="text-xs font-bold uppercase tracking-widest text-[#29abe2] mb-3 block">Qui sommes-nous ?</span>
              <h2 className="text-3xl font-bold text-[#3d3d3d] mb-6">De TConseils à Projego — 8 ans à vos côtés</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Projego est l&apos;évolution de <strong>TConseils</strong>, en activité depuis <strong>2019</strong>. Au fil des années, notre cœur de métier s&apos;est précisé autour de l&apos;accompagnement des projets de construction et d&apos;aménagement — et notre nom devait le refléter.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                TConseils faisait davantage penser à un cabinet de conseil généraliste. Le nouveau nom <strong>Projego</strong> — de &quot;projet&quot; — est simple, direct, et dit ce qu&apos;on fait : accompagner vos projets, de A à Z.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Basés à <strong>Beaurepaire (85)</strong>, en Vendée, nous accompagnons particuliers et professionnels dans leurs projets de construction, d&apos;extension et de rénovation, en prenant en charge à la fois les <strong>démarches administratives</strong> (déclaration préalable, permis de construire — partout en France) et la <strong>maîtrise d&apos;œuvre</strong> locale (Vendée, 30 km autour des Herbiers).
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                <Link href="/contact" className="inline-flex items-center gap-2 bg-[#29abe2] text-white font-semibold px-7 py-3.5 rounded-full hover:bg-[#1a9fd6] transition-all">
                  Prendre contact
                </Link>
                <Link href="/nos-realisations" className="inline-flex items-center gap-2 border-2 border-gray-200 text-[#3d3d3d] font-semibold px-7 py-3.5 rounded-full hover:border-[#29abe2] transition-all">
                  Voir nos réalisations
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="space-y-4">
                <div className="relative h-64 rounded-2xl overflow-hidden">
                  <Image
                    src="/69a20d160e9b5_Capturedecran2026-02-27a22.30.13.png"
                    alt="Plans et conception Projego"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3d3d3d]/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-white text-sm font-semibold">Plans techniques AutoCAD</span>
                  </div>
                </div>
                <div className="bg-[#3d3d3d] rounded-2xl p-6 text-white">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: '8 ans', label: "D'expérience (depuis 2019)" },
                      { value: '+900', label: 'Démarches réalisées' },
                      { value: '30 km', label: 'Zone maîtrise d\'œuvre' },
                      { value: '100%', label: 'France pour DP/PC' },
                    ].map((s) => (
                      <div key={s.label} className="text-center">
                        <p className="text-2xl font-bold text-[#29abe2]">{s.value}</p>
                        <p className="text-gray-400 text-xs mt-1">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── HISTOIRE ── */}
      <section className="relative py-20 bg-transparent">
        <SectionCloud />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <div className="relative h-80 rounded-2xl overflow-hidden">
                <Image
                  src="/equipe-projego.png"
                  alt="Projego - maîtrise d'œuvre en Vendée"
                  fill
                  className="object-cover"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <span className="text-xs font-bold uppercase tracking-widest text-[#29abe2] mb-3 block">Notre histoire</span>
              <h2 className="text-3xl font-bold text-[#3d3d3d] mb-6">Un nom qui dit ce qu&apos;on fait</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  <strong className="text-[#3d3d3d]">2019</strong> — Création de TConseils avec l&apos;activité de maîtrise d&apos;œuvre, principalement sur les projets de rénovation, uniques avec beaucoup de complexité. Puis développement progressif de l&apos;activité dans le neuf.
                </p>
                <p>
                  <strong className="text-[#3d3d3d]">2022</strong> — Lancement de l&apos;activité autour des démarches d&apos;urbanisme et du conseil en construction. Les premiers dossiers, les premières mairies, le tout principalement dans notre secteur.
                </p>
                <p>
                  <strong className="text-[#3d3d3d]">Fin 2024</strong> — Naissance de l&apos;idée Projego. TConseils va se transformer progressivement vers Projego. Un nom plus évocateur, centré sur ce que nous faisons vraiment. Début du déploiement national, pour toutes demandes de déclarations préalables et permis de construire.
                </p>
                <p>
                  <strong className="text-[#3d3d3d]">2025</strong> — Début de la filière B2B pour les démarches administratives.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── VALEURS ── */}
      <section className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#3d3d3d] mb-4">Nos valeurs</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Ce qui nous guide au quotidien dans notre travail avec vous.</p>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 0.1}>
                <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-6 h-full text-center hover:shadow-lg transition-all">
                  <div className="text-4xl mb-4">{v.icon}</div>
                  <h3 className="font-bold text-[#3d3d3d] mb-2">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERTISE ── */}
      <section className="relative py-20 bg-transparent">
        <SectionCloud />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <h2 className="text-3xl font-bold text-[#3d3d3d] mb-8">Nos domaines d&apos;expertise</h2>
              <div className="space-y-6">
                {expertise.map((e, i) => (
                  <div key={e.label}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-semibold text-[#3d3d3d]">{e.label}</span>
                      <span className="text-sm text-[#29abe2] font-bold">{e.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <AnimatedSection delay={i * 0.1} direction="none">
                        <div
                          className="h-full bg-gradient-to-r from-[#29abe2] to-[#1a9fd6] rounded-full"
                          style={{ width: `${e.level}%` }}
                        />
                      </AnimatedSection>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-6 border-2 border-[#29abe2]/20">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-7 h-7 bg-[#29abe2] rounded-full flex items-center justify-center text-white text-xs font-bold">A</span>
                    <h3 className="font-bold text-[#3d3d3d]">Type A — Toute la France</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Déclarations préalables et permis de construire partout en France, 100% à distance. Nous travaillons avec votre mairie, votre PLU, vos délais. +900 dossiers déposés.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 border-2 border-[#3d3d3d]/10">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-7 h-7 bg-[#3d3d3d] rounded-full flex items-center justify-center text-white text-xs font-bold">B</span>
                    <h3 className="font-bold text-[#3d3d3d]">Type B — Vendée, 30km des Herbiers</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Maîtrise d&apos;œuvre locale : conception, plans AutoCAD, permis, suivi de chantier. Nous nous déplaçons dans un rayon de 30 km autour des Herbiers, au cœur du bocage vendéen.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-transparent">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#1a1a1a] mb-4">Travaillons ensemble</h2>
          <p className="text-gray-600 mb-8">Vous avez un projet ? Racontez-nous. Nous vous proposons une étude gratuite et sans engagement.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-[#29abe2] hover:bg-[#1a9fd6] text-white font-bold px-10 py-4 rounded-full transition-all shadow-lg">
            Nous contacter
          </Link>
        </div>
      </section>
    </>
  );
}
