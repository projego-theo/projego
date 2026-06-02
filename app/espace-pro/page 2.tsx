'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';
import PageHero from '@/components/PageHero';
import { PageBackground } from '@/components/PageBackground';
import { ServiceCTA } from '@/components/ServiceCTA';

const services = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    title: 'Déclarations Préalables & Permis de Construire',
    subtitle: 'Pour tous vos chantiers, partout en France',
    desc: "Vous intervenez sur des chantiers partout en France et avez besoin de dossiers administratifs fiables et rapides ? Nous réalisons l'intégralité de vos DP et PC — de la constitution du dossier au dépôt en mairie — dans vos délais.",
    items: [
      'Constitution complète du dossier (pièces, plans, notices)',
      'Dépôt en mairie (numérique ou papier)',
      "Suivi et relances jusqu'à l'obtention",
      'Toute la France, délai 24-72h',
    ],
    color: 'border-[#29abe2]/30 bg-[#29abe2]/5',
    accentColor: 'text-[#29abe2]',
    badgeBg: 'bg-[#29abe2]/10',
    examplePdf: "/permis_et_apres_v3.pdf",
    exampleLabel: 'Voir un exemple DP/PC',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    title: 'Plans & Croquis AutoCAD',
    subtitle: 'Croquis → Plans DWG & PDF en 48h',
    desc: "Transformez vos croquis ou esquisses en plans techniques exploitables, conformes aux normes de dépôt administratif. Livrés en format PDF et DWG/AutoCAD natif pour une réutilisation immédiate.",
    items: [
      'Plans de masse, de situation, coupes, façades',
      'Livrés en PDF + DWG/AutoCAD natif',
      'Nomenclatures et cotations précises',
      'Délai 24-48h selon complexité',
    ],
    color: 'border-[#3d3d3d]/20 bg-[#3d3d3d]/3',
    accentColor: 'text-[#3d3d3d]',
    badgeBg: 'bg-[#3d3d3d]/8',
    examplePdf: "/prestation_croquis_plan.pdf",
    exampleLabel: 'Voir un exemple Plans',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 12c0 6.627 5.373 12 12 12s12-5.373 12-12a11.96 11.96 0 00-.598-3.75M12 2.714A11.955 11.955 0 0120.402 6" />
      </svg>
    ),
    title: 'Service Rapide, Fiable & Confidentiel',
    subtitle: 'Votre partenaire discret au quotidien',
    desc: "Vos clients restent vos clients. Nous intervenons en marque blanche, de manière totalement confidentielle. Votre réputation est protégée, votre capacité de livraison augmentée.",
    items: [
      'Totale confidentialité, intervention en marque blanche',
      'Interlocuteur dédié, réactivité garantie',
      'Facturation simple par mission',
      'Tarifs préférentiels volume pour partenaires réguliers',
    ],
    color: 'border-emerald-200 bg-emerald-50/50',
    accentColor: 'text-emerald-700',
    badgeBg: 'bg-emerald-100',
    examplePdf: null,
    exampleLabel: null,
  },
];

const steps = [
  { num: '01', title: 'Premier contact', desc: 'Envoyez-nous votre demande avec vos éléments (croquis, adresse du projet, type de travaux). Réponse sous 2h en journée.' },
  { num: '02', title: 'Devis & validation', desc: 'Nous vous transmettons un devis détaillé. Délai, prix fixe, pas de surprise. Validation par simple retour email.' },
  { num: '03', title: 'Production', desc: "Nous prenons en charge l'intégralité du dossier. Vous êtes informé à chaque étape clé." },
  { num: '04', title: 'Livraison', desc: "Dossier déposé ou fichiers livrés dans les délais convenus. Suivi jusqu'à l'obtention si DP/PC." },
];

const profiles = [
  { icon: '🪚', title: 'Menuisiers & Charpentiers', desc: "Extensions, véranda, pergola — gérez toutes vos démarches administratives sans vous déplacer en mairie." },
  { icon: '🏊', title: 'Piscinistes', desc: "Dossiers DP pour piscines hors-sol et enterrées livrés en 24h. Partout en France." },
  { icon: '🌿', title: 'Paysagistes', desc: "Clôtures, portails, abris de jardin — nous gérons les déclarations pour vos clients rapidement." },
  { icon: '🧱', title: 'Maçons & Carreleurs', desc: "Extensions, surélévations, rénovations — dossiers complets PC et DP pour vos chantiers." },
  { icon: '🎨', title: 'Peintres & Façadiers', desc: "Ravalements de façade en zone réglementée, déclarations en 24h." },
  { icon: '🔧', title: 'Plombiers & Électriciens', desc: "Changements de destination, annexes habitables — nous constituons le dossier pour vous." },
];

