import type { Metadata } from 'next';
import { PageBackground } from '@/components/PageBackground';
import AutoOpen from './AutoOpen';

export const metadata: Metadata = {
  title: 'Démarrer mon projet — Permis de construire & démarches administratives | Projego',
  description:
    'Qualifiez votre projet en quelques étapes : commune, type de travaux, autorisation nécessaire. Projego gère votre permis de construire ou déclaration préalable en 24-72h.',
  openGraph: {
    title: 'Démarrer mon projet — Projego',
    description:
      'Qualifiez votre projet de construction ou rénovation. Permis de construire ou déclaration préalable, Projego gère tout en 24-72h.',
    url: 'https://www.projego.fr/demarrer-mon-projet',
    type: 'website',
  },
};

export default function DemarrerMonProjetPage() {
  return (
    <>
      <PageBackground />
      <AutoOpen />
    </>
  );
}
