import type { Metadata } from 'next';
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';
import PageHero from '@/components/PageHero';
import { PageBackground } from '@/components/PageBackground';
import { ServiceCTA } from '@/components/ServiceCTA';
import { SectionCloud } from '@/components/SectionCloud';

export const metadata: Metadata = {
  title: 'Permis de Construire — Dossier complet en 48-72h',
  description: "Projego constitue votre dossier de permis de construire (maison neuve, extension, surélévation) partout en France. Délai : 48 à 72h, 100% en ligne.",
  openGraph: {
    title: 'Permis de Construire — Dossier complet en 48-72h | Projego',
    description: "Projego constitue votre dossier de permis de construire (maison neuve, extension, surélévation) partout en France. Délai : 48 à 72h, 100% en ligne.",
    url: 'https://www.projego.fr/permis-de-construire',
    type: 'website',
  },
};

const projects = [
  { title: 'Maison individuelle neuve', desc: 'Toute superficie, quel que soit le terrain' },
  { title: 'Extension > 40 m²', desc: 'En zone urbaine avec PLU (ou > 20 m² hors zone)' },
  { title: 'Surélévation avec changement de volume', desc: "Ajout d'un niveau ou aménagement de combles en surface habitable" },
  { title: "Changement de destination avec modification de structure", desc: "Ex : grange en habitation avec travaux de structure" },
  { title: "Construction de garage > 20 m²", desc: "Attaché ou indépendant, si emprise au sol > 20 m²" },
  { title: "Piscine couverte > 100 m²", desc: "Ou avec un abri de plus de 1,80 m de hauteur" },
  { title: "Reconstruction après démolition", desc: "Reconstruction à l'identique ou modifiée" },
  { title: "Annexe habitable indépendante", desc: "Studio, dépendance, chambre d'hôtes..." },
];

const documents = [
  { code: 'Cerfa', title: 'Formulaire de demande', desc: "Cerfa n°13406 pour les permis de construire" },
  { code: 'PC1', title: 'Plan de situation', desc: "Localisation du terrain dans la commune (IGN, cadastre)" },
  { code: 'PC2', title: 'Plan de masse coté 3D', desc: "Emprise de la construction, accès, réseaux, plantations" },
  { code: 'PC3', title: 'Plan en coupe', desc: "Coupe du terrain et du bâtiment avec cotes altimétriques" },
  { code: 'PC4', title: 'Notice descriptive', desc: "Présentation du terrain et description du projet" },
  { code: 'PC5', title: 'Plans de façades et toitures', desc: "Les 4 façades avec matériaux et couleurs" },
  { code: 'PC7', title: 'Document graphique d\'insertion', desc: "Simulation de l'intégration dans le paysage" },
  { code: 'PC8', title: 'Photographies', desc: "Depuis et vers le terrain, environnement proche et lointain" },
];

