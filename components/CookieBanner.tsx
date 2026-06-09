'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Script from 'next/script';

type Consent = 'accepted' | 'refused';

const GTM_ID = 'GTM-KVCGG62W';
const PIXEL_ID = '659768348299970';
const GA4_ID = 'G-QCJEBNXYPW';

export default function CookieBanner() {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('cookie-consent') as Consent | null;
    if (stored === 'accepted' || stored === 'refused') {
      setConsent(stored);
    } else {
      setShow(true);
    }
  }, []);

  function accept() {
    localStorage.setItem('cookie-consent', 'accepted');
    setConsent('accepted');
    setShow(false);
  }

  function refuse() {
    localStorage.setItem('cookie-consent', 'refused');
    setConsent('refused');
    setShow(false);
  }

  return (
    <>
      {/* Accepté → GTM (inclut GA4) + Meta Pixel */}
      {consent === 'accepted' && (
        <>
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
        </>
      )}

      {/* Refusé → GA4 anonymisé uniquement, pas de Pixel */}
      {consent === 'refused' && (
        <>
          {/* La config doit être dans la file dataLayer avant le chargement de la lib */}
          <Script
            id="ga4-init"
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

      {/* Bandeau */}
      {show && (
        <div className="fixed bottom-0 inset-x-0 z-50 bg-[#1a1a2e]/95 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-gray-300 text-center sm:text-left">
              Nous utilisons des cookies pour améliorer votre expérience.{' '}
              <Link href="/politique-cookies" className="text-[#29abe2] hover:underline">
                En savoir plus
              </Link>
            </p>
            <div className="flex items-center gap-4 flex-shrink-0">
              <button
                onClick={refuse}
                className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
              >
                Refuser
              </button>
              <button
                onClick={accept}
                className="text-sm font-semibold bg-[#29abe2] hover:bg-[#1a9fd6] text-white px-5 py-2 rounded-full transition-colors"
              >
                Accepter
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
