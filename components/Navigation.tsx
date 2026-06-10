'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const servicesMenu = [
  {
    label: 'Démarches administratives',
    sublabel: 'Toute la France • 100% distanciel',
    items: [
      { href: '/declaration-prealable', label: 'Déclaration Préalable', desc: '24-48h • piscine, pergola, clôture...' },
      { href: '/permis-de-construire', label: 'Permis de Construire', desc: '48-72h • maison, extension >40m²...' },
    ],
    type: 'A',
    subLinks: [
      { href: '/declaration-prealable/type/piscine', label: 'DP Piscine' },
      { href: '/declaration-prealable/type/pergola', label: 'DP Pergola' },
      { href: '/declaration-prealable/type/extension', label: 'DP Extension' },
      { href: '/permis-de-construire/type/maison-neuve', label: 'PC Maison neuve' },
      { href: '/permis-de-construire/type/extension', label: 'PC Extension' },
    ],
  },
  {
    label: "Maîtrise d'œuvre",
    sublabel: 'Vendée • 30 km autour des Herbiers',
    items: [
      { href: '/maitrise-oeuvre', label: "Maîtrise d'œuvre", desc: 'Vue d\'ensemble de nos missions' },
      { href: '/construction-maison-neuve', label: 'Construction maison neuve', desc: 'Plans, 3D, permis, suivi' },
      { href: '/extension-maison', label: 'Extension & Surélévation', desc: 'Agrandissement de votre maison' },
      { href: '/renovation-maison', label: 'Rénovation', desc: 'Maison ou appartement' },
      { href: '/suivi-de-chantier', label: 'Suivi de chantier', desc: 'Service optionnel' },
    ],
    type: 'B',
    subLinks: [],
  },
  {
    label: 'Espace Professionnel',
    sublabel: 'Artisans BTP · Toute la France',
    items: [
      { href: '/espace-pro', label: 'DP & PC sous-traitance', desc: 'Confiez-nous les démarches de vos chantiers' },
      { href: '/espace-pro', label: 'Croquis en plans', desc: 'Vos croquis transformés en plans exploitables' },
    ],
    type: 'PRO',
    subLinks: [],
  },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  const transparent = isHome && !scrolled;
  const navBg = transparent ? 'bg-transparent' : 'bg-white shadow-md';
  const textColor = transparent ? 'text-white' : 'text-[#3d3d3d]';
  const logo = transparent ? '/logo-blanc.png' : '/logo-noir.png';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src={logo}
              alt="Projego"
              width={140}
              height={40}
              className="h-8 lg:h-10 w-auto object-contain transition-all duration-300"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/" className={`text-sm font-medium hover:text-[#29abe2] transition-colors ${textColor}`}>
              Accueil
            </Link>

            {/* Services dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className={`flex items-center gap-1 text-sm font-medium hover:text-[#29abe2] transition-colors ${textColor}`}>
                Services
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[960px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                  >
                    <div className="grid grid-cols-3 divide-x divide-gray-100">
                      {servicesMenu.map((group) => (
                        <div key={group.label} className="p-6">
                          <div className="flex items-center gap-2 mb-1">
                            {group.type === 'PRO' ? (
                              <span className="text-xs bg-[#29abe2]/10 text-[#29abe2] px-2 py-0.5 rounded-full font-bold flex-shrink-0">PRO</span>
                            ) : (
                              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${group.type === 'A' ? 'bg-[#29abe2]' : 'bg-[#3d3d3d]'}`}>
                                {group.type}
                              </span>
                            )}
                            <p className="text-xs font-bold uppercase tracking-widest text-[#29abe2]">{group.label}</p>
                          </div>
                          <p className="text-xs text-gray-400 mb-4 pl-7">{group.sublabel}</p>
                          <ul className="space-y-3">
                            {group.items.map((item) => (
                              <li key={item.href}>
                                <Link
                                  href={item.href}
                                  className="group block rounded-lg px-3 py-2 hover:bg-[#29abe2]/8 transition-colors"
                                >
                                  <p className="text-sm font-semibold text-[#3d3d3d] group-hover:text-[#29abe2] transition-colors">{item.label}</p>
                                  <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                                </Link>
                              </li>
                            ))}
                          </ul>
                          {group.subLinks && group.subLinks.length > 0 && (
                            <div className="mt-4 pt-3 border-t border-gray-100">
                              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 px-3">Par type de travaux</p>
                              <div className="flex flex-wrap gap-1 px-3">
                                {group.subLinks.map((sl) => (
                                  <Link key={sl.href} href={sl.href} className="text-xs bg-gray-100 hover:bg-[#29abe2]/10 hover:text-[#29abe2] text-[#3d3d3d] px-2.5 py-1 rounded-full transition-all">
                                    {sl.label}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/nos-realisations" className={`text-sm font-medium hover:text-[#29abe2] transition-colors ${textColor}`}>
              Réalisations
            </Link>
            <Link href="/blog" className={`text-sm font-medium hover:text-[#29abe2] transition-colors ${textColor}`}>
              Blog
            </Link>
            <Link href="/a-propos" className={`text-sm font-medium hover:text-[#29abe2] transition-colors ${textColor}`}>
              À propos
            </Link>
          </div>

          {/* CTA buttons + Mobile toggle */}
          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className={`hidden lg:inline-flex items-center gap-2 border-2 ${transparent ? 'border-white text-white hover:bg-white hover:text-[#1a1a2e]' : 'border-[#3d3d3d] text-[#3d3d3d] hover:bg-[#3d3d3d] hover:text-white'} text-sm font-semibold px-5 py-2.5 rounded-full transition-colors`}
            >
              Nous contacter
            </Link>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('open-tunnel'))}
              className="hidden lg:inline-flex items-center gap-2 cursor-pointer bg-[#1a8fc0] hover:bg-[#1a9fd6] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors shadow-md"
            >
              Démarrer mon projet
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-lg ${textColor}`}
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-1">
              <Link href="/" className="block py-2 text-sm font-medium text-[#3d3d3d] hover:text-[#29abe2]">Accueil</Link>

              <div className="pt-2 pb-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-4 h-4 bg-[#29abe2] rounded-full flex items-center justify-center text-white text-xs font-bold">A</span>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#29abe2]">Permis &amp; Démarches</p>
                </div>
                <Link href="/declaration-prealable" className="block py-1.5 text-sm text-[#3d3d3d] hover:text-[#29abe2] pl-6">Déclaration Préalable</Link>
                <Link href="/permis-de-construire" className="block py-1.5 text-sm text-[#3d3d3d] hover:text-[#29abe2] pl-6">Permis de Construire</Link>
              </div>

              <div className="pt-2 pb-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-4 h-4 bg-[#3d3d3d] rounded-full flex items-center justify-center text-white text-xs font-bold">B</span>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#3d3d3d]">Maîtrise d&apos;œuvre</p>
                </div>
                <Link href="/maitrise-oeuvre" className="block py-1.5 text-sm text-[#3d3d3d] hover:text-[#29abe2] pl-6">Vue d&apos;ensemble</Link>
                <Link href="/construction-maison-neuve" className="block py-1.5 text-sm text-[#3d3d3d] hover:text-[#29abe2] pl-6">Construction maison neuve</Link>
                <Link href="/extension-maison" className="block py-1.5 text-sm text-[#3d3d3d] hover:text-[#29abe2] pl-6">Extension / Surélévation</Link>
                <Link href="/renovation-maison" className="block py-1.5 text-sm text-[#3d3d3d] hover:text-[#29abe2] pl-6">Rénovation</Link>
                <Link href="/suivi-de-chantier" className="block py-1.5 text-sm text-[#3d3d3d] hover:text-[#29abe2] pl-6">Suivi de chantier</Link>
              </div>

              <div className="pt-2 pb-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs bg-[#29abe2]/10 text-[#29abe2] px-2 py-0.5 rounded-full font-bold">PRO</span>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#29abe2]">Espace Professionnel</p>
                </div>
                <Link href="/espace-pro" className="block py-1.5 text-sm text-[#3d3d3d] hover:text-[#29abe2] pl-6">DP &amp; PC sous-traitance</Link>
                <Link href="/espace-pro" className="block py-1.5 text-sm text-[#3d3d3d] hover:text-[#29abe2] pl-6">Croquis en plans</Link>
              </div>

              <Link href="/nos-realisations" className="block py-2 text-sm font-medium text-[#3d3d3d] hover:text-[#29abe2]">Réalisations</Link>
              <Link href="/blog" className="block py-2 text-sm font-medium text-[#3d3d3d] hover:text-[#29abe2]">Blog</Link>
              <Link href="/a-propos" className="block py-2 text-sm font-medium text-[#3d3d3d] hover:text-[#29abe2]">À propos</Link>

              <div className="pt-4 space-y-3">
                <button
                  type="button"
                  onClick={() => { setMobileOpen(false); window.dispatchEvent(new CustomEvent('open-tunnel')); }}
                  className="block w-full text-center cursor-pointer bg-[#1a8fc0] text-white text-sm font-semibold py-3 rounded-full"
                >
                  Démarrer mon projet
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
