'use client';

import { useState } from 'react';
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';
import StartProjectButton from '@/components/StartProjectButton';

interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  try {
    const d = new Date(`${dateStr.split('T')[0]}T12:00:00`);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    return '';
  }
}

const FILTER_CATEGORIES = [
  'Déclaration Préalable',
  'Permis de Construire',
  "Maîtrise d'œuvre",
  'Construction Neuve',
  'Extension et Rénovation',
  'Urbanisme et Réglementation',
  'Espace Pro',
];

function normalize(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

function getCategoryColor(tag: string): { bg: string; text: string } {
  const t = normalize(tag);
  if (t.includes('declaration') || t === 'dp') return { bg: 'bg-blue-100', text: 'text-blue-700' };
  if (t.includes('permis') || t === 'pc') return { bg: 'bg-green-100', text: 'text-green-700' };
  if (t.includes('maitrise') || t.includes('oeuvre')) return { bg: 'bg-purple-100', text: 'text-purple-700' };
  if (t.includes('construction')) return { bg: 'bg-orange-100', text: 'text-orange-700' };
  if (t.includes('extension') || t.includes('renovation')) return { bg: 'bg-teal-100', text: 'text-teal-700' };
  if (t.includes('urbanisme') || t.includes('reglementation')) return { bg: 'bg-yellow-100', text: 'text-yellow-700' };
  if (t.includes('pro') || t.includes('artisan')) return { bg: 'bg-gray-100', text: 'text-gray-700' };
  return { bg: 'bg-[#e8f6fc]', text: 'text-[#29abe2]' };
}

function getPostCategory(tags: string[], title: string): string {
  const combined = [...tags, title].map(normalize).join(' ');
  const has = (kw: string) => combined.includes(normalize(kw));
  const tagExact = (kw: string) => tags.some(t => normalize(t) === kw);

  if (has('declaration') || tagExact('dp')) return 'Déclaration Préalable';
  if (has('permis') || tagExact('pc')) return 'Permis de Construire';
  if (has('maitrise') || has('oeuvre')) return "Maîtrise d'œuvre";
  if (has('construction') || has('RE2020') || has('budget') || has('PTZ') || has('financement') || has('terrain') || has('maison neuve') || has('catalogue')) return 'Construction Neuve';
  if (has('extension') || has('renovation') || has('MaPrimeRenov') || has('CEE') || has('isolation') || has('surelevation') || has('agrandissement')) return 'Extension et Rénovation';
  if (has('urbanisme') || has('reglementation') || has('GIEP') || has('eaux pluviales') || has('lotissement') || has('conformite')) return 'Urbanisme et Réglementation';
  if (has('artisan') || has('pro') || has('BTP') || has('sous-traitance') || has('AutoCAD') || has('croquis')) return 'Espace Pro';
  return '';
}

export default function BlogClient({ posts }: { posts: BlogPostMeta[] }) {
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  const filteredPosts = selectedCategory === 'Tous'
    ? posts
    : posts.filter((p) => getPostCategory(p.tags, p.title) === selectedCategory);

  return (
    <section className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category filter */}
        <AnimatedSection className="mb-10">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('Tous')}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                selectedCategory === 'Tous'
                  ? 'bg-[#29abe2] text-white'
                  : 'border border-gray-300 text-gray-600 hover:border-[#29abe2]'
              }`}
            >
              Tous
            </button>
            {FILTER_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#29abe2] text-white'
                    : 'border border-gray-300 text-gray-600 hover:border-[#29abe2]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-xl">Aucun article pour le moment.</p>
            <p className="mt-2">Revenez bientôt !</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, i) => {
              const category = getPostCategory(post.tags, post.title);
              const color = category ? getCategoryColor(post.tags[0]) : { bg: 'bg-[#e8f6fc]', text: 'text-[#29abe2]' };
              return (
                <AnimatedSection key={post.slug} delay={i * 0.07}>
                  <article className="h-full flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-200 group">
                    <div className="h-1.5 bg-gradient-to-r from-[#29abe2] to-[#1a9fd6]" />
                    <div className="flex flex-col flex-1 p-6">

                      {/* Category badge */}
                      {category && (
                        <span className={`self-start text-xs px-3 py-1 rounded-full font-semibold mb-3 ${color.bg} ${color.text}`}>
                          {category}
                        </span>
                      )}

                      {/* Title */}
                      <Link href={`/blog/${post.slug}`}>
                        <h2 className="font-bold text-[#3d3d3d] text-xl leading-snug group-hover:text-[#29abe2] transition-colors mb-3 line-clamp-2">
                          {post.title}
                        </h2>
                      </Link>

                      {/* Description */}
                      <p className="text-gray-500 text-sm leading-relaxed flex-1 line-clamp-3 mb-5">
                        {post.description}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                        <time className="text-xs text-gray-400">
                          {formatDate(post.date)}
                        </time>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-[#29abe2] text-sm font-semibold hover:underline whitespace-nowrap"
                        >
                          Lire l&apos;article →
                        </Link>
                      </div>

                    </div>
                  </article>
                </AnimatedSection>
              );
            })}
          </div>
        )}

        {/* CTA */}
        <AnimatedSection className="mt-20 bg-white border border-gray-100 rounded-2xl p-10 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-3">Vous avez un projet ?</h2>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            Ces guides vous ont été utiles ? N&apos;hésitez pas à nous contacter pour discuter de votre projet. Premier rendez-vous gratuit.
          </p>
          <StartProjectButton className="inline-flex items-center gap-2 bg-[#29abe2] text-white font-bold px-8 py-3.5 rounded-full hover:bg-[#1a9fd6] transition-all">
            Prendre contact
          </StartProjectButton>
        </AnimatedSection>
      </div>
    </section>
  );
}
