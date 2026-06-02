import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Espace Pro — DP, PC et Plans AutoCAD',
  description:
    "Artisans du BTP : déléguez vos déclarations préalables, permis de construire et transformation de croquis en plans professionnels AutoCAD.",
  openGraph: {
    title: 'Espace Partenaires Pro — Déléguez vos DP, PC et Plans | Projego',
    description: "Artisans du BTP : déléguez vos déclarations préalables, permis de construire et transformation de croquis en plans professionnels AutoCAD.",
    url: 'https://www.projego.fr/espace-pro',
    type: 'website',
  },
};

export default function EspaceProLayout({ children }: { children: React.ReactNode }) {
  return children;
}