const faq = [
  { q: "Qu'est-ce qu'un permis de construire ?", a: "Le permis de construire est une autorisation administrative obligatoire pour toute construction nouvelle et pour les travaux importants sur un bâtiment existant. Il est instruit par la mairie ou la communauté de communes compétente. Plus complexe que la déclaration préalable, il concerne les maisons neuves, les extensions > 40 m², les surélévations et les changements de destination avec modification de structure." },
  { q: "Quels travaux nécessitent un permis de construire ?", a: "Sont soumis au permis de construire : toute maison individuelle neuve quelle que soit sa surface, les extensions > 40 m² en zone avec PLU (> 20 m² hors zone), les surélévations créant de la surface habitable, les changements de destination avec modification de structure (ex : grange en maison), les piscines couvertes > 100 m², et les garages > 20 m² d'emprise." },
  { q: "Quel est le délai d'instruction d'un permis de construire ?", a: "Le délai légal est de 2 mois pour une maison individuelle, 3 mois pour les autres constructions. En secteur protégé (monument historique, site classé), comptez 4 à 6 mois. Projego prépare votre dossier complet en 48 à 72h." },
  { q: "Combien coûte un permis de construire ?", a: "Le dépôt en mairie est gratuit. Les honoraires de Projego pour la constitution du dossier dépendent de la complexité du projet. Contactez-nous pour un devis gratuit." },
  { q: "Faut-il obligatoirement un architecte ?", a: "Oui si la surface de plancher dépasse 150 m². En dessous de ce seuil, un maître d'œuvre comme Projego peut constituer et signer votre dossier." },
  { q: "Quand peut-on commencer les travaux ?", a: "Dès l'obtention du permis, après le délai de recours des tiers (2 mois à compter de l'affichage sur le terrain). Vous devez également déposer une déclaration d'ouverture de chantier." },
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

export default function PermisDeConstrirePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PageBackground />
      <PageHero
        title="Permis de Construire — Dossier complet en 48-72h, toute la France"
        subtitle="Maison neuve, extension, surélévation."
        badge="Service Type A — Toute la France"
        typewriterTexts={["maison neuve", "extension > 40m²", "surélévation", "transformation de combles"]}
      />

      <section className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <span className="text-xs font-bold uppercase tracking-widest text-[#29abe2] mb-3 block">Expertise & rapidité</span>
              <h2 className="text-3xl font-bold text-[#3d3d3d] mb-6">Un dossier solide dès le premier dépôt</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Le permis de construire est l&apos;autorisation la plus complexe du droit de l&apos;urbanisme. Un dossier incomplet ou mal constitué peut entraîner un refus ou des mois de délai supplémentaire.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Chez Projego, nous maîtrisons parfaitement les règles d&apos;urbanisme et constituons des dossiers <strong>complets, conformes et optimisés</strong> pour maximiser vos chances d&apos;obtenir une réponse favorable rapidement.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-[#29abe2] text-white font-semibold px-7 py-3.5 rounded-full hover:bg-[#1a9fd6] transition-all">
                Nous contacter
              </Link>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: '⚡', label: 'Dossier en 48-72h', sub: 'Livraison express' },
                  { icon: '🇫🇷', label: 'Toute la France', sub: '100% distanciel' },
                  { icon: '📋', label: 'Dossier complet', sub: 'Aucune pièce manquante' },
                  { icon: '🏆', label: '150+ PC réalisés', sub: 'Expérience éprouvée' },
                ].map((item) => (
                  <div key={item.label} className="bg-white shadow-sm border border-gray-100 rounded-2xl p-6 text-center">
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <p className="font-bold text-[#3d3d3d] text-sm">{item.label}</p>
                    <p className="text-gray-400 text-xs mt-1">{item.sub}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── PROJETS ── */}
      <section className="relative py-20 bg-transparent">
        <SectionCloud />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#3d3d3d] mb-4">Projets nécessitant un permis de construire</h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {projects.map((p, i) => (
              <AnimatedSection key={p.title} delay={i * 0.05}>
                <div className="bg-white rounded-xl p-5 border border-gray-100 h-full hover:border-[#29abe2]/30 hover:shadow-md transition-all">
                  <svg className="w-5 h-5 text-[#29abe2] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  <p className="font-semibold text-[#3d3d3d] text-sm mb-1">{p.title}</p>
                  <p className="text-gray-400 text-xs">{p.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── DOCUMENTS ── */}
      <section className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#3d3d3d] mb-4">Les pièces du dossier</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Nous constituons l&apos;intégralité du dossier. Voici les pièces obligatoires que nous préparons :</p>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {documents.map((doc, i) => (
              <AnimatedSection key={doc.code} delay={i * 0.05}>
                <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-5">
                  <span className="text-xs font-bold bg-[#29abe2] text-white px-2.5 py-1 rounded-full mb-3 inline-block">{doc.code}</span>
                  <p className="font-semibold text-[#3d3d3d] text-sm mb-1">{doc.title}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{doc.desc}</p>
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
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-2">Votre projet est plus petit ?</h2>
            <p className="text-gray-500 text-sm">Une déclaration préalable est peut-être suffisante pour vos travaux.</p>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/declaration-prealable" className="group block border-2 border-gray-100 hover:border-[#29abe2] rounded-2xl p-6 transition-all hover:shadow-md">
              <h3 className="font-bold text-[#3d3d3d] group-hover:text-[#29abe2] transition-colors mb-1">Déclaration Préalable</h3>
              <p className="text-gray-500 text-sm">Piscine, pergola, extension &lt; 40 m², clôture — dossier en 24-48h.</p>
              <span className="text-[#29abe2] text-sm font-semibold mt-3 inline-block">En savoir plus →</span>
            </Link>
            <Link href="/maitrise-oeuvre" className="group block border-2 border-gray-100 hover:border-[#29abe2] rounded-2xl p-6 transition-all hover:shadow-md">
              <h3 className="font-bold text-[#3d3d3d] group-hover:text-[#29abe2] transition-colors mb-1">Maîtrise d&apos;œuvre en Vendée</h3>
              <p className="text-gray-500 text-sm">Conception, plans et suivi de chantier dans un rayon de 30 km autour des Herbiers.</p>
              <span className="text-[#29abe2] text-sm font-semibold mt-3 inline-block">En savoir plus →</span>
            </Link>
          </div>
          <AnimatedSection className="mt-6 text-center">
            <p className="text-gray-400 text-sm mb-3">Permis de construire par ville :</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['Les Herbiers', 'Cholet', 'Montaigu', 'Bressuire', 'Saint-Fulgent', 'Pouzauges', 'Chantonnay', 'Clisson'].map((ville) => (
                <Link
                  key={ville}
                  href={`/permis-de-construire/${ville.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-')}`}
                  className="text-xs bg-white border border-gray-200 text-[#3d3d3d] hover:border-[#29abe2] hover:text-[#29abe2] px-3 py-1.5 rounded-full transition-all"
                >
                  PC {ville}
                </Link>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <ServiceCTA
        title="Votre permis de construire en 48-72h"
        description="Décrivez votre projet. Nous vérifions la faisabilité et vous préparons un dossier complet et optimisé, pour maximiser vos chances d'obtenir une réponse favorable rapidement."
        photo="/69a21054581df_Capturedecran2026-02-27a22.42.46.png"
      />
    </>
  );
}
