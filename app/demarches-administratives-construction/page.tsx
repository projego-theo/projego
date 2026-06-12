import type { Metadata } from 'next';
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';
import PageHero from '@/components/PageHero';
import { PageBackground } from '@/components/PageBackground';
import { ServiceCTA } from '@/components/ServiceCTA';
import { SectionCloud } from '@/components/SectionCloud';
import StartProjectButton from '@/components/StartProjectButton';

export const metadata: Metadata = {
  title: "Démarches Administratives Construction — Accompagnement Complet, toute la France",
  description:
    "Permis de construire, déclaration préalable, analyse PLU : Projego prend en charge toutes vos démarches administratives de construction, 100% en ligne, partout en France. Réponse sous 24h.",
  openGraph: {
    title: "Démarches Administratives Construction — Accompagnement Complet | Projego",
    description:
      "Permis de construire, déclaration préalable, analyse PLU : Projego prend en charge toutes vos démarches administratives de construction, 100% en ligne, partout en France. Réponse sous 24h.",
    url: 'https://www.projego.fr/demarches-administratives-construction',
    type: 'website',
  },
};

const services = [
  {
    code: 'DP',
    icon: '📄',
    title: 'Déclaration Préalable',
    delay: '24-48h',
    desc: 'Piscine, pergola, extension ≤ 40 m², clôture, ravalement, vélux. Dossier complet et conforme au PLU de votre commune.',
    href: '/declaration-prealable',
  },
  {
    code: 'PC',
    icon: '🏗️',
    title: 'Permis de Construire',
    delay: '48-72h',
    desc: 'Maison neuve, extension > 40 m², surélévation, changement de destination. Architectes DPLG partenaires si surface > 150 m².',
    href: '/permis-de-construire',
  },
  {
    code: 'PLU',
    icon: '🗺️',
    title: 'Analyse PLU',
    delay: 'Offerte',
    desc: "Vérification des règles d'urbanisme de votre commune : zonage, emprise, hauteur, aspect, reculs obligatoires.",
    href: '/contact',
  },
  {
    code: 'MOe',
    icon: '📐',
    title: 'Maîtrise d\'œuvre',
    delay: 'Vendée',
    desc: "Conception, plans, suivi de chantier. Pour les projets en Vendée (30 km autour des Herbiers).",
    href: '/maitrise-oeuvre',
  },
];

const pourquoi = [
  {
    icon: '⏱️',
    title: 'Gagnez du temps',
    desc: "Un dossier administratif prend en moyenne 15 à 30 heures à constituer pour un particulier. On le fait en 24-72h, à votre place.",
  },
  {
    icon: '✅',
    title: 'Zéro pièce manquante',
    desc: "Un dossier incomplet entraîne des demandes de compléments et rallonge l'instruction de plusieurs semaines. Nos dossiers sont complets dès le premier dépôt.",
  },
  {
    icon: '💻',
    title: '100% à distance',
    desc: "Tout se passe en ligne. Vous nous envoyez les éléments par e-mail, on vous livre le dossier prêt à déposer — sans déplacement.",
  },
  {
    icon: '🇫🇷',
    title: 'Toute la France',
    desc: "On intervient dans toutes les communes françaises. Notre expertise locale en Vendée s'applique partout.",
  },
];

const typesDemarches = [
  {
    title: 'Déclaration Préalable de Travaux (DP)',
    desc: "Obligatoire pour les petits travaux qui modifient l'aspect extérieur d'un bâtiment ou créent jusqu'à 40 m² de surface : piscine, pergola, clôture, ravalement de façade, vélux, extension légère.",
    delai: "1 mois d'instruction",
    notreDelai: '24-48h',
  },
  {
    title: 'Permis de Construire (PC)',
    desc: "Obligatoire pour toute construction neuve et pour les travaux importants : extension > 40 m², surélévation, changement de destination, maison individuelle. Architecte obligatoire si surface > 150 m².",
    delai: "2-3 mois d'instruction",
    notreDelai: '48-72h',
  },
  {
    title: 'Permis de Démolir (PD)',
    desc: "Requis pour démolir tout ou partie d'un bâtiment dans une commune ayant institué le permis de démolir, ou dans les zones protégées (monument historique, site classé).",
    delai: "2 mois d'instruction",
    notreDelai: 'Sur devis',
  },
  {
    title: 'Déclaration d\'Ouverture de Chantier (DOC)',
    desc: "Formalité administrative à déposer en mairie avant le démarrage des travaux autorisés par un permis de construire. Simple mais obligatoire pour faire courir le délai de validité du permis.",
    delai: 'Immédiat',
    notreDelai: '24h',
  },
];

