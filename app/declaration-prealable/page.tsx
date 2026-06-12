import type { Metadata } from 'next';
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';
import PageHero from '@/components/PageHero';
import StartProjectButton from '@/components/StartProjectButton';
import { PageBackground } from '@/components/PageBackground';
import { ServiceCTA } from '@/components/ServiceCTA';
import { SectionCloud } from '@/components/SectionCloud';

export const metadata: Metadata = {
  title: 'Déclaration Préalable de Travaux — Dossier complet en 24-48h',
  description: "Projego réalise votre déclaration préalable (piscine, pergola, extension, clôture...) partout en France. Dossier complet en 24 à 48h, 100% à distance.",
  openGraph: {
    title: 'Déclaration Préalable de Travaux — Dossier complet en 24-48h | Projego',
    description: "Projego réalise votre déclaration préalable (piscine, pergola, extension, clôture...) partout en France. Dossier complet en 24 à 48h, 100% à distance.",
    url: 'https://www.projego.fr/declaration-prealable',
    type: 'website',
  },
};

const projects = [
  { title: 'Piscine hors-sol ou semi-enterrée', desc: 'Moins de 100 m², non couverte, hauteur de plage < 1m' },
  { title: 'Pergola et carport', desc: 'Toute surface > 5 m², adossés ou indépendants' },
  { title: 'Clôture et portail', desc: 'Dans la plupart des communes (variable selon PLU)' },
  { title: 'Extension ≤ 40 m²', desc: 'En zone urbaine avec PLU (≤ 20 m² hors zone)' },
  { title: 'Vélux et ouvertures en toiture', desc: "Modification de l'aspect extérieur du bâtiment" },
  { title: 'Abri de jardin (5 à 20 m²)', desc: 'Toute construction légère de stockage' },
  { title: 'Ravalement de façade', desc: "Si changement d'aspect dans une commune réglementée" },
  { title: 'Changement de fenêtres', desc: "Si modification de l'aspect extérieur" },
  { title: 'Panneaux solaires en façade ou toiture', desc: "Selon les règles locales" },
  { title: 'Terrasse surélevée', desc: "Dalle ou structure supérieure à 0,60 m" },
  { title: 'Emprise au sol 5 à 20 m²', desc: "Toute construction légère entrant dans ces critères" },
  { title: 'Modification de toiture', desc: "Changement de matériaux, couleur ou pente" },
];

const steps = [
  { n: '01', title: 'Vous nous contactez', desc: 'Envoyez-nous les informations sur votre projet et votre commune. Réponse sous 4h.' },
  { n: '02', title: "Analyse du PLU", desc: "Nous étudions les règles d'urbanisme de votre commune et vérifions la faisabilité." },
  { n: '03', title: 'Constitution du dossier', desc: "Formulaire Cerfa, plan de masse, plan de situation, photos, document graphique — tout est préparé." },
  { n: '04', title: 'Livraison en 24-48h', desc: "Vous recevez un dossier complet, prêt à déposer en mairie (ou nous le déposons pour vous)." },
];

const faq = [
  { q: "Qu'est-ce qu'une déclaration préalable ?", a: "La déclaration préalable (DP) est une autorisation administrative obligatoire pour de nombreux petits travaux qui modifient l'aspect extérieur d'un bâtiment ou créent jusqu'à 40 m² de surface. Elle est moins complexe qu'un permis de construire et concerne notamment les piscines, pergolas, clôtures, extensions légères ou velux." },
  { q: "Quels travaux nécessitent une déclaration préalable ?", a: "Les travaux soumis à déclaration préalable incluent : les piscines non couvertes de moins de 100 m², les pergolas et carports, les clôtures et portails, les extensions jusqu'à 40 m² en zone avec PLU, les vélux et ouvertures en toiture, les abris de jardin (5 à 20 m²), les ravalements de façade en zone réglementée, et les panneaux solaires en façade." },
  { q: "Quel est le délai d'instruction d'une déclaration préalable ?", a: "Le délai légal d'instruction est d'un mois à compter du dépôt d'un dossier complet. En l'absence de réponse de la mairie dans ce délai, c'est un accord tacite. En secteur protégé (monument historique, AVAP), le délai est de 2 mois. Projego constitue votre dossier en 24 à 48h." },
  { q: "Combien coûte une déclaration préalable ?", a: "Le coût de nos prestations dépend de la nature du projet. Contactez-nous pour un devis personnalisé et gratuit. Le dépôt en mairie est gratuit." },
  { q: "Que se passe-t-il si la mairie refuse ?", a: "Vous pouvez déposer un recours gracieux auprès du maire, puis un recours contentieux devant le tribunal administratif. Nous vous guidons dans cette démarche." },
  { q: "Vous intervenez dans ma commune ?", a: "Oui, nous intervenons partout en France, 100% à distance. Le délai et le process sont identiques quelle que soit votre commune." },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
};

