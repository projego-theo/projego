import Link from 'next/link';
import Image from 'next/image';

const demarches = [
  { href: '/declaration-prealable', label: 'Déclaration Préalable' },
  { href: '/permis-de-construire', label: 'Permis de Construire' },
];

const maitrise = [
  { href: '/maitrise-oeuvre', label: "Maîtrise d'œuvre" },
  { href: '/construction-maison-neuve', label: 'Construction maison neuve' },
  { href: '/extension-maison', label: 'Extension / Surélévation' },
  { href: '/renovation-maison', label: 'Rénovation' },
  { href: '/suivi-de-chantier', label: 'Suivi de chantier' },
];

const company = [
  { href: '/a-propos', label: 'À propos de Projego' },
  { href: '/nos-realisations', label: 'Nos réalisations' },
  { href: '/blog', label: 'Blog & conseils' },
  { href: '/espace-pro', label: 'Pour les Pros' },
  { href: '/contact', label: 'Contact' },
];

const cities = [
  'Les Herbiers', 'Cholet', 'Montaigu', 'Pouzauges', 'Bressuire',
  'Saint-Fulgent', 'Mortagne-sur-Sèvre', 'Chantonnay',
];

export default function Footer() {
  return (
    <footer className="relative bg-[#1a1a2e] text-white overflow-hidden">
      {/* Static grid */}
      <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="footer-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#29abe2" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-grid)" />
        </svg>
      </div>
      {/* Subtle glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute right-[-10%] top-[-30%] w-[35%] h-[35%] rounded-full bg-[#29abe2]/10 blur-[100px]" />
        <div className="absolute left-[-10%] bottom-[-30%] w-[35%] h-[35%] rounded-full bg-[#3d3d3d]/30 blur-[100px]" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Image
              src="/logo-blanc.png"
              alt="Projego"
              width={140}
              height={40}
              className="h-9 w-auto object-contain mb-4"
            />
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Spécialiste des démarches administratives (DP/PC) et de la maîtrise d&apos;œuvre en Vendée. Basé à Beaurepaire (85). En activité depuis 2019 (anciennement TConseils).
            </p>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#29abe2] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Beaurepaire, Vendée (85)
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#29abe2] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:contact@projego.fr" className="hover:text-[#29abe2] transition-colors">contact@projego.fr</a>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://www.facebook.com/ProjegoFR/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-[#29abe2] hover:bg-[#1a8fc2] transition-colors flex items-center justify-center flex-shrink-0"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/projegofrance/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-[#29abe2] hover:bg-[#1a8fc2] transition-colors flex items-center justify-center flex-shrink-0"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/channel/UCZ2wTTTlUIAY289GfLythPg"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-[#29abe2] hover:bg-[#1a8fc2] transition-colors flex items-center justify-center flex-shrink-0"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/theo-chauvet-0394461ba/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-[#29abe2] hover:bg-[#1a8fc2] transition-colors flex items-center justify-center flex-shrink-0"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Démarches administratives */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#29abe2] mb-4">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-4 h-4 bg-[#29abe2] rounded-full inline-flex items-center justify-center text-white text-xs font-bold">A</span>
                Permis &amp; Démarches
              </span>
            </h3>
            <p className="text-xs text-gray-400 mb-3">Toute la France · 100% distanciel</p>
            <ul className="space-y-2">
              {demarches.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-300 hover:text-[#29abe2] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mt-8 mb-4">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-4 h-4 bg-white/20 rounded-full inline-flex items-center justify-center text-white text-xs font-bold">B</span>
                Maîtrise d&apos;œuvre
              </span>
            </h3>
            <p className="text-xs text-gray-400 mb-3">Vendée · 30 km des Herbiers</p>
            <ul className="space-y-2">
              {maitrise.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-300 hover:text-[#29abe2] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#29abe2] mb-4">Entreprise</h3>
            <ul className="space-y-2">
              {company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-300 hover:text-[#29abe2] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Zone géographique */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#29abe2] mb-4">Zone d&apos;intervention</h3>
            <p className="text-sm text-gray-300 mb-3">
              Maîtrise d&apos;œuvre dans un rayon de 30 km autour des Herbiers :
            </p>
            <div className="flex flex-wrap gap-1.5">
              {cities.map((city) => (
                <span key={city} className="text-xs bg-white/10 rounded-full px-2.5 py-1 text-gray-300">
                  {city}
                </span>
              ))}
              <span className="text-xs bg-white/10 rounded-full px-2.5 py-1 text-gray-300">et + de 40 communes</span>
            </div>
            <p className="text-sm text-gray-300 mt-4">
              Déclaration préalable &amp; permis de construire :{' '}
              <span className="text-white font-medium">toute la France</span>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Projego — Tous droits réservés · En activité depuis 2019 (anciennement TConseils)
          </p>
          <div className="flex gap-6 text-xs text-gray-400">
            <Link href="/mentions-legales" className="hover:text-[#29abe2] transition-colors">Mentions légales</Link>
            <Link href="/politique-confidentialite" className="hover:text-[#29abe2] transition-colors">Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
