'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { HeroGrid } from '@/components/HeroGrid';
import { Typewriter } from '@/components/Typewriter';

const typeAServices = [
  { title: 'Déclaration Préalable', delay: '24-48h', href: '/declaration-prealable' },
  { title: 'Permis de Construire', delay: '48-72h', href: '/permis-de-construire' },
];

const typeBServices = [
  { title: 'Construction maison neuve', href: '/construction-maison-neuve' },
  { title: 'Extension & Surélévation', href: '/extension-maison' },
  { title: 'Rénovation', href: '/renovation-maison' },
  { title: 'Suivi de chantier', href: '/suivi-de-chantier' },
];

const stats = [
  { value: '150+', label: 'Projets réalisés' },
  { value: '48h', label: 'Délai moyen DP' },
  { value: '30 km', label: "Zone maîtrise d'œuvre" },
  { value: '+900', label: 'Démarches en France' },
];

export default function HeroSection() {
  const [hoveredCard, setHoveredCard] = useState<'A' | 'B' | null>(null);
  const [noAnim, setNoAnim] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;
    setNoAnim(
      /^((?!chrome|android).)*safari/i.test(ua) ||
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    );
  }, []);

  const cardAActive = hoveredCard === 'A';
  const cardBActive = hoveredCard === 'B';
  const cardADimmed = hoveredCard === 'B';
  const cardBDimmed = hoveredCard === 'A';

  return (
    <HeroGrid>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-8">
        {/* 2-column layout: title+typewriter left, Type A/B cards right */}
        <div className="grid lg:grid-cols-2 gap-16 items-center pb-10">
          {/* Left: headline + CTAs */}
          <div>
            <motion.div
              initial={noAnim ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: noAnim ? 0 : 0.7, delay: noAnim ? 0 : 0.15 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight"
            >
              Un projet
            </motion.div>

            <motion.div
              initial={noAnim ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: noAnim ? 0 : 0.6, delay: noAnim ? 0 : 0.28 }}
              style={{ minHeight: '2.5rem' }}
              className="mt-3 mb-6"
            >
              <p className="text-2xl md:text-3xl text-[#29abe2] font-bold">
                <Typewriter
                  text={["de construction ?", "de rénovation ?", "d'extension ?", "découvrez notre service pro", "on gère vos DP et PC"]}
                  speed={60}
                  deleteSpeed={30}
                  waitTime={2500}
                  className="text-[#29abe2]"
                  cursorChar="|"
                  cursorClassName="text-[#29abe2] ml-1"
                />
              </p>
            </motion.div>

            <motion.h1
              initial={noAnim ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: noAnim ? 0 : 0.7, delay: noAnim ? 0 : 0.35 }}
              className="text-lg text-gray-300 leading-relaxed mb-10 max-w-lg"
            >
              Maîtrise d&apos;œuvre qui gère tous vos projets et toutes vos démarches
            </motion.h1>

            <motion.div
              initial={noAnim ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: noAnim ? 0 : 0.7, delay: noAnim ? 0 : 0.45 }}
              className="flex flex-wrap gap-4"
            >
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('open-tunnel'))}
                className="inline-flex items-center gap-2 cursor-pointer bg-[#1270a0] hover:bg-[#1a9fd6] text-white font-semibold px-8 py-4 rounded-full transition-all shadow-lg shadow-[#29abe2]/20 hover:-translate-y-0.5"
              >
                Démarrer mon projet
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <Link
                href="/espace-pro"
                className="inline-flex items-center gap-2 border-2 border-[#29abe2]/60 hover:border-[#29abe2] hover:bg-[#29abe2]/10 text-white font-semibold px-8 py-4 rounded-full transition-all"
              >
                Pour les Pros
              </Link>
            </motion.div>
          </div>

          {/* Right: Type A & Type B cards */}
          <motion.div
            initial={noAnim ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: noAnim ? 0 : 0.8, delay: noAnim ? 0 : 0.35 }}
            className="grid gap-4"
          >
            {/* Type A */}
            <div
              className="rounded-2xl p-6 cursor-pointer transition-all duration-300"
              style={{
                backgroundColor: cardAActive ? '#29abe2' : 'rgba(41,171,226,0.1)',
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: cardAActive ? '#29abe2' : 'rgba(41,171,226,0.4)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                opacity: cardADimmed ? 0.5 : 1,
              }}
              onMouseEnter={() => setHoveredCard('A')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors duration-300"
                      style={{
                        backgroundColor: cardAActive ? 'rgba(255,255,255,0.3)' : '#29abe2',
                        color: 'white',
                      }}
                    >
                      A
                    </span>
                    <span
                      className="text-xs font-bold uppercase tracking-widest transition-colors duration-300"
                      style={{ color: cardAActive ? 'white' : '#29abe2' }}
                    >
                      Type A — Permis &amp; Démarches
                    </span>
                  </div>
                  <p
                    className="text-xs pl-8 transition-colors duration-300"
                    style={{ color: cardAActive ? 'rgba(255,255,255,0.8)' : '#9ca3af' }}
                  >
                    Toute la France · 100% à distance
                  </p>
                </div>
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full flex-shrink-0 transition-colors duration-300"
                  style={{
                    backgroundColor: cardAActive ? 'rgba(255,255,255,0.2)' : 'rgba(41,171,226,0.2)',
                    color: cardAActive ? 'white' : '#29abe2',
                  }}
                >
                  Distanciel
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {typeAServices.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className={`group relative rounded-xl p-3 pr-6 border border-transparent transition-all duration-200 hover:border-[#29abe2] hover:bg-white/25 ${cardAActive ? 'bg-white/15' : 'bg-white/10'}`}
                  >
                    <p className="font-semibold text-sm text-white">{s.title}</p>
                    <p
                      className={`text-xs mt-1 transition-colors duration-200 group-hover:text-white ${cardAActive ? 'text-white/70' : 'text-[#29abe2]/70'}`}
                    >
                      {s.delay}
                    </p>
                    <svg className="absolute top-3 right-3 w-3.5 h-3.5 text-[#29abe2] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>

            {/* Type B */}
            <div
              className="rounded-2xl p-6 cursor-pointer transition-all duration-300"
              style={{
                backgroundColor: cardBActive ? '#29abe2' : 'rgba(255,255,255,0.08)',
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: cardBActive ? '#29abe2' : 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                opacity: cardBDimmed ? 0.5 : 1,
              }}
              onMouseEnter={() => setHoveredCard('B')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 transition-colors duration-300"
                      style={{
                        backgroundColor: cardBActive ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.2)',
                        borderWidth: cardBActive ? 0 : 1,
                        borderStyle: 'solid',
                        borderColor: 'rgba(255,255,255,0.4)',
                      }}
                    >
                      B
                    </span>
                    <span
                      className="text-xs font-bold uppercase tracking-widest transition-colors duration-300"
                      style={{ color: cardBActive ? 'white' : '#d1d5db' }}
                    >
                      Type B — Conception &amp; MOe
                    </span>
                  </div>
                  <p
                    className="text-xs pl-8 transition-colors duration-300"
                    style={{ color: cardBActive ? 'rgba(255,255,255,0.8)' : '#9ca3af' }}
                  >
                    Vendée · 30km autour des Herbiers
                  </p>
                </div>
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full flex-shrink-0 transition-colors duration-300"
                  style={{
                    backgroundColor: cardBActive ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
                    color: cardBActive ? 'white' : '#d1d5db',
                  }}
                >
                  Local
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {typeBServices.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className={`group relative rounded-xl p-3 pr-6 border border-transparent transition-all duration-200 hover:border-[#29abe2] hover:bg-white/25 ${cardBActive ? 'bg-white/15' : 'bg-white/10'}`}
                  >
                    <p className="text-white font-semibold text-sm">{s.title}</p>
                    <svg className="absolute top-1/2 right-3 -translate-y-1/2 w-3.5 h-3.5 text-[#29abe2] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats row — full width below the 2-column layout */}
        <motion.div
          initial={noAnim ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: noAnim ? 0 : 0.7, delay: noAnim ? 0 : 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 pb-10"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-3 text-center"
            >
              <p className="text-xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-gray-400 mt-0.5 leading-tight">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </HeroGrid>
  );
}
