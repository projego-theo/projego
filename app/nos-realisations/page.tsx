'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';
import PageHero from '@/components/PageHero';
import { PageBackground } from '@/components/PageBackground';
import StartProjectButton from '@/components/StartProjectButton';

type Category = 'Tout' | 'Maisons neuves' | 'Extensions' | 'Rénovations' | 'Aménagements';

const realisations: { img: string; title: string; city: string; year: string; category: Exclude<Category, 'Tout'> }[] = [
  // Maisons neuves
  { img: '/69a577316fe18_ChatGPTImage2mars202612_40_20.png', title: 'Maison neuve', city: 'La Rabatelière', year: '2023', category: 'Maisons neuves' },
  { img: '/69a577618e65c_ChatGPTImage2mars202612_36_08.png', title: 'Maison neuve', city: 'Beaurepaire', year: '2022', category: 'Maisons neuves' },
  { img: '/69a577733d611_ChatGPTImage2mars202612_36_01.png', title: 'Maison neuve', city: 'Beaurepaire', year: '2022', category: 'Maisons neuves' },
  { img: '/69a57673c2a9f_ChatGPTImage2mars202612_36_10.png', title: 'Plan 3D maison neuve', city: 'La Rabatelière', year: '2023', category: 'Maisons neuves' },
  { img: "/maison-neuve-saint-fulgent-2026.png", title: 'Maison neuve · 2 chambres', city: 'Saint-Fulgent', year: '2026', category: 'Maisons neuves' },
  { img: "/maison-neuve-les-herbiers-2026.png", title: 'Maison neuve · 3 chambres', city: 'Les Herbiers', year: '2026', category: 'Maisons neuves' },
  // Extensions
  { img: '/69a5817b3f4ba_ChatGPTImage2mars202612_36_32.png', title: 'Extension + rénovation complète', city: 'Les Herbiers', year: '2022', category: 'Extensions' },
  { img: "/surelevation-challans-2026.png", title: 'Surélévation', city: 'Challans', year: '2026', category: 'Extensions' },
  { img: '/garage-preau-poire-sur-vie-2026.png', title: 'Garage 50m² + préau', city: 'Le Poiré-sur-Vie', year: '2026', category: 'Extensions' },
  // Rénovations
  { img: '/69a577a4ee4a3_ChatGPTImage2mars202612_36_40.png', title: 'Rénovation complète', city: 'Les Herbiers', year: '2025', category: 'Rénovations' },
  { img: '/69a577bc93690_ChatGPTImage2mars202612_36_14.png', title: 'Rénovation → Airbnb', city: 'Saint-Laurent-sur-Sèvre', year: '2020', category: 'Rénovations' },
  { img: '/69a577cd2edf2_ChatGPTImage2mars202612_36_45.png', title: 'Garage poids lourd → Loft', city: 'Les Herbiers', year: '2022', category: 'Rénovations' },
  { img: '/69a577e1b9203_ChatGPTImage2mars202612_36_49.png', title: 'Rénovation + terrasse surélevée', city: 'Les Herbiers', year: '2020', category: 'Rénovations' },
  { img: '/69a5780457d67_ChatGPTImage2mars202612_36_54.png', title: 'Rénovation complète immeuble', city: 'Les Herbiers', year: '2020', category: 'Rénovations' },
  { img: '/69a5782770cb5_ChatGPTImage2mars202612_36_47.png', title: 'Garage → 2 logements + 2 magasins', city: 'Les Herbiers', year: '2020', category: 'Rénovations' },
  // Aménagements
  { img: '/69a5784f3f45f_ChatGPTImage2mars202612_36_37.png', title: 'Rénovation salle de bain', city: 'Les Herbiers', year: '2021', category: 'Aménagements' },
  { img: '/69a5785ea193e_ChatGPTImage2mars202612_36_12.png', title: 'Rénovation cuisine', city: 'Les Herbiers', year: '2024', category: 'Aménagements' },
  { img: '/69a57811ba691_ChatGPTImage2mars202612_36_51.png', title: 'Aménagement combles → suite parentale', city: 'Saint-Jean-de-Monts', year: '2018', category: 'Aménagements' },
];

const categories: Category[] = ['Tout', 'Maisons neuves', 'Extensions', 'Rénovations', 'Aménagements'];

export default function NosRealisationsPage() {
  const [active, setActive] = useState<Category>('Tout');

  const filtered = active === 'Tout' ? realisations : realisations.filter((r) => r.category === active);

  return (
    <>
      <PageBackground />
      <PageHero
        title="Nos Réalisations — Maisons neuves, Extensions, Rénovations en Vendée"
        subtitle="Découvrez quelques-uns de nos projets récents en Vendée et dans les départements limitrophes."
        badge="Portfolio Projego"
        compact
      />

      <section className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter buttons */}
          <AnimatedSection className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  active === cat
                    ? 'bg-[#29abe2] text-white shadow-md'
                    : 'bg-white border border-gray-200 text-[#3d3d3d] hover:bg-[#29abe2]/10 hover:text-[#29abe2]'
                }`}
              >
                {cat}
              </button>
            ))}
          </AnimatedSection>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((r, i) => (
                <motion.div
                  key={r.img}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                >
                  <div className="group relative h-64 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer">
                    <Image
                      src={r.img}
                      alt={`${r.title} — ${r.city}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Default overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-[#29abe2]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white text-center p-6">
                      <p className="font-bold text-lg leading-tight mb-1">{r.title}</p>
                      <p className="text-white/80 text-sm">{r.city} · {r.year}</p>
                      <span className="mt-3 text-xs uppercase tracking-widest font-bold border border-white/50 px-3 py-1 rounded-full">{r.category}</span>
                    </div>
                    {/* Bottom info (always visible) */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 group-hover:opacity-0 transition-opacity duration-300">
                      <p className="text-white font-bold text-sm leading-tight">{r.title}</p>
                      <p className="text-white/70 text-xs">{r.city} · {r.year}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <AnimatedSection className="mt-16 text-center bg-white shadow-sm border border-gray-100 rounded-2xl p-10">
            <h2 className="text-2xl font-bold text-[#3d3d3d] mb-3">Votre projet sera notre prochaine réalisation</h2>
            <p className="text-gray-500 mb-6">Décrivez-nous votre projet, nous vous proposons une étude de faisabilité gratuite.</p>
            <StartProjectButton className="inline-flex items-center gap-2 bg-[#29abe2] text-white font-bold px-8 py-3.5 rounded-full hover:bg-[#1a9fd6] transition-all">
              Démarrer mon projet
            </StartProjectButton>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