function PdfLightbox({ pdf, label, onClose }: { pdf: string; label: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-5xl flex flex-col"
        style={{ height: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 z-10 w-8 h-8 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center transition-colors"
          aria-label="Fermer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <p className="text-white/60 text-xs text-center mb-2">{label}</p>
        <iframe
          src={pdf}
          className="w-full flex-1 rounded-xl border-0"
          title={label}
        />
      </motion.div>
    </motion.div>
  );
}

function ExampleButton({ pdf, label }: { pdf: string; label: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="text-xs text-[#29abe2] underline underline-offset-2 hover:text-[#1a9fd6] transition-colors"
        onClick={() => setOpen(true)}
        type="button"
      >
        Voir un exemple →
      </button>
      <AnimatePresence>
        {open && <PdfLightbox pdf={pdf} label={label} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Sous-traitance DP/PC et plans AutoCAD pour artisans',
  provider: { '@type': 'LocalBusiness', name: 'Projego', url: 'https://www.projego.fr' },
  areaServed: 'France',
  description: 'Service B2B pour artisans du BTP : sous-traitance de déclarations préalables, permis de construire et transformation de croquis en plans AutoCAD professionnels.',
  serviceType: 'Services administratifs BTP',
};

export default function EspaceProPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <PageBackground />

      <PageHero
        title="Espace Partenaires — Déléguez vos DP, PC et Plans AutoCAD"
        subtitle="Artisans du BTP — menuisiers, piscinistes, paysagistes, maçons — confiez-nous vos démarches administratives et vos plans AutoCAD."
        badge="Pour les Pros"
        typewriterTexts={["déléguez vos DP et PC", "croquis en plans pro", "format PDF et DWG", "service rapide et fiable"]}
      />

      {/* Pour qui */}
      <section className="py-16 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-3">Pour qui ?</h2>
            <p className="text-gray-500">Artisans du BTP qui veulent se concentrer sur leur métier, pas sur l&apos;administratif.</p>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles.map((p, i) => (
              <AnimatedSection key={p.title} delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-6 text-center border border-gray-100 hover:shadow-lg transition-all">
                  <div className="text-4xl mb-4">{p.icon}</div>
                  <h3 className="font-bold text-[#3d3d3d] mb-2">{p.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection className="mt-8">
            <p className="text-center text-gray-500 text-sm italic max-w-2xl mx-auto">
              Et pour tous ceux qui souhaitent déléguer leurs prestations administratives ou techniques à un partenaire de confiance.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block bg-[#29abe2]/10 text-[#29abe2] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">Nos prestations</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#3d3d3d] mb-4">Ce que nous faisons pour vous</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Des services conçus pour les artisans du BTP qui veulent gagner du temps sans sacrifier la qualité.</p>
          </AnimatedSection>

          <div className="space-y-8">
            {services.map((s, i) => (
              <AnimatedSection key={s.title} delay={i * 0.1}>
                <div className={`border-2 rounded-2xl p-8 ${s.color}`}>
                  <div className="grid lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-1">
                      <div className={`w-14 h-14 rounded-2xl ${s.badgeBg} ${s.accentColor} flex items-center justify-center mb-4`}>
                        {s.icon}
                      </div>
                      <h3 className="text-xl font-bold text-[#3d3d3d] mb-1">{s.title}</h3>
                      <p className={`text-sm font-semibold ${s.accentColor}`}>{s.subtitle}</p>
                    </div>
                    <div className="lg:col-span-2">
                      <p className="text-gray-600 leading-relaxed mb-6">{s.desc}</p>
                      <ul className="grid sm:grid-cols-2 gap-2 mb-4">
                        {s.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                            <svg className="w-4 h-4 text-[#29abe2] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                      {s.examplePdf && s.exampleLabel && (
                        <ExampleButton pdf={s.examplePdf} label={s.exampleLabel} />
                      )}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#29abe2]">Comment ça marche</span>
            <h2 className="text-3xl font-bold text-[#3d3d3d] mt-2 mb-4">Simple et sans friction</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Un processus rodé, pensé pour les artisans occupés.</p>
          </AnimatedSection>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <AnimatedSection key={step.num} delay={i * 0.1}>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#29abe2] text-white font-bold text-lg rounded-full flex items-center justify-center mx-auto mb-4">{step.num}</div>
                  <h3 className="font-bold text-[#3d3d3d] mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <span className="text-xs font-bold uppercase tracking-widest text-[#29abe2] mb-3 block">Nos engagements</span>
              <h2 className="text-3xl font-bold text-[#3d3d3d] mb-6">Pourquoi les artisans nous font confiance</h2>
              <div className="space-y-5">
                {[
                  { title: 'Confidentialité absolue', desc: "Vos clients restent les vôtres. Nous travaillons en marque blanche, sans jamais contacter vos clients directement." },
                  { title: 'Délais garantis', desc: 'DP livrées en 24-48h, PC en 48-72h, plans AutoCAD selon devis. Nous ne promettons que ce que nous tenons.' },
                  { title: 'Qualité constante', desc: "Chaque dossier est vérifié avant livraison. 8 ans d'expérience, +900 démarches réalisées." },
                  { title: 'Facturation simple', desc: "Tarif fixe par mission, facture mensuelle consolidée pour les partenaires réguliers. Pas de surprise." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-8 h-8 bg-[#29abe2]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-[#29abe2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#3d3d3d] mb-1">{item.title}</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="bg-[#3d3d3d] rounded-2xl p-8 text-white">
                <h3 className="font-bold text-xl mb-6">En chiffres</h3>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: '+900', label: 'Démarches réalisées' },
                    { value: '8 ans', label: "D'expérience (depuis 2019)" },
                    { value: '48h', label: 'Délai moyen DP' },
                    { value: '100%', label: 'Confidentiel' },
                  ].map((s) => (
                    <div key={s.label} className="text-center">
                      <p className="text-3xl font-bold text-[#29abe2]">{s.value}</p>
                      <p className="text-gray-400 text-sm mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Anciennement TConseils (2019), rebaptisé Projego pour mieux refléter notre cœur de métier : l&apos;accompagnement de vos projets de construction, de A à Z.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <ServiceCTA
        title="Travaillons ensemble"
        description="Contactez-nous pour discuter de vos besoins."
        photo="/69a20d160e9b5_Capturedecran2026-02-27a22.30.13.png"
      />
    </>
  );
}
