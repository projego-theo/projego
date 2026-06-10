'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Script from 'next/script';

type ConsentPrefs = { stats: boolean; marketing: boolean };

const GTM_ID = 'GTM-KVCGG62W';
const PIXEL_ID = '659768348299970';
const GA4_ID = 'G-QCJEBNXYPW';

function Toggle({
  checked,
  onChange,
  disabled,
}: {
  checked: boolean;
  onChange?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={disabled ? undefined : onChange}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors focus:outline-none ${
        disabled ? 'cursor-not-allowed' : 'cursor-pointer'
      } ${checked ? (disabled ? 'bg-gray-300' : 'bg-[#29abe2]') : 'bg-gray-200'}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

export default function CookieBanner() {
  // undefined = SSR / pas encore hydraté → rien à rendre
  // null = pas de choix enregistré → afficher le popup
  // object = choix enregistré → charger les scripts
  const [consent, setConsent] = useState<ConsentPrefs | null | undefined>(undefined);
  const [step, setStep] = useState<'main' | 'customize'>('main');
  const [statsToggle, setStatsToggle] = useState(true);
  const [marketingToggle, setMarketingToggle] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('cookie-consent');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Valider que c'est bien le nouveau format { stats, marketing }
        if (typeof parsed?.stats === 'boolean' && typeof parsed?.marketing === 'boolean') {
          setConsent(parsed);
        } else {
          setConsent(null);
        }
      } catch {
        setConsent(null);
      }
    } else {
      setConsent(null);
    }
  }, []);

  // Bloquer le scroll pendant que le popup est visible
  useEffect(() => {
    if (consent === null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [consent]);

  function save(prefs: ConsentPrefs) {
    localStorage.setItem('cookie-consent', JSON.stringify(prefs));
    setConsent(prefs);
    setStep('main');
  }

  if (consent === undefined) return null;

  return (
    <>
      {/* ── Scripts selon les préférences ── */}
      {consent !== null && (
        <>
          {/* GTM (gère GA4 via le container) — seulement si tout est accepté */}
          {consent.stats && consent.marketing && (
            <Script
              id="gtm"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
              }}
            />
          )}

          {/* GA4 complet — stats consentis mais pas via GTM (stats seul, sans marketing) */}
          {consent.stats && !consent.marketing && (
            <>
              <Script
                id="ga4-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA4_ID}');`,
                }}
              />
              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
                strategy="afterInteractive"
              />
            </>
          )}

          {/* GA4 anonymisé — stats non consentis (refus ou sélection sans stats) */}
          {!consent.stats && (
            <>
              <Script
                id="ga4-anon"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{'analytics_storage':'granted','ad_storage':'denied','functionality_storage':'denied','personalization_storage':'denied'});gtag('js',new Date());gtag('config','${GA4_ID}',{'anonymize_ip':true});`,
                }}
              />
              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
                strategy="afterInteractive"
              />
            </>
          )}

          {/* Meta Pixel — uniquement si marketing consenti */}
          {consent.marketing && (
            <Script
              id="meta-pixel"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${PIXEL_ID}');
fbq('track','PageView');`,
              }}
            />
          )}
        </>
      )}

      {/* ── Popup overlay ── */}
      {consent === null && (
        <div className="fixed inset-0 z-[45] flex items-center justify-center p-4 bg-black/60">

          {/* Étape 1 — Principal */}
          {step === 'main' && (
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
              <h2 className="text-lg font-bold text-[#3d3d3d] mb-3">Vos préférences de cookies</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Nous utilisons des cookies pour analyser notre trafic et vous proposer des publicités personnalisées.
              </p>
              <Link
                href="/politique-cookies"
                className="text-xs text-[#29abe2] hover:underline mt-1 mb-5 inline-block"
              >
                En savoir plus
              </Link>
              <div className="flex gap-3">
                <button
                  onPointerDown={() => setStep('customize')}
                  style={{ touchAction: 'manipulation' }}
                  className="touch-manipulation flex-1 text-sm font-medium text-gray-500 border border-gray-200 hover:border-gray-400 hover:text-gray-700 px-4 py-2.5 rounded-full transition-colors"
                >
                  Personnaliser
                </button>
                <button
                  onPointerDown={() => save({ stats: true, marketing: true })}
                  style={{ touchAction: 'manipulation' }}
                  className="touch-manipulation flex-1 text-sm font-semibold bg-[#29abe2] hover:bg-[#1a9fd6] text-white px-4 py-2.5 rounded-full transition-colors"
                >
                  Tout accepter
                </button>
              </div>
            </div>
          )}

          {/* Étape 2 — Personnalisation */}
          {step === 'customize' && (
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
              <button
                onPointerDown={() => setStep('main')}
                style={{ touchAction: 'manipulation' }}
                className="text-xs text-gray-400 hover:text-gray-600 mb-4 flex items-center gap-1 transition-colors"
              >
                ← Retour
              </button>
              <h2 className="text-lg font-bold text-[#3d3d3d] mb-5">Personnaliser mes cookies</h2>

              <div className="space-y-1 mb-6">
                {/* Nécessaires */}
                <div className="flex items-center justify-between gap-4 py-3.5 border-b border-gray-100">
                  <div>
                    <p className="text-sm font-semibold text-[#3d3d3d]">Nécessaires</p>
                    <p className="text-xs text-gray-400 mt-0.5">Fonctionnement du site. Toujours actifs.</p>
                  </div>
                  <Toggle checked={true} disabled />
                </div>

                {/* Statistiques */}
                <div className="flex items-center justify-between gap-4 py-3.5 border-b border-gray-100">
                  <div>
                    <p className="text-sm font-semibold text-[#3d3d3d]">Statistiques</p>
                    <p className="text-xs text-gray-400 mt-0.5">Google Analytics — mesure d&apos;audience.</p>
                  </div>
                  <Toggle
                    checked={statsToggle}
                    onChange={() => setStatsToggle((v) => !v)}
                  />
                </div>

                {/* Marketing */}
                <div className="flex items-center justify-between gap-4 py-3.5">
                  <div>
                    <p className="text-sm font-semibold text-[#3d3d3d]">Marketing</p>
                    <p className="text-xs text-gray-400 mt-0.5">Meta Pixel — publicités personnalisées.</p>
                  </div>
                  <Toggle
                    checked={marketingToggle}
                    onChange={() => setMarketingToggle((v) => !v)}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onPointerDown={() => save({ stats: false, marketing: false })}
                  style={{ touchAction: 'manipulation' }}
                  className="touch-manipulation flex-1 text-sm font-medium text-gray-500 border border-gray-200 hover:border-gray-400 hover:text-gray-700 px-4 py-2.5 rounded-full transition-colors"
                >
                  Tout refuser
                </button>
                <button
                  onPointerDown={() => save({ stats: statsToggle, marketing: marketingToggle })}
                  style={{ touchAction: 'manipulation' }}
                  className="touch-manipulation flex-1 text-sm font-semibold bg-[#29abe2] hover:bg-[#1a9fd6] text-white px-4 py-2.5 rounded-full transition-colors"
                >
                  Autoriser la sélection
                </button>
              </div>
            </div>
          )}

        </div>
      )}
    </>
  );
}
