import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "Projego — Permis de construire & Maîtrise d'œuvre Vendée",
    template: '%s | Projego',
  },
  description:
    "Projego gère vos démarches administratives (DP, PC) partout en France en 24-72h, et votre maîtrise d'œuvre en Vendée. Basé à Beaurepaire (85).",
  metadataBase: new URL('https://www.projego.fr'),
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Projego',
    title: "Projego — Permis de construire, déclaration préalable et maîtrise d'œuvre en Vendée",
    description: "Projego gère vos démarches administratives (DP, PC) partout en France en 24-72h, et votre maîtrise d'œuvre en Vendée. Basé à Beaurepaire (85).",
    images: [{ url: '/logo-noir.png', width: 1200, height: 630, alt: 'Projego' }],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    other: {
      'msvalidate.01': 'B5C41032E0D485278C9F6853C11B63B1',
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col antialiased">
        {/* GTM noscript fallback — doit être immédiatement après <body> */}
        <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KVCGG62W" height="0" width="0" style="display:none;visibility:hidden"></iframe>` }} />

        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />

        {/* Google Tag Manager */}
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KVCGG62W');`,
          }}
        />

        {/* Meta Pixel */}
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
fbq('init','659768348299970');
fbq('track','PageView');`,
          }}
        />

        {/* Meta Pixel noscript fallback */}
        <noscript dangerouslySetInnerHTML={{ __html: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=659768348299970&ev=PageView&noscript=1" alt="" />` }} />

        {/* Chat widget */}
        <Script
          src="https://beta.leadconnectorhq.com/loader.js"
          data-resources-url="https://beta.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="6a18961b9f5b0cd19a61823a"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