const steps = [
  {
    n: '01',
    title: 'Vous nous décrivez votre projet',
    desc: 'Commune, surface, nature des travaux. Réponse sous 24h avec la ou les démarche(s) à effectuer.',
  },
  {
    n: '02',
    title: 'Étude gratuite',
    desc: "On consulte le PLU de votre commune et on vérifie la faisabilité du projet avant de démarrer.",
  },
  {
    n: '03',
    title: 'Constitution du dossier',
    desc: "Plans, Cerfa, notice descriptive, document graphique, photos — on prépare tout. Aucune pièce à préparer de votre côté.",
  },
  {
    n: '04',
    title: 'Livraison & accompagnement',
    desc: "Dossier livré en 24-72h, prêt à déposer. On reste disponibles jusqu'à l'obtention de votre autorisation.",
  },
];

const faq = [
  {
    q: "Quelles démarches administratives sont obligatoires pour construire une maison ?",
    a: "Toute construction d'une maison individuelle nécessite au minimum un permis de construire. Avant le démarrage du chantier, vous devez déposer une déclaration d'ouverture de chantier (DOC) et afficher le panneau de permis sur le terrain. À la fin, la déclaration attestant l'achèvement et la conformité des travaux (DAACT) doit être déposée en mairie. Projego peut prendre en charge toutes ces formalités.",
  },
  {
    q: "Quelle est la différence entre une DP et un permis de construire ?",
    a: "La déclaration préalable (DP) s'applique aux petits travaux (jusqu'à 40 m², modifications de façade, clôtures, piscines...) et est instruite en 1 mois. Le permis de construire (PC) concerne les constructions neuves et les travaux importants, et est instruit en 2 à 3 mois. Dans les deux cas, un dossier incomplet provoque des demandes de pièces complémentaires et rallonge l'instruction.",
  },
  {
    q: "Dois-je faire appel à un architecte pour mes démarches ?",
    a: "L'architecte est obligatoire uniquement pour les permis de construire dont la surface de plancher dépasse 150 m². En dessous de ce seuil, Projego peut constituer et signer l'ensemble de vos dossiers. Au-delà, nous faisons appel à l'un de nos architectes DPLG partenaires — sans démarche supplémentaire de votre côté.",
  },
  {
    q: "Combien de temps faut-il pour constituer un dossier de permis de construire ?",
    a: "Pour un particulier qui part de zéro, constituer un dossier de PC correct prend en moyenne 15 à 30 heures. Il faut comprendre le PLU, produire les plans réglementaires, remplir le Cerfa, réaliser un document graphique d'insertion... Projego livre ce même dossier en 48 à 72 heures, grâce à l'expertise accumulée sur plus de 150 dossiers.",
  },
  {
    q: "Que risque-t-on à commencer des travaux sans autorisation ?",
    a: "Les infractions au droit de l'urbanisme peuvent être sanctionnées par une mise en demeure de régulariser ou de démolir, une amende pénale (jusqu'à 300 000 €), voire une remise en état aux frais du propriétaire. L'administration dispose de 10 ans pour constater l'infraction. Régulariser après coup est toujours plus coûteux et aléatoire qu'obtenir l'autorisation avant de commencer.",
  },
  {
    q: "Vous intervenez dans ma commune ?",
    a: "Oui. Toutes nos démarches sont traitées 100% à distance. Notre expertise est ancrée en Vendée — Beaurepaire (85), Les Herbiers, Montaigu — mais nous intervenons dans toutes les communes françaises avec la même rigueur et les mêmes délais.",
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

export default function DemarchesAdministrativesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PageBackground />
      <PageHero
        title="Démarches administratives construction — on s'occupe de tout."
        subtitle="Permis de construire, déclaration préalable, analyse PLU. 100% en ligne, toute la France. Réponse sous 24h."
        badge="Service Type A — Toute la France"
        typewriterTexts={["permis de construire", "déclaration préalable", "analyse PLU", "ouverture de chantier"]}
      />

      {/* ── INTRO ── */}
      <section className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <span className="text-xs font-bold uppercase tracking-widest text-[#29abe2] mb-3 block">Accompagnement complet</span>
              <h2 className="text-3xl font-bold text-[#3d3d3d] mb-6">Toutes vos démarches, prises en charge à distance.</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Le droit de l&apos;urbanisme est complexe et varie d&apos;une commune à l&apos;autre. Identifier la bonne procédure, décrypter le PLU local, constituer un dossier complet et conforme — c&apos;est un travail de spécialiste.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Projego intervient sur <strong>l&apos;ensemble de vos démarches administratives liées à la construction</strong> : déclaration préalable, permis de construire, analyse PLU préalable. Notre service est <strong>100% en ligne</strong> et couvre toute la France.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Vous nous décrivez votre projet. On gère le reste — de l&apos;analyse de faisabilité à la livraison du dossier complet.
              </p>
              <StartProjectButton className="inline-flex items-center gap-2 bg-[#29abe2] text-white font-semibold px-7 py-3.5 rounded-full hover:bg-[#1a9fd6] transition-all">
                Étude gratuite de mon projet
              </StartProjectButton>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="grid grid-cols-2 gap-4">
                {pourquoi.map((item) => (
                  <div key={item.title} className="bg-white shadow-sm border border-gray-100 rounded-2xl p-6">
                    <div className="text-3xl mb-3">{item.icon}</div>
                    <p className="font-bold text-[#3d3d3d] text-sm mb-1">{item.title}</p>
                    <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── NOS SERVICES ── */}
      <section className="relative py-20 bg-transparent">
        <SectionCloud />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#3d3d3d] mb-4">Ce que Projego prend en charge</h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <AnimatedSection key={s.code} delay={i * 0.1}>
                <Link href={s.href} className="group block h-full">
                  <div className="h-full bg-white border border-gray-100 hover:border-[#29abe2]/40 hover:shadow-md rounded-2xl p-6 transition-all">
                    <div className="text-3xl mb-3">{s.icon}</div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold bg-[#29abe2] text-white px-2 py-0.5 rounded-full">{s.code}</span>
                      <span className="text-xs text-[#29abe2] font-semibold">{s.delay}</span>
                    </div>
                    <p className="font-bold text-[#3d3d3d] text-sm mb-2 group-hover:text-[#29abe2] transition-colors">{s.title}</p>
                    <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── TYPES DE DÉMARCHES ── */}
      <section className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#3d3d3d] mb-4">Les démarches en détail</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Chaque projet est différent. Voici les principales autorisations que nous traitons et leurs caractéristiques.
            </p>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-6">
            {typesDemarches.map((d, i) => (
              <AnimatedSection key={d.title} delay={i * 0.07}>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#29abe2]/30 hover:shadow-md transition-all h-full">
                  <h3 className="font-bold text-[#3d3d3d] mb-3">{d.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{d.desc}</p>
                  <div className="flex items-center gap-4 pt-3 border-t border-gray-50">
                    <div>
                      <p className="text-xs text-gray-400">Instruction mairie</p>
                      <p className="text-sm font-semibold text-[#3d3d3d]">{d.delai}</p>
                    </div>
                    <div className="w-px h-8 bg-gray-100" />
                    <div>
                      <p className="text-xs text-gray-400">Notre délai</p>
                      <p className="text-sm font-semibold text-[#29abe2]">{d.notreDelai}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESSUS ── */}
      <section className="relative py-20 bg-transparent">
        <SectionCloud />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#3d3d3d] mb-4">Comment ça se passe ?</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Un process simple, entièrement à distance. Vous nous décrivez votre projet, on s&apos;occupe du reste.</p>
          </AnimatedSection>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <AnimatedSection key={s.n} delay={i * 0.1}>
                <div className="text-center">
                  <div className="w-14 h-14 bg-[#29abe2] text-white font-bold text-xl rounded-full flex items-center justify-center mx-auto mb-4">{s.n}</div>
                  <h3 className="font-bold text-[#3d3d3d] mb-2">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-transparent">
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
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-2">Aller plus loin</h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/autoconstruction-maison" className="group block border-2 border-gray-100 hover:border-[#29abe2] rounded-2xl p-6 transition-all hover:shadow-md">
              <h3 className="font-bold text-[#3d3d3d] group-hover:text-[#29abe2] transition-colors mb-1">Autoconstruction</h3>
              <p className="text-gray-500 text-sm">Vous construisez vous-même ? On gère le permis de construire et toutes les formalités.</p>
              <span className="text-[#29abe2] text-sm font-semibold mt-3 inline-block">En savoir plus →</span>
            </Link>
            <Link href="/auto-renovation" className="group block border-2 border-gray-100 hover:border-[#29abe2] rounded-2xl p-6 transition-all hover:shadow-md">
              <h3 className="font-bold text-[#3d3d3d] group-hover:text-[#29abe2] transition-colors mb-1">Auto-Rénovation</h3>
              <p className="text-gray-500 text-sm">Vous rénovez vous-même ? On identifie la bonne autorisation et on constitue le dossier.</p>
              <span className="text-[#29abe2] text-sm font-semibold mt-3 inline-block">En savoir plus →</span>
            </Link>
          </div>
        </div>
      </section>

      <ServiceCTA
        title="Votre projet mérite des démarches sans friction"
        description="Décrivez-nous votre projet. On analyse la faisabilité gratuitement et on vous dit exactement quelles démarches sont nécessaires — puis on les prend en charge."
        photo="/69a21054581df_Capturedecran2026-02-27a22.42.46.png"
      />
    </>
  );
}
