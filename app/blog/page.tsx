import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import { PageBackground } from '@/components/PageBackground';
import { getAllPostsMeta } from '@/lib/blog';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
  title: 'Blog — Conseils travaux, permis et urbanisme',
  description: "Retrouvez tous nos conseils sur les déclarations préalables, permis de construire, règles d'urbanisme et maîtrise d'œuvre.",
  openGraph: {
    title: 'Blog — Conseils travaux, permis et urbanisme | Projego',
    description: "Retrouvez tous nos conseils sur les déclarations préalables, permis de construire, règles d'urbanisme et maîtrise d'œuvre.",
    url: 'https://www.projego.fr/blog',
    type: 'website',
  },
};

export default function BlogPage() {
  const posts = getAllPostsMeta();

  return (
    <>
      <PageBackground />
      <PageHero
        title="Blog & Guides pratiques"
        subtitle="Déclaration préalable, permis de construire, maîtrise d'œuvre, réglementation... Tous nos conseils pour comprendre vos projets de construction."
        badge="Ressources"
        compact
      />
      <BlogClient posts={posts} />
    </>
  );
}
