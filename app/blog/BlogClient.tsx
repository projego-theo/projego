'use client';

import { useState } from 'react';
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';
import type { BlogPostMeta } from '@/lib/blog';

// Inline — cannot import from lib/blog.ts in a client component (it uses Node fs)
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

// 7 colors matching the 7 blog categories — consistent per tag name via hash
const PALETTE = [
  { bg: 'bg-blue-100',   text: 'text-blue-700'   }, // déclaration préalable
  { bg: 'bg-green-100',  text: 'text-green-700'  }, // permis de construire
  { bg: 'bg-purple-100', text: 'text-purple-700' }, // maîtrise d'œuvre
  { bg: 'bg-orange-100', text: 'text-orange-700' }, // construction neuve
  { bg: 'bg-teal-100',   text: 'text-teal-700'   }, // extension / rénovation
  { bg: 'bg-rose-100',   text: 'text-rose-700'   }, // urbanisme
  { bg: 'bg-amber-100',  text: 'text-amber-700'  }, // espace pro
];

function tagColor(tag: string) {
  const hash = Array.from(tag).reduce((sum, c) => sum + c.charCodeAt(0), 0);
  return PALETTE[hash % PALETTE.length];
}

export default function BlogClient({ posts }: { posts: BlogPostMeta[] }) {
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));
  const [selectedTag, setSelectedTag] = useState('Tous');

  const filteredPosts = selectedTag === 'Tous'
    ? posts
    : posts.filter((p) => p.tags.includes(selectedTag));

  return (
    <section className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tag filter */}
        <AnimatedSection className="mb-10">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag('Tous')}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                selectedTag === 'Tous'
                  ? 'bg-[#29abe2] text-white'
                  : 'border border-gray-300 text-gray-600 hover:border-[#29abe2]'
              }`}
            >
              Tous
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                  selectedTag === tag
                    ? 'bg-[#29abe2] text-white'
                    : 'border border-gray-300 text-gray-600 hover:border-[#29abe2]'
                }`}
              >
                {tag}
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
              const color = post.tags[0] ? tagColor(post.tags[0]) : PALETTE[0];
              return (
                <AnimatedSection key={post.slug} delay={i * 0.07}>
                  <Link href={`/blog/${post.slug}`} className="group block h-full">
                    <article className="h-full flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-200">
                      <div className="h-1.5 bg-gradient-to-r from-[#29abe2] to-[#1a9fd6]" />
                      <div className="flex flex-col flex-1 p-6">

                        {/* Category badge */}
                        {post.tags[0] && (
                          <span className={`self-start text-xs px-3 py-1 rounded-full font-semibold mb-3 ${color.bg} ${color.text}`}>
                            {post.tags[0]}
                          </span>
                        )}

                        {/* Title */}
                        <h2 className="font-bold text-[#3d3d3d] text-xl leading-snug group-hover:text-[#29abe2] transition-colors mb-3 line-clamp-2">
                          {post.title}
                        </h2>

                        {/* Description (from frontmatter — always clean, never raw markdown) */}
                        <p className="text-gray-500 text-sm leading-relaxed flex-1 line-clamp-3 mb-5">
                          {post.description}
                        </p>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                          <time className="text-xs text-gray-400">
                            {formatDate(post.date)}
                          </time>
                          <span className="text-[#29abe2] text-sm font-semibold group-hover:underline whitespace-nowrap">
                            Lire l&apos;article →
                          </span>
                        </div>

                      </div>
                    </article>
                  </Link>
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
          <Link href="/contact" className="inline-flex items-center gap-2 bg-[#29abe2] text-white font-bold px-8 py-3.5 rounded-full hover:bg-[#1a9fd6] transition-all">
            Prendre contact
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