export default function DeclarationPrealablePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PageBackground />
      <PageHero
        title="Déclaration Préalable de Travaux — Dossier complet en 24-48h"
        subtitle="Partout en France, 100% à distance."
        badge="Service Type A — Toute la France"
        typewriterTexts={["piscine", "pergola", "extension < 40m²", "clôture", "véranda", "carport"]}
      />

      {/* ── INTRO ── */}
      <section className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <span className="text-xs font-bold uppercase tracking-widest text-[#29abe2] mb-3 block">Qu&apos;est-ce que c&apos;est ?</span>
              <h2 className="text-3xl font-bold text-[#3d3d3d] mb-6">La déclaration préalable, simplifiée</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                La <strong>déclaration préalable (DP)</strong> est une autorisation administrative obligatoire pour de nombreux petits travaux. Moins complexe qu&apos;un permis de construire, elle concerne principalement les aménagements qui modifient l&apos;aspect extérieur d&apos;un bâtiment ou créent jusqu&apos;à 40 m² de surface.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Un dossier incomplet entraîne des demandes de pièces complémentaires et des délais supplémentaires. <strong>Chez Projego, nous garantissons un dossier complet dès le premier dépôt.</strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <StartProjectButton className="inline-flex items-center justify-center gap-2 bg-[#29abe2] text-white font-semibold px-7 py-3.5 rounded-full hover:bg-[#1a9fd6] transition-all">
                  Démarrer mon projet
                </StartProjectButton>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-8">
                <h3 className="font-bold text-[#3d3d3d] text-lg mb-6">Notre engagement</h3>
                <div className="space-y-4">
                  {[
                    { icon: '⚡', title: 'Dossier en 24-48h', desc: 'Livraison express garantie' },
                    { icon: '🇫🇷', title: 'Toute la France', desc: '100% distanciel, peu importe votre commune' },
                    { icon: '✅', title: 'Dossier complet', desc: 'Zéro pièce manquante au dépôt' },
                    { icon: '🔍', title: 'Analyse PLU incluse', desc: "Vérification des règles locales avant de constituer le dossier" },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-4">
                      <div className="text-2xl">{item.icon}</div>
                      <div>
                        <p className="font-semibold text-[#3d3d3d]">{item.title}</p>
                        <p className="text-gray-500 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── PROJETS CONCERNÉS ── */}
      <section className="relative py-20 bg-transparent">
        <SectionCloud />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#3d3d3d] mb-4">Quels projets sont concernés ?</h2>
            <p className="text-gray-500 max-w-xl mx-auto">La déclaration préalable s&apos;applique à de nombreux travaux courants. Voici les principaux cas :</p>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((p, i) => (
              <AnimatedSection key={p.title} delay={i * 0.05}>
                <div className="bg-white rounded-xl p-5 border border-gray-100 hover:border-[#29abe2]/30 hover:shadow-md transition-all">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#29abe2] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    <div>
                      <p className="font-semibold text-[#3d3d3d] text-sm">{p.title}</p>
                      <p className="text-gray-400 text-xs mt-1">{p.desc}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection className="mt-6 text-center">
            <p className="text-gray-400 text-sm">Vous ne trouvez pas votre projet dans cette liste ? <Link href="/contact" className="text-[#29abe2] font-semibold">Contactez-nous</Link>, nous l&apos;étudions gratuitement.</p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── ÉTAPES ── */}
      <section className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#3d3d3d] mb-4">Comment ça se passe ?</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <AnimatedSection key={s.n} delay={i * 0.1}>
                <div className="text-center">
                  <div className="w-14 h-14 bg-[#3d3d3d] text-white font-bold text-xl rounded-full flex items-center justify-center mx-auto mb-4">{s.n}</div>
                  <h3 className="font-bold text-[#3d3d3d] mb-2">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="relative py-20 bg-transparent">
        <SectionCloud />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#3d3d3d] mb-4">Questions fréquentes</h2>
          </AnimatedSection>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.07}>
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                  <h3 className="font-bold text-[#3d3d3d] mb-2">{item.q}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIENS INTERNES ── */}
      <section className="py-16 bg-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-2">Besoin d&apos;une autre autorisation ?</h2>
            <p className="text-gray-500 text-sm">Votre projet nécessite peut-être un permis de construire plutôt qu&apos;une déclaration préalable.</p>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/permis-de-construire" className="group block border-2 border-gray-100 hover:border-[#29abe2] rounded-2xl p-6 transition-all hover:shadow-md">
              <h3 className="font-bold text-[#3d3d3d] group-hover:text-[#29abe2] transition-colors mb-1">Permis de Construire</h3>
              <p className="text-gray-500 text-sm">Maison neuve, extension &gt; 40 m², surélévation — dossier en 48-72h.</p>
              <span className="text-[#29abe2] text-sm font-semibold mt-3 inline-block">En savoir plus →</span>
            </Link>
            <Link href="/maitrise-oeuvre" className="group block border-2 border-gray-100 hover:border-[#29abe2] rounded-2xl p-6 transition-all hover:shadow-md">
              <h3 className="font-bold text-[#3d3d3d] group-hover:text-[#29abe2] transition-colors mb-1">Maîtrise d&apos;œuvre en Vendée</h3>
              <p className="text-gray-500 text-sm">Conception, plans et suivi de chantier dans un rayon de 30 km autour des Herbiers.</p>
              <span className="text-[#29abe2] text-sm font-semibold mt-3 inline-block">En savoir plus →</span>
            </Link>
          </div>
          <AnimatedSection className="mt-6 text-center">
            <p className="text-gray-400 text-sm mb-3">Déclaration préalable par ville :</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['Les Herbiers', 'Cholet', 'Montaigu', 'Bressuire', 'Saint-Fulgent', 'Pouzauges', 'Chantonnay', 'Clisson'].map((ville) => (
                <Link
                  key={ville}
                  href={`/declaration-prealable/${ville.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-')}`}
                  className="text-xs bg-white border border-gray-200 text-[#3d3d3d] hover:border-[#29abe2] hover:text-[#29abe2] px-3 py-1.5 rounded-full transition-all"
                >
                  DP {ville}
                </Link>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <ServiceCTA
        title="Votre déclaration préalable, en 24-48h"
        description="Envoyez-nous les informations sur votre projet. Nous analysons la faisabilité gratuitement et vous préparons le dossier complet, prêt à déposer en mairie."
        photo="/69a21054581df_Capturedecran2026-02-27a22.42.46.png"
      />
    </>
  );
}
