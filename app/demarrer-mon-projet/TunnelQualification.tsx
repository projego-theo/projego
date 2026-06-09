'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Script from 'next/script';

// ── Types ──────────────────────────────────────────────────────────────────────

type GeoVille = {
  nom: string;
  code: string;
  codesPostaux: string[];
  codeDepartement: string;
};

type AdresseFeature = {
  properties: {
    label: string;
    id: string;
    citycode: string;
    postcode: string;
    city: string;
  };
};

type Autorisation = 'dp' | 'pc' | 'unknown';

type FormData = {
  ville: GeoVille | null;
  adresse: { label: string; id: string } | null;
  autorisation: Autorisation | null;
  travaux: string | null;
};

type TravauxItem = { label: string; icon: string; type: 'dp' | 'pc' };

// ── Constants ──────────────────────────────────────────────────────────────────

const STEP_LABELS = ['Commune', 'Adresse', 'Autorisation', 'Travaux', 'Récapitulatif', 'Rendez-vous'];

const DP_TRAVAUX: TravauxItem[] = [
  { label: 'Piscine (10-100m²)', icon: '🏊', type: 'dp' },
  { label: 'Piscine + abri ≤ 1,80m', icon: '🏊', type: 'dp' },
  { label: 'Pergola / Carport', icon: '🏗️', type: 'dp' },
  { label: 'Clôture / Portail', icon: '🚧', type: 'dp' },
  { label: 'Véranda', icon: '🏡', type: 'dp' },
  { label: 'Abri de jardin / Local technique', icon: '🏚️', type: 'dp' },
  { label: 'Changement de façade', icon: '🏠', type: 'dp' },
  { label: 'Modification toiture', icon: '🏠', type: 'dp' },
  { label: 'Terrasse surélevée', icon: '🪵', type: 'dp' },
  { label: 'Extension < 40m²', icon: '📐', type: 'dp' },
  { label: 'Travaux complémentaires', icon: '🔧', type: 'dp' },
  { label: 'Autre', icon: '✏️', type: 'dp' },
];

const PC_TRAVAUX: TravauxItem[] = [
  { label: 'Maison neuve / Autoconstruction', icon: '🏗️', type: 'pc' },
  { label: 'Extension > 40m²', icon: '📏', type: 'pc' },
  { label: 'Surélévation', icon: '⬆️', type: 'pc' },
  { label: 'Pool house', icon: '🛖', type: 'pc' },
  { label: 'Abri piscine > 1,80m', icon: '🏊', type: 'pc' },
  { label: 'Garage accolé > 40m²', icon: '🚗', type: 'pc' },
  { label: 'Véranda > 40m²', icon: '🏡', type: 'pc' },
  { label: 'Modification PC en cours', icon: '📋', type: 'pc' },
  { label: 'Régularisation dossier refusé', icon: '📄', type: 'pc' },
  { label: 'Autre', icon: '✏️', type: 'pc' },
];

// Éléments supplémentaires affichés uniquement dans le parcours "Je ne sais pas"
const UNKNOWN_EXTRA: TravauxItem[] = [
  { label: 'Panneaux solaires', icon: '☀️', type: 'dp' },
  { label: 'Changement de destination', icon: '🔄', type: 'pc' },
  { label: 'Aménagement combles', icon: '🏠', type: 'dp' },
  { label: 'Création ouverture (fenêtre, porte)', icon: '🚪', type: 'dp' },
  { label: 'Ravalement de façade', icon: '🎨', type: 'dp' },
];

// ── Animations ─────────────────────────────────────────────────────────────────

const slideVariants = {
  enter: (dir: number) => ({ x: dir * 48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: -dir * 48, opacity: 0 }),
};
const slideTransition = { duration: 0.22, ease: 'easeInOut' as const };

// ── Sub-components ─────────────────────────────────────────────────────────────

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-sm text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1"
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
      </svg>
      Retour
    </button>
  );
}

function NextButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-2 bg-[#29abe2] hover:bg-[#1a9fd6] disabled:bg-gray-200 disabled:cursor-not-allowed text-white font-semibold px-8 py-3.5 rounded-full transition-all"
    >
      Suivant
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </button>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className ?? 'w-4 h-4'} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function TunnelQualification() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);

  const [formData, setFormData] = useState<FormData>({
    ville: null,
    adresse: null,
    autorisation: null,
    travaux: null,
  });

  // Step 1 — Ville
  const [villeQuery, setVilleQuery] = useState('');
  const [villeSuggestions, setVilleSuggestions] = useState<GeoVille[]>([]);
  const [villeOpen, setVilleOpen] = useState(false);
  const villeRef = useRef<HTMLDivElement>(null);

  // Step 2 — Adresse
  const [adresseQuery, setAdresseQuery] = useState('');
  const [adresseSuggestions, setAdresseSuggestions] = useState<AdresseFeature[]>([]);
  const [adresseOpen, setAdresseOpen] = useState(false);
  const adresseRef = useRef<HTMLDivElement>(null);
  const webhookSentRef = useRef(false);

  // ── API: ville autocomplete ────────────────────────────────────────────────

  useEffect(() => {
    if (villeQuery.length < 2) {
      setVilleSuggestions([]);
      setVilleOpen(false);
      return;
    }
    const id = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://geo.api.gouv.fr/communes?nom=${encodeURIComponent(villeQuery)}&fields=nom,code,codesPostaux,codeDepartement&limit=6&boost=population`
        );
        const data: GeoVille[] = await res.json();
        setVilleSuggestions(data);
        setVilleOpen(true);
      } catch {
        setVilleSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(id);
  }, [villeQuery]);

  // ── API: adresse autocomplete ──────────────────────────────────────────────

  useEffect(() => {
    if (adresseQuery.length < 3 || !formData.ville) {
      setAdresseSuggestions([]);
      setAdresseOpen(false);
      return;
    }
    const id = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(adresseQuery)}&citycode=${formData.ville!.code}&limit=5`
        );
        const data = await res.json();
        setAdresseSuggestions(data.features ?? []);
        setAdresseOpen(true);
      } catch {
        setAdresseSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(id);
  }, [adresseQuery, formData.ville]);

  // ── Click outside ──────────────────────────────────────────────────────────

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (villeRef.current && !villeRef.current.contains(e.target as Node)) setVilleOpen(false);
      if (adresseRef.current && !adresseRef.current.contains(e.target as Node)) setAdresseOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // ── Meta Pixel: Lead event ─────────────────────────────────────────────────

  useEffect(() => {
    if (step === 5) {
      const w = window as unknown as { fbq?: (...args: unknown[]) => void };
      if (typeof w.fbq === 'function') w.fbq('track', 'Lead');
    }
  }, [step]);

  // ── Webhook GHL : envoi des données à l'arrivée sur l'étape 6 ─────────────

  useEffect(() => {
    if (step !== 6 || webhookSentRef.current) return;
    webhookSentRef.current = true;
    fetch(
      'https://services.leadconnectorhq.com/hooks/Sqd3WdWGgoefvce96mhp/webhook-trigger/18940dc5-9d6b-4f6f-88d2-a87582431b46',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ville: formData.ville?.nom ?? '',
          adresse: formData.adresse?.label ?? '',
          cadastre: formData.adresse?.id ?? '',
          type_autorisation:
            formData.autorisation === 'dp' ? 'DP'
            : formData.autorisation === 'pc' ? 'PC'
            : 'Je ne sais pas',
          type_travaux: formData.travaux ?? '',
          source: 'tunnel-qualification',
        }),
      }
    ).catch(err => console.error('Webhook GHL error:', err));
    // formData est stable à ce stade (toutes les étapes sont complétées)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  // ── Navigation ─────────────────────────────────────────────────────────────

  function goNext() {
    setDirection(1);
    setStep(s => Math.min(s + 1, 6));
  }

  function goBack() {
    setDirection(-1);
    setStep(s => Math.max(s - 1, 1));
  }

  // ── Handlers ───────────────────────────────────────────────────────────────

  function selectVille(v: GeoVille) {
    setFormData(prev => ({ ...prev, ville: v, adresse: null }));
    setVilleQuery(v.nom);
    setVilleOpen(false);
    setAdresseQuery('');
  }

  function selectAdresse(f: AdresseFeature) {
    setFormData(prev => ({
      ...prev,
      adresse: { label: f.properties.label, id: f.properties.id },
    }));
    setAdresseQuery(f.properties.label);
    setAdresseOpen(false);
  }

  function selectAutorisation(auth: Autorisation) {
    setFormData(prev => ({ ...prev, autorisation: auth, travaux: null }));
    goNext();
  }

  function selectTravaux(item: TravauxItem) {
    setFormData(prev => ({
      ...prev,
      travaux: item.label,
      autorisation: prev.autorisation === 'unknown' ? item.type : prev.autorisation,
    }));
    goNext();
  }

  // ── Derived values ─────────────────────────────────────────────────────────

  const autorisationLabel =
    formData.autorisation === 'dp' ? 'Déclaration Préalable (DP)'
    : formData.autorisation === 'pc' ? 'Permis de Construire (PC)'
    : null;

  const delai = formData.autorisation === 'dp' ? '24-48h' : '48-72h';

  const travauxList: TravauxItem[] =
    formData.autorisation === 'dp' ? DP_TRAVAUX
    : formData.autorisation === 'pc' ? PC_TRAVAUX
    : [...DP_TRAVAUX, ...PC_TRAVAUX, ...UNKNOWN_EXTRA];

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen pt-28 pb-20 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#29abe2]">Qualification projet</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#3d3d3d] mt-1">Démarrez votre projet</h1>
        </div>

        {/* Progress bar */}
        <div className="mb-10">
          <div className="flex items-start">
            {STEP_LABELS.map((label, i) => {
              const num = i + 1;
              const done = num < step;
              const active = num === step;
              return (
                <div key={label} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        done ? 'bg-[#29abe2] text-white'
                        : active ? 'bg-[#29abe2] text-white ring-4 ring-[#29abe2]/20'
                        : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {done ? <CheckIcon className="w-4 h-4" /> : num}
                    </div>
                    <span className={`mt-1 text-[10px] font-medium hidden sm:block transition-colors ${
                      active ? 'text-[#29abe2]' : done ? 'text-gray-400' : 'text-gray-300'
                    }`}>
                      {label}
                    </span>
                  </div>
                  {i < STEP_LABELS.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-1 mb-4 transition-colors ${done ? 'bg-[#29abe2]' : 'bg-gray-200'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={slideTransition}
          >

            {/* ── Étape 1 : Ville ─────────────────────────────────────────── */}
            {step === 1 && (
              <div>
                <h2 className="text-xl font-bold text-[#3d3d3d] mb-1">Dans quelle commune se situe votre projet ?</h2>
                <p className="text-gray-500 text-sm mb-6">Saisissez le nom de votre commune.</p>

                <div className="relative" ref={villeRef}>
                  <div className="relative">
                    <input
                      type="text"
                      value={villeQuery}
                      onChange={e => {
                        setVilleQuery(e.target.value);
                        if (formData.ville && e.target.value !== formData.ville.nom) {
                          setFormData(prev => ({ ...prev, ville: null }));
                        }
                      }}
                      placeholder="Ex : Les Herbiers, La Roche-sur-Yon…"
                      className="w-full border-2 border-gray-200 focus:border-[#29abe2] rounded-xl px-4 py-3.5 text-sm outline-none transition-colors"
                      autoFocus
                    />
                    {formData.ville && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#29abe2]">
                        <CheckIcon className="w-5 h-5" />
                      </span>
                    )}
                  </div>

                  {villeOpen && villeSuggestions.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                      {villeSuggestions.map(v => (
                        <button
                          key={v.code}
                          type="button"
                          onClick={() => selectVille(v)}
                          className="w-full text-left px-4 py-3 text-sm hover:bg-[#29abe2]/5 transition-colors flex items-center justify-between border-b border-gray-50 last:border-0"
                        >
                          <span className="font-medium text-[#3d3d3d]">{v.nom}</span>
                          <span className="text-xs text-gray-400 ml-3 flex-shrink-0">
                            {v.codesPostaux?.[0]} · Dép. {v.codeDepartement}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {formData.ville && (
                  <p className="mt-3 text-sm text-[#29abe2] flex items-center gap-2">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <strong>{formData.ville.nom}</strong>
                    <span className="text-gray-400">({formData.ville.codesPostaux?.[0]}) — INSEE&nbsp;: {formData.ville.code}</span>
                  </p>
                )}

                <div className="flex justify-end mt-8">
                  <NextButton onClick={goNext} disabled={!formData.ville} />
                </div>
              </div>
            )}

            {/* ── Étape 2 : Adresse ───────────────────────────────────────── */}
            {step === 2 && (
              <div>
                <h2 className="text-xl font-bold text-[#3d3d3d] mb-1">Quelle est l&apos;adresse du terrain ou du bien ?</h2>
                <p className="text-gray-500 text-sm mb-6">
                  À <strong className="text-[#3d3d3d]">{formData.ville?.nom}</strong> — facultatif, mais utile pour l&apos;analyse PLU.
                </p>

                <div className="relative" ref={adresseRef}>
                  <input
                    type="text"
                    value={adresseQuery}
                    onChange={e => {
                      setAdresseQuery(e.target.value);
                      if (formData.adresse && e.target.value !== formData.adresse.label) {
                        setFormData(prev => ({ ...prev, adresse: null }));
                      }
                    }}
                    placeholder="Numéro et nom de la rue…"
                    className="w-full border-2 border-gray-200 focus:border-[#29abe2] rounded-xl px-4 py-3.5 text-sm outline-none transition-colors"
                    autoFocus
                  />

                  {adresseOpen && adresseSuggestions.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                      {adresseSuggestions.map(f => (
                        <button
                          key={f.properties.id}
                          type="button"
                          onClick={() => selectAdresse(f)}
                          className="w-full text-left px-4 py-3 text-sm hover:bg-[#29abe2]/5 transition-colors border-b border-gray-50 last:border-0"
                        >
                          <span className="font-medium text-[#3d3d3d]">{f.properties.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {formData.adresse && (
                  <div className="mt-3">
                    <p className="text-sm text-[#29abe2] flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 flex-shrink-0" />
                      {formData.adresse.label}
                    </p>
                    <p className="text-xs text-gray-400 mt-1 pl-6">
                      Réf. BAN : <span className="font-mono">{formData.adresse.id}</span>
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between mt-8">
                  <BackButton onClick={goBack} />
                  <div className="flex flex-col items-end gap-2">
                    <NextButton onClick={goNext} />
                    {!formData.adresse && (
                      <button
                        type="button"
                        onClick={goNext}
                        className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        Passer cette étape →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ── Étape 3 : Type d'autorisation ───────────────────────────── */}
            {step === 3 && (
              <div>
                <h2 className="text-xl font-bold text-[#3d3d3d] mb-1">De quel type d&apos;autorisation s&apos;agit-il ?</h2>
                <p className="text-gray-500 text-sm mb-6">Cliquez sur votre situation — on détermine la bonne procédure si vous ne savez pas.</p>

                <div className="grid gap-3">
                  {[
                    {
                      id: 'dp' as Autorisation,
                      code: 'DP',
                      title: 'Déclaration Préalable',
                      desc: 'Piscine, pergola, clôture, extension < 40 m², façade, vélux…',
                      badge: '24-48h',
                    },
                    {
                      id: 'pc' as Autorisation,
                      code: 'PC',
                      title: 'Permis de Construire',
                      desc: 'Maison neuve, extension > 40 m², surélévation, garage…',
                      badge: '48-72h',
                    },
                    {
                      id: 'unknown' as Autorisation,
                      code: '?',
                      title: "Je ne sais pas — aidez-moi à choisir",
                      desc: 'Nous déterminons le bon type selon la nature de vos travaux.',
                      badge: null,
                    },
                  ].map(opt => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => selectAutorisation(opt.id)}
                      className="w-full text-left border-2 border-gray-100 hover:border-[#29abe2] hover:shadow-md rounded-2xl p-5 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <span className="w-10 h-10 bg-[#29abe2]/10 group-hover:bg-[#29abe2] text-[#29abe2] group-hover:text-white font-bold text-sm rounded-full flex items-center justify-center transition-colors flex-shrink-0">
                          {opt.code}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-semibold text-[#3d3d3d] group-hover:text-[#29abe2] transition-colors">{opt.title}</p>
                            {opt.badge && (
                              <span className="text-xs bg-[#29abe2]/10 text-[#29abe2] px-2.5 py-0.5 rounded-full font-medium flex-shrink-0">{opt.badge}</span>
                            )}
                          </div>
                          <p className="text-gray-400 text-sm mt-0.5">{opt.desc}</p>
                        </div>
                        <svg className="w-5 h-5 text-gray-300 group-hover:text-[#29abe2] transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-6">
                  <BackButton onClick={goBack} />
                </div>
              </div>
            )}

            {/* ── Étape 4 : Type de travaux ────────────────────────────────── */}
            {step === 4 && (
              <div>
                <h2 className="text-xl font-bold text-[#3d3d3d] mb-1">Quel type de travaux ?</h2>
                <p className="text-gray-500 text-sm mb-5">Sélectionnez ce qui correspond à votre projet.</p>

                {formData.autorisation !== 'unknown' && (
                  <div className="mb-4 inline-flex items-center gap-2 bg-[#29abe2]/10 text-[#29abe2] text-xs font-bold px-3 py-1.5 rounded-full">
                    {formData.autorisation === 'dp' ? 'DP — Déclaration Préalable' : 'PC — Permis de Construire'}
                  </div>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {travauxList.map(item => (
                    <button
                      key={`${item.type}-${item.label}`}
                      type="button"
                      onClick={() => selectTravaux(item)}
                      className="flex flex-col items-center text-center border-2 border-gray-100 hover:border-[#29abe2] hover:shadow-md rounded-2xl p-4 transition-all group"
                    >
                      <span className="text-3xl mb-2">{item.icon}</span>
                      <span className="text-sm font-medium text-[#3d3d3d] group-hover:text-[#29abe2] transition-colors leading-snug">{item.label}</span>
                      {formData.autorisation === 'unknown' && (
                        <span className="mt-1.5 text-[10px] uppercase font-bold tracking-widest text-gray-300">{item.type}</span>
                      )}
                    </button>
                  ))}
                </div>

                <div className="mt-6">
                  <BackButton onClick={goBack} />
                </div>
              </div>
            )}

            {/* ── Étape 5 : Récapitulatif ──────────────────────────────────── */}
            {step === 5 && (
              <div>
                <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full mb-4">
                  <CheckIcon className="w-3.5 h-3.5" />
                  Récapitulatif de votre projet
                </div>

                <h2 className="text-xl font-bold text-[#3d3d3d] mb-5 leading-snug">
                  Votre projet{' '}
                  <span className="text-[#29abe2]">{formData.travaux?.toLowerCase()}</span>{' '}
                  à{' '}
                  <span className="text-[#29abe2]">{formData.ville?.nom}</span>{' '}
                  nécessite une{' '}
                  <span className="text-[#29abe2]">{autorisationLabel}</span>.
                </h2>

                {/* Detail card */}
                <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-5 space-y-2.5">
                  {[
                    { label: 'Commune', value: `${formData.ville?.nom} (${formData.ville?.codesPostaux?.[0]})` },
                    formData.adresse ? { label: 'Adresse', value: formData.adresse.label } : null,
                    { label: 'Autorisation', value: autorisationLabel ?? '' },
                    { label: 'Travaux', value: formData.travaux ?? '' },
                  ].filter(Boolean).map(item => (
                    <div key={item!.label} className="flex items-center gap-3 text-sm">
                      <span className="w-5 h-5 bg-[#29abe2]/10 text-[#29abe2] rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckIcon className="w-3 h-3" />
                      </span>
                      <span className="text-gray-600">
                        <strong className="text-[#3d3d3d]">{item!.label} :</strong>{' '}{item!.value}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                  Projego peut gérer l&apos;intégralité de vos démarches administratives en{' '}
                  <strong className="text-[#3d3d3d]">{delai}</strong>.
                  Pour cela, nous vous invitons à réserver un créneau directement avec l&apos;un de nos experts qui se chargera de votre dossier.
                </p>

                <div className="bg-[#29abe2]/5 border border-[#29abe2]/20 rounded-2xl p-5 mb-6">
                  <p className="text-[#3d3d3d] font-semibold text-sm mb-1">Souhaitez-vous caler un rendez-vous maintenant ?</p>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    Le rendez-vous ne durera que <strong>15 minutes</strong>, il est simplement à titre informatif et ne vous engage à rien.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={goNext}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#29abe2] hover:bg-[#1a9fd6] text-white font-semibold px-8 py-4 rounded-full transition-all shadow-lg hover:-translate-y-0.5 mb-3"
                >
                  Oui, je réserve mon créneau
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>

                <p className="text-center">
                  <Link
                    href="/contact"
                    className="text-sm text-gray-400 hover:text-gray-600 transition-colors underline underline-offset-2"
                  >
                    Non merci, je préfère vous contacter autrement
                  </Link>
                </p>

                <div className="mt-6">
                  <BackButton onClick={goBack} />
                </div>
              </div>
            )}

            {/* ── Étape 6 : Calendrier GHL ─────────────────────────────────── */}
            {step === 6 && (
              <div>
                <h2 className="text-xl font-bold text-[#3d3d3d] mb-1">Réservez votre créneau</h2>
                <p className="text-gray-500 text-sm mb-6">
                  Un entretien de <strong>15 minutes</strong> avec un expert Projego — gratuit, sans engagement.
                </p>

                <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                  <iframe
                    src="https://api.leadconnectorhq.com/widget/booking/dSbks5cI78At6qDEkT5x"
                    style={{ width: '100%', border: 'none', overflow: 'hidden', minHeight: '680px', display: 'block' }}
                    scrolling="no"
                    id="dSbks5cI78At6qDEkT5x_1780999406574"
                    title="Réserver un créneau Projego"
                  />
                </div>

                <Script
                  id="ghl-booking"
                  src="https://link.msgsndr.com/js/form_embed.js"
                  strategy="afterInteractive"
                />

                <div className="mt-6">
                  <BackButton onClick={goBack} />
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
