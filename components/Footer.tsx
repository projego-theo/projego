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
