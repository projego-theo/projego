import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllPostSlugs, getPostBySlug, getAllPostsMeta } from '@/lib/blog';

interface Params {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllPostsMeta();
  const related = allPosts.filter((p) => p.slug !== slug && p.tags.some((t) => post.tags.includes(t))).slice(0, 3);

  return (
    <div className="pt-24 pb-20 bg-transparent min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-[#29abe2] transition-colors">Accueil</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-[#29abe2] transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-[#3d3d3d] line-clamp-1">{post.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs bg-[#29abe2]/10 text-[#29abe2] px-3 py-1 rounded-full font-semibold">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#3d3d3d] leading-tight mb-4">{post.title}</h1>
          <p className="text-gray-500 text-lg leading-relaxed mb-4">{post.description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-400 border-t border-gray-100 pt-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#29abe2] rounded-full flex items-center justify-center text-white font-bold text-xs">P</div>
              <span>Équipe Projego</span>
            </div>
            <span>·</span>
            <time>{new Date(post.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
          </div>
        </header>

        {/* Content */}
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {/* CTA inline */}
        <div className="mt-12 bg-[#3d3d3d] rounded-2xl p-8 text-white text-center">
          <h2 className="text-xl font-bold mb-2">Vous avez un projet ?</h2>
          <p className="text-gray-300 text-sm mb-5">Contactez Projego pour une étude de faisabilité gratuite. Réponse sous 24h.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-[#29abe2] text-white font-bold px-7 py-3 rounded-full hover:bg-[#1a9fd6] transition-all text-sm">
            Nous contacter
          </Link>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold text-[#3d3d3d] mb-6">Articles liés</h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="group block border border-gray-100 rounded-xl p-5 hover:shadow-md transition-all">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {p.tags.slice(0, 1).map((t) => (
                      <span key={t} className="text-xs bg-[#29abe2]/10 text-[#29abe2] px-2 py-0.5 rounded-full">{t}</span>
                    ))}
                  </div>
                  <h3 className="text-sm font-semibold text-[#3d3d3d] group-hover:text-[#29abe2] transition-colors line-clamp-2">{p.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 pt-6 border-t border-gray-100">
          <Link href="/blog" className="text-[#29abe2] font-semibold text-sm hover:text-[#1a9fd6] transition-colors">
            ← Retour au blog
          </Link>
        </div>
      </div>
    </div>
  );
}
