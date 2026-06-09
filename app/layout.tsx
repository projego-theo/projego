import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import TunnelModal from '@/components/TunnelModal';

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
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
        <TunnelModal />
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
