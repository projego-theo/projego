'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Script from 'next/script';

// ── Types ──────────────────────────────────────────────────────────────────────

type GeoVille = { nom: string; code: string; codesPostaux: string[]; codeDepartement: string };
type AdresseFeature = { properties: { label: string; id: string; citycode: string; postcode: string; city: string } };
type Autorisation = 'dp' | 'pc' | 'unknown';
type FormData = { ville: GeoVille | null; adresse: { label: string; id: string } | null; autorisation: Autorisation | null; travaux: string | null };
type TravauxItem = { label: string; iconId: string; type: 'dp' | 'pc' };

// ── SVG Icons ─────────────────────────────────────────────────────────────────

function TIcon({ id, className }: { id: string; className?: string }) {
  const p = { className: className ?? 'w-7 h-7', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (id) {
    case 'piscine': return <svg {...p}><path d="M3 13c1.5-2 3.5-2 5 0s3.5 2 5 0 3.5-2 5 0"/><path d="M3 17c1.5-2 3.5-2 5 0s3.5 2 5 0 3.5-2 5 0"/><line x1="15" y1="4" x2="15" y2="10"/><line x1="18" y1="4" x2="18" y2="10"/><line x1="15" y1="7" x2="18" y2="7"/></svg>;
    case 'piscine-abri': return <svg {...p}><path d="M3 15c1.5-2 3.5-2 5 0s3.5 2 5 0 3.5-2 5 0"/><path d="M5 11 Q12 5 19 11"/><line x1="5" y1="11" x2="5" y2="15"/><line x1="19" y1="11" x2="19" y2="15"/></svg>;
    case 'pergola': return <svg {...p}><line x1="4" y1="20" x2="4" y2="8"/><line x1="20" y1="20" x2="20" y2="8"/><line x1="12" y1="20" x2="12" y2="10"/><line x1="3" y1="8" x2="21" y2="8"/><path d="M3 6 Q12 3 21 6"/></svg>;
    case 'cloture': return <svg {...p}><line x1="3" y1="10" x2="21" y2="10"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="6" y1="7" x2="6" y2="18"/><line x1="11" y1="7" x2="11" y2="18"/><line x1="16" y1="7" x2="16" y2="18"/><path d="M6 7l-1-2h2l-1 2z"/><path d="M11 7l-1-2h2l-1 2z"/><path d="M16 7l-1-2h2l-1 2z"/></svg>;
    case 'veranda': return <svg {...p}><path d="M3 20V11l7-6h4l7 6v9H3z"/><rect x="14" y="12" width="5" height="8"/><line x1="16.5" y1="12" x2="16.5" y2="20"/></svg>;
    case 'abri': return <svg {...p}><path d="M4 20V12l8-8 8 8v8H4z"/><path d="M9 20v-5h6v5"/></svg>;
    case 'facade': return <svg {...p}><path d="M3 21V9l9-6 9 6v12H3z"/><rect x="9" y="12" width="6" height="5"/><path d="M17 9l2.5-1.5M19.5 7.5l.5 3"/></svg>;
    case 'toiture': return <svg {...p}><path d="M2 17L12 5l10 12H2z"/><path d="M7 17v-4l5-4 5 4v4"/></svg>;
    case 'terrasse': return <svg {...p}><rect x="3" y="11" width="18" height="3" rx="1"/><line x1="6" y1="14" x2="6" y2="20"/><line x1="18" y1="14" x2="18" y2="20"/><line x1="4" y1="18" x2="8" y2="18"/><line x1="16" y1="18" x2="20" y2="18"/></svg>;
    case 'extension-dp': return <svg {...p}><path d="M3 21V10l6-7h4v18H3z"/><path d="M13 13h5a1 1 0 011 1v7h-6"/><path d="M16 10l4 3-4 3"/></svg>;
    case 'outils': return <svg {...p}><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>;
    case 'autre': return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
    case 'maison-neuve': return <svg {...p}><path d="M3 21V9l9-6 9 6v12H3z"/><path d="M9 21v-6h6v6"/><line x1="17" y1="3" x2="17" y2="7"/><line x1="15" y1="5" x2="19" y2="5"/></svg>;
    case 'extension-pc': return <svg {...p}><path d="M3 21V10l7-8h3v19H3z"/><path d="M13 8h5a2 2 0 012 2v11H13"/><path d="M16 5l4 3-4 3"/></svg>;
    case 'surelevation': return <svg {...p}><path d="M3 21V13l9-8 9 8v8H3z"/><line x1="3" y1="13" x2="21" y2="13"/><line x1="12" y1="5" x2="12" y2="1"/><path d="M10 3l2-2 2 2"/></svg>;
    case 'pool-house': return <svg {...p}><path d="M3 21V10l7-7h4l7 7v11H3z"/><path d="M9 21v-5h6v5"/><path d="M4 17c1-1.5 2.5-1.5 3.5 0S10 18.5 11 17"/></svg>;
    case 'abri-piscine': return <svg {...p}><path d="M4 18V11a8 8 0 0116 0v7"/><line x1="4" y1="18" x2="20" y2="18"/><path d="M3 21c1.5-2 3.5-2 5 0s3.5 2 5 0 3.5-2 5 0"/></svg>;
    case 'garage': return <svg {...p}><rect x="3" y="6" width="18" height="15" rx="1"/><line x1="3" y1="11" x2="21" y2="11"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="10" y1="11" x2="10" y2="21"/><line x1="14" y1="11" x2="14" y2="21"/><line x1="9" y1="6" x2="9" y2="3"/><line x1="15" y1="6" x2="15" y2="3"/></svg>;
    case 'modif-pc': return <svg {...p}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M10 14l2 2 4-4"/></svg>;
    case 'regul': return <svg {...p}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 13l2 2 4-4"/><path d="M9 18h6"/></svg>;
    case 'solaires': return <svg {...p}><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="6.34" y2="17.66"/><line x1="17.66" y1="6.34" x2="19.07" y2="4.93"/></svg>;
    case 'destination': return <svg {...p}><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>;
    case 'combles': return <svg {...p}><path d="M2 17L12 4l10 13H2z"/><path d="M8 17v-5l4-3 4 3v5"/><line x1="12" y1="9" x2="12" y2="17"/></svg>;
    case 'ouverture': return <svg {...p}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h7M3 15h7M14 3v18"/></svg>;
    case 'ravalement': return <svg {...p}><rect x="3" y="4" width="13" height="16" rx="1"/><path d="M16 9h2a2 2 0 012 2v3a2 2 0 01-2 2h-2"/><line x1="18" y1="16" x2="18" y2="20"/><line x1="7" y1="8" x2="12" y2="8"/><line x1="7" y1="12" x2="12" y2="12"/><line x1="7" y1="16" x2="12" y2="16"/></svg>;
    default: return <svg {...p}><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;
  }
}

// ── Constants ──────────────────────────────────────────────────────────────────

const STEP_LABELS = ['Commune', 'Adresse', 'Autorisation', 'Travaux', 'Récapitulatif', 'Rendez-vous'];

const DP_TRAVAUX: TravauxItem[] = [
  { label: 'Piscine (10-100m²)', iconId: 'piscine', type: 'dp' },
  { label: 'Piscine + abri ≤ 1,80m', iconId: 'piscine-abri', type: 'dp' },
  { label: 'Pergola / Carport', iconId: 'pergola', type: 'dp' },
  { label: 'Clôture / Portail', iconId: 'cloture', type: 'dp' },
  { label: 'Véranda', iconId: 'veranda', type: 'dp' },
  { label: 'Abri de jardin / Local technique', iconId: 'abri', type: 'dp' },
  { label: 'Changement de façade', iconId: 'facade', type: 'dp' },
  { label: 'Modification toiture', iconId: 'toiture', type: 'dp' },
  { label: 'Terrasse surélevée', iconId: 'terrasse', type: 'dp' },
  { label: 'Extension < 40m²', iconId: 'extension-dp', type: 'dp' },
  { label: 'Travaux complémentaires', iconId: 'outils', type: 'dp' },
  { label: 'Autre', iconId: 'autre', type: 'dp' },
];

const PC_TRAVAUX: TravauxItem[] = [
  { label: 'Maison neuve / Autoconstruction', iconId: 'maison-neuve', type: 'pc' },
  { label: 'Extension > 40m²', iconId: 'extension-pc', type: 'pc' },
  { label: 'Surélévation', iconId: 'surelevation', type: 'pc' },
  { label: 'Pool house', iconId: 'pool-house', type: 'pc' },
  { label: 'Abri piscine > 1,80m', iconId: 'abri-piscine', type: 'pc' },
  { label: 'Garage accolé > 40m²', iconId: 'garage', type: 'pc' },
  { label: 'Véranda > 40m²', iconId: 'veranda', type: 'pc' },
  { label: 'Modification PC en cours', iconId: 'modif-pc', type: 'pc' },
  { label: 'Régularisation dossier refusé', iconId: 'regul', type: 'pc' },
  { label: 'Autre', iconId: 'autre', type: 'pc' },
];

const UNKNOWN_EXTRA: TravauxItem[] = [
  { label: 'Panneaux solaires', iconId: 'solaires', type: 'dp' },
  { label: 'Changement de destination', iconId: 'destination', type: 'pc' },
  { label: 'Aménagement combles', iconId: 'combles', type: 'dp' },
  { label: 'Création ouverture (fenêtre, porte)', iconId: 'ouverture', type: 'dp' },
  { label: 'Ravalement de façade', iconId: 'ravalement', type: 'dp' },
];

// ── Animations ─────────────────────────────────────────────────────────────────

const slideVariants = {
  enter: (dir: number) => ({ x: dir * 40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: -dir * 40, opacity: 0 }),
};
const slideTransition = { duration: 0.2, ease: 'easeInOut' as const };

// ── Sub-components ─────────────────────────────────────────────────────────────

function CheckIcon({ className }: { className?: string }) {
  return <svg className={className ?? 'w-4 h-4'} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>;
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="text-sm text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1">
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18"/></svg>
      Retour
    </button>
  );
}

function NextButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} className="inline-flex items-center gap-2 bg-[#29abe2] hover:bg-[#1a9fd6] disabled:bg-gray-200 disabled:cursor-not-allowed text-white font-semibold px-7 py-3 rounded-full transition-all text-sm">
      Suivant
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
    </button>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function TunnelQualification({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);

  const [formData, setFormData] = useState<FormData>({ ville: null, adresse: null, autorisation: null, travaux: null });

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

  // Step 4 — "Autre" free text
  const [autreMode, setAutreMode] = useState<{ type: 'dp' | 'pc' } | null>(null);
  const [autreTexte, setAutreTexte] = useState('');

  const webhookSentRef = useRef(false);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Close on Escape
  useEffect(() => {
    function handler(e: KeyboardEvent) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  // ── API: ville autocomplete ────────────────────────────────────────────────

  useEffect(() => {
    if (villeQuery.length < 2) { setVilleSuggestions([]); setVilleOpen(false); return; }
    const id = setTimeout(async () => {
      try {
        const res = await fetch(`https://geo.api.gouv.fr/communes?nom=${encodeURIComponent(villeQuery)}&fields=nom,code,codesPostaux,codeDepartement&limit=6&boost=population`);
        setVilleSuggestions(await res.json());
        setVilleOpen(true);
      } catch { setVilleSuggestions([]); }
    }, 300);
    return () => clearTimeout(id);
  }, [villeQuery]);

  // ── API: adresse autocomplete ──────────────────────────────────────────────

  useEffect(() => {
    if (adresseQuery.length < 3 || !formData.ville) { setAdresseSuggestions([]); setAdresseOpen(false); return; }
    const id = setTimeout(async () => {
      try {
        const res = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(adresseQuery)}&citycode=${formData.ville!.code}&limit=5`);
        const data = await res.json();
        setAdresseSuggestions(data.features ?? []);
        setAdresseOpen(true);
      } catch { setAdresseSuggestions([]); }
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

  // ── Pixel Lead ────────────────────────────────────────────────────────────

  useEffect(() => {
    if (step === 5) {
      const w = window as unknown as { fbq?: (...a: unknown[]) => void };
      if (typeof w.fbq === 'function') w.fbq('track', 'Lead');
    }
  }, [step]);

  // ── Webhook GHL ───────────────────────────────────────────────────────────

  useEffect(() => {
    if (step !== 6 || webhookSentRef.current) return;
    webhookSentRef.current = true;
    fetch('https://services.leadconnectorhq.com/hooks/Sqd3WdWGgoefvce96mhp/webhook-trigger/18940dc5-9d6b-4f6f-88d2-a87582431b46', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ville: formData.ville?.nom ?? '',
        adresse: formData.adresse?.label ?? '',
        cadastre: formData.adresse?.id ?? '',
        type_autorisation: formData.autorisation === 'dp' ? 'DP' : formData.autorisation === 'pc' ? 'PC' : 'Je ne sais pas',
        type_travaux: formData.travaux ?? '',
        source: 'tunnel-qualification',
      }),
    }).catch(err => console.error('Webhook GHL error:', err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  // ── Navigation ─────────────────────────────────────────────────────────────

  function goNext() { setDirection(1); setStep(s => Math.min(s + 1, 6)); }
  function goBack() {
    setAutreMode(null); setAutreTexte('');
    setDirection(-1); setStep(s => Math.max(s - 1, 1));
  }

  // ── Handlers ───────────────────────────────────────────────────────────────

  function selectVille(v: GeoVille) {
    setFormData(prev => ({ ...prev, ville: v, adresse: null }));
    setVilleQuery(v.nom); setVilleOpen(false); setAdresseQuery('');
  }

  function selectAdresse(f: AdresseFeature) {
    setFormData(prev => ({ ...prev, adresse: { label: f.properties.label, id: f.properties.id } }));
    setAdresseQuery(f.properties.label); setAdresseOpen(false);
  }

  function selectAutorisation(auth: Autorisation) {
    setFormData(prev => ({ ...prev, autorisation: auth, travaux: null }));
    goNext();
  }

  function handleTravauxClick(item: TravauxItem) {
    if (item.label === 'Autre') {
      setAutreMode({ type: item.type });
    } else {
      selectTravaux(item.label, item.type);
    }
  }

  function selectTravaux(label: string, type: 'dp' | 'pc') {
    setFormData(prev => ({
      ...prev,
      travaux: label,
      autorisation: prev.autorisation === 'unknown' ? type : prev.autorisation,
    }));
    setAutreMode(null); setAutreTexte('');
    goNext();
  }

  // ── Derived ────────────────────────────────────────────────────────────────

  const autorisationLabel = formData.autorisation === 'dp' ? 'Déclaration Préalable (DP)' : formData.autorisation === 'pc' ? 'Permis de Construire (PC)' : null;
  const delai = formData.autorisation === 'dp' ? '24-48h' : '48-72h';
  const travauxList: TravauxItem[] = formData.autorisation === 'dp' ? DP_TRAVAUX : formData.autorisation === 'pc' ? PC_TRAVAUX : [...DP_TRAVAUX, ...PC_TRAVAUX, ...UNKNOWN_EXTRA];

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
        onClick={e => e.stopPropagation()}
        className="relative z-10 bg-white w-full sm:max-w-2xl rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[88vh]"
      >
        {/* Header */}
        <div className="flex-shrink-0 px-5 pt-5 pb-3 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-base font-bold text-[#3d3d3d]">Démarrez votre projet</h1>
            <button type="button" onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors" aria-label="Fermer">
              <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          {/* Progress */}
          <div className="flex items-start">
            {STEP_LABELS.map((label, i) => {
              const num = i + 1; const done = num < step; const active = num === step;
              return (
                <div key={label} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${done ? 'bg-[#29abe2] text-white' : active ? 'bg-[#29abe2] text-white ring-4 ring-[#29abe2]/20' : 'bg-gray-100 text-gray-400'}`}>
                      {done ? <CheckIcon className="w-3.5 h-3.5" /> : num}
                    </div>
                    <span className={`mt-0.5 text-[9px] font-medium hidden sm:block transition-colors ${active ? 'text-[#29abe2]' : done ? 'text-gray-400' : 'text-gray-300'}`}>{label}</span>
                  </div>
                  {i < STEP_LABELS.length - 1 && <div className={`flex-1 h-0.5 mx-1 mb-3 transition-colors ${done ? 'bg-[#29abe2]' : 'bg-gray-200'}`} />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={step} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={slideTransition}>

              {/* ── Étape 1 : Ville ── */}
              {step === 1 && (
                <div>
                  <h2 className="text-lg font-bold text-[#3d3d3d] mb-1">Dans quelle commune se situe votre projet ?</h2>
                  <p className="text-gray-500 text-sm mb-5">Saisissez le nom de votre commune.</p>

                  <div className="relative" ref={villeRef}>
                    <div className="relative">
                      <input type="text" value={villeQuery} onChange={e => { setVilleQuery(e.target.value); if (formData.ville && e.target.value !== formData.ville.nom) setFormData(prev => ({ ...prev, ville: null })); }}
                        placeholder="Ex : Les Herbiers, La Roche-sur-Yon…"
                        className="w-full border-2 border-gray-200 focus:border-[#29abe2] rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                        autoFocus />
                      {formData.ville && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#29abe2]"><CheckIcon className="w-5 h-5" /></span>}
                    </div>
                    {villeOpen && villeSuggestions.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                        {villeSuggestions.map(v => (
                          <button key={v.code} type="button" onClick={() => selectVille(v)} className="w-full text-left px-4 py-3 text-sm hover:bg-[#29abe2]/5 transition-colors flex items-center justify-between border-b border-gray-50 last:border-0">
                            <span className="font-medium text-[#3d3d3d]">{v.nom}</span>
                            <span className="text-xs text-gray-400 ml-3 flex-shrink-0">{v.codesPostaux?.[0]} · Dép. {v.codeDepartement}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {formData.ville && (
                    <p className="mt-3 text-sm text-[#29abe2] flex items-center gap-2">
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                      <strong>{formData.ville.nom}</strong>
                      <span className="text-gray-400">({formData.ville.codesPostaux?.[0]}) — INSEE : {formData.ville.code}</span>
                    </p>
                  )}

                  <div className="flex justify-end mt-6"><NextButton onClick={goNext} disabled={!formData.ville} /></div>
                </div>
              )}

              {/* ── Étape 2 : Adresse ── */}
              {step === 2 && (
                <div>
                  <h2 className="text-lg font-bold text-[#3d3d3d] mb-1">Quelle est l&apos;adresse du terrain ou du bien ?</h2>
                  <p className="text-gray-500 text-sm mb-5">À <strong className="text-[#3d3d3d]">{formData.ville?.nom}</strong> — facultatif, mais utile pour l&apos;analyse PLU.</p>

                  <div className="relative" ref={adresseRef}>
                    <input type="text" value={adresseQuery} onChange={e => { setAdresseQuery(e.target.value); if (formData.adresse && e.target.value !== formData.adresse.label) setFormData(prev => ({ ...prev, adresse: null })); }}
                      placeholder="Numéro et nom de la rue…"
                      className="w-full border-2 border-gray-200 focus:border-[#29abe2] rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                      autoFocus />
                    {adresseOpen && adresseSuggestions.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                        {adresseSuggestions.map(f => (
                          <button key={f.properties.id} type="button" onClick={() => selectAdresse(f)} className="w-full text-left px-4 py-3 text-sm hover:bg-[#29abe2]/5 transition-colors border-b border-gray-50 last:border-0">
                            <span className="font-medium text-[#3d3d3d]">{f.properties.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {formData.adresse && (
                    <p className="mt-3 text-sm text-[#29abe2] flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 flex-shrink-0" />{formData.adresse.label}
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-6">
                    <BackButton onClick={goBack} />
                    <div className="flex flex-col items-end gap-1.5">
                      <NextButton onClick={goNext} />
                      {!formData.adresse && <button type="button" onClick={goNext} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Passer cette étape →</button>}
                    </div>
                  </div>
                </div>
              )}

              {/* ── Étape 3 : Autorisation ── */}
              {step === 3 && (
                <div>
                  <h2 className="text-lg font-bold text-[#3d3d3d] mb-1">De quel type d&apos;autorisation s&apos;agit-il ?</h2>
                  <p className="text-gray-500 text-sm mb-5">Cliquez sur votre situation — on détermine la bonne procédure si vous ne savez pas.</p>
                  <div className="grid gap-3">
                    {[
                      { id: 'dp' as Autorisation, code: 'DP', title: 'Déclaration Préalable', desc: 'Piscine, pergola, clôture, extension < 40 m², façade…', badge: '24-48h' },
                      { id: 'pc' as Autorisation, code: 'PC', title: 'Permis de Construire', desc: 'Maison neuve, extension > 40 m², surélévation, garage…', badge: '48-72h' },
                      { id: 'unknown' as Autorisation, code: '?', title: 'Je ne sais pas — aidez-moi à choisir', desc: 'Nous déterminons le bon type selon la nature de vos travaux.', badge: null },
                    ].map(opt => (
                      <button key={opt.id} type="button" onClick={() => selectAutorisation(opt.id)} className="w-full text-left border-2 border-gray-100 hover:border-[#29abe2] hover:shadow-md rounded-2xl p-4 transition-all group">
                        <div className="flex items-center gap-3">
                          <span className="w-9 h-9 bg-[#29abe2]/10 group-hover:bg-[#29abe2] text-[#29abe2] group-hover:text-white font-bold text-sm rounded-full flex items-center justify-center transition-colors flex-shrink-0">{opt.code}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="font-semibold text-[#3d3d3d] text-sm group-hover:text-[#29abe2] transition-colors">{opt.title}</p>
                              {opt.badge && <span className="text-xs bg-[#29abe2]/10 text-[#29abe2] px-2 py-0.5 rounded-full font-medium flex-shrink-0">{opt.badge}</span>}
                            </div>
                            <p className="text-gray-400 text-xs mt-0.5">{opt.desc}</p>
                          </div>
                          <svg className="w-4 h-4 text-gray-300 group-hover:text-[#29abe2] transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="mt-5"><BackButton onClick={goBack} /></div>
                </div>
              )}

              {/* ── Étape 4 : Travaux ── */}
              {step === 4 && (
                <div>
                  <h2 className="text-lg font-bold text-[#3d3d3d] mb-1">Quel type de travaux ?</h2>
                  <p className="text-gray-500 text-sm mb-4">Sélectionnez ce qui correspond à votre projet.</p>

                  {formData.autorisation !== 'unknown' && (
                    <div className="mb-4 inline-flex items-center gap-2 bg-[#29abe2]/10 text-[#29abe2] text-xs font-bold px-3 py-1.5 rounded-full">
                      {formData.autorisation === 'dp' ? 'DP — Déclaration Préalable' : 'PC — Permis de Construire'}
                    </div>
                  )}

                  {!autreMode ? (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                      {travauxList.map(item => (
                        <button key={`${item.type}-${item.label}`} type="button" onClick={() => handleTravauxClick(item)}
                          className="flex flex-col items-center text-center border-2 border-gray-100 hover:border-[#29abe2] hover:shadow-sm rounded-xl p-3 transition-all group">
                          <TIcon id={item.iconId} className="w-6 h-6 text-gray-400 group-hover:text-[#29abe2] transition-colors mb-1.5" />
                          <span className="text-xs font-medium text-[#3d3d3d] group-hover:text-[#29abe2] transition-colors leading-snug">{item.label}</span>
                          {formData.autorisation === 'unknown' && <span className="mt-1 text-[9px] uppercase font-bold tracking-widest text-gray-300">{item.type}</span>}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="border-2 border-[#29abe2] rounded-2xl p-5">
                      <p className="text-sm font-semibold text-[#3d3d3d] mb-1">Décrivez votre projet en quelques mots</p>
                      <p className="text-xs text-gray-400 mb-3">Cette description apparaîtra dans le récapitulatif et sera transmise à notre équipe.</p>
                      <textarea
                        value={autreTexte}
                        onChange={e => setAutreTexte(e.target.value)}
                        placeholder="Ex : agrandissement de 25m² avec terrasse attenante…"
                        rows={3}
                        className="w-full border-2 border-gray-200 focus:border-[#29abe2] rounded-xl px-4 py-3 text-sm outline-none transition-colors resize-none"
                        autoFocus
                      />
                      <div className="flex items-center justify-between mt-3">
                        <button type="button" onClick={() => { setAutreMode(null); setAutreTexte(''); }} className="text-sm text-gray-400 hover:text-gray-600 transition-colors">← Annuler</button>
                        <button type="button" disabled={!autreTexte.trim()} onClick={() => selectTravaux(`Autre : ${autreTexte.trim()}`, autreMode.type)}
                          className="inline-flex items-center gap-2 bg-[#29abe2] hover:bg-[#1a9fd6] disabled:bg-gray-200 disabled:cursor-not-allowed text-white font-semibold px-6 py-2.5 rounded-full transition-all text-sm">
                          Valider
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="mt-5"><BackButton onClick={goBack} /></div>
                </div>
              )}

              {/* ── Étape 5 : Récapitulatif ── */}
              {step === 5 && (
                <div>
                  <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full mb-4">
                    <CheckIcon className="w-3.5 h-3.5" />Récapitulatif de votre projet
                  </div>
                  <h2 className="text-lg font-bold text-[#3d3d3d] mb-4 leading-snug">
                    Votre projet <span className="text-[#29abe2]">{formData.travaux?.toLowerCase()}</span> à <span className="text-[#29abe2]">{formData.ville?.nom}</span> nécessite une <span className="text-[#29abe2]">{autorisationLabel}</span>.
                  </h2>

                  <div className="bg-white border border-gray-100 rounded-2xl p-4 mb-4 space-y-2">
                    {[
                      { label: 'Commune', value: `${formData.ville?.nom} (${formData.ville?.codesPostaux?.[0]})` },
                      formData.adresse ? { label: 'Adresse', value: formData.adresse.label } : null,
                      { label: 'Autorisation', value: autorisationLabel ?? '' },
                      { label: 'Travaux', value: formData.travaux ?? '' },
                    ].filter(Boolean).map(item => (
                      <div key={item!.label} className="flex items-center gap-3 text-sm">
                        <span className="w-5 h-5 bg-[#29abe2]/10 text-[#29abe2] rounded-full flex items-center justify-center flex-shrink-0"><CheckIcon className="w-3 h-3" /></span>
                        <span className="text-gray-600"><strong className="text-[#3d3d3d]">{item!.label} :</strong> {item!.value}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    Projego peut gérer l&apos;intégralité de vos démarches en <strong className="text-[#3d3d3d]">{delai}</strong>. Réservez un créneau avec l&apos;un de nos experts qui se chargera de votre dossier.
                  </p>

                  <div className="bg-[#29abe2]/5 border border-[#29abe2]/20 rounded-2xl p-4 mb-5">
                    <p className="text-[#3d3d3d] font-semibold text-sm mb-1">Souhaitez-vous caler un rendez-vous maintenant ?</p>
                    <p className="text-gray-500 text-xs leading-relaxed">Le rendez-vous ne durera que <strong>15 minutes</strong> et ne vous engage à rien.</p>
                  </div>

                  <button type="button" onClick={goNext} className="w-full inline-flex items-center justify-center gap-2 bg-[#29abe2] hover:bg-[#1a9fd6] text-white font-semibold px-8 py-3.5 rounded-full transition-all shadow-lg hover:-translate-y-0.5 mb-3">
                    Oui, je réserve mon créneau
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                  </button>
                  <p className="text-center mb-4">
                    <Link href="/contact" onClick={onClose} className="text-sm text-gray-400 hover:text-gray-600 transition-colors underline underline-offset-2">Non merci, je préfère vous contacter autrement</Link>
                  </p>
                  <BackButton onClick={goBack} />
                </div>
              )}

              {/* ── Étape 6 : Calendrier GHL ── */}
              {step === 6 && (
                <div>
                  <h2 className="text-lg font-bold text-[#3d3d3d] mb-1">Réservez votre créneau</h2>
                  <p className="text-gray-500 text-sm mb-4">Un entretien de <strong>15 minutes</strong> avec un expert Projego — gratuit, sans engagement.</p>
                  <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                    <iframe src="https://api.leadconnectorhq.com/widget/booking/dSbks5cI78At6qDEkT5x"
                      style={{ width: '100%', border: 'none', overflow: 'hidden', minHeight: '640px', display: 'block' }}
                      scrolling="no" id="dSbks5cI78At6qDEkT5x_1780999406574" title="Réserver un créneau Projego" />
                  </div>
                  <Script id="ghl-booking" src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
                  <div className="mt-5">
                    <Link href="/" onClick={onClose} className="text-sm text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                      Revenir à l&apos;accueil
                    </Link>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
