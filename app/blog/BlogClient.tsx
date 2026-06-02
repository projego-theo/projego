'use client';

import { useState } from 'react';
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';
import type { BlogPostMeta } from '@/lib/blog';

export default function BlogClient({ posts }: { posts: BlogPostMeta[] }) {
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));
  const [selectedTag, setSelectedTag] = useState('Tous');

  const filteredPosts = selectedTag === 'Tous'
    ? posts
    : posts.filter((p) => p.tags.includes(selectedTag));

  return (
    <section className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tags filter */}
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
            {filteredPosts.map((post, i) => (
              <AnimatedSection key={post.slug} delay={i * 0.07}>
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <article className="h-full border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all">
                    <div className="h-2 bg-gradient-to-r from-[#29abe2] to-[#1a9fd6]" />
                    <div className="p-7">
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {post.tags.map((tag) => (
                          <span key={tag} className="text-xs bg-[#29abe2]/10 text-[#29abe2] px-2.5 py-0.5 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h2 className="font-bold text-[#3d3d3d] text-lg group-hover:text-[#29abe2] transition-colors mb-3 line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-4 mb-5">
                        {post.description}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <time className="text-xs text-gray-400">
                          {new Date(post.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </time>
                        <span className="text-[#29abe2] text-sm font-semibold group-hover:underline">Lire →</span>
                      </div>
                    </div>
                  </article>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        )}

        {/* CTA */}
        <AnimatedSection className="mt-20 bg-white border border-gray-100 rounded-2xl p-10 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-3">Vous avez un projet ?</h2>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">Ces guides vous ont été utiles ? N&apos;hésitez pas à nous contacter pour discuter de votre projet. Premier rendez-vous gratuit.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-[#29abe2] text-white font-bold px-8 py-3.5 rounded-full hover:bg-[#1a9fd6] transition-all">
            Prendre contact
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
