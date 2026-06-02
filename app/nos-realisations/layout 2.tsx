import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'Réalisations — Projego Vendée' },
  description: "Découvrez les réalisations Projego : maisons neuves, extensions, surélévations et rénovations en Vendée depuis 2019.",
  openGraph: {
    title: 'Nos Réalisations — Maisons neuves, Extensions, Rénovations | Projego',
    description: "Découvrez les réalisations Projego : maisons neuves, extensions, surélévations et rénovations en Vendée depuis 2019.",
    url: 'https://www.projego.fr/nos-realisations',
    type: 'website',
  },
};

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Réalisations Projego — Vendée',
  description: 'Sélection de projets réalisés par Projego en Vendée depuis 2019.',
  numberOfItems: 18,
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Maison neuve à La Rabatelière (2023)' },
    { '@type': 'ListItem', position: 2, name: 'Maison neuve à Beaurepaire (2022)' },
    { '@type': 'ListItem', position: 3, name: 'Maison neuve à Saint-Fulgent (2026)' },
    { '@type': 'ListItem', position: 4, name: 'Maison neuve aux Herbiers (2026)' },
    { '@type': 'ListItem', position: 5, name: 'Extension et rénovation aux Herbiers (2022)' },
    { '@type': 'ListItem', position: 6, name: 'Surélévation à Challans (2026)' },
    { '@type': 'ListItem', position: 7, name: 'Garage 50m² et préau au Poiré-sur-Vie (2026)' },
    { '@type': 'ListItem', position: 8, name: 'Rénovation complète aux Herbiers (2025)' },
    { '@type': 'ListItem', position: 9, name: 'Rénovation Airbnb à Saint-Laurent-sur-Sèvre (2020)' },
    { '@type': 'ListItem', position: 10, name: 'Garage poids lourd transformé en loft aux Herbiers (2022)' },
    { '@type': 'ListItem', position: 11, name: 'Rénovation avec terrasse surélevée aux Herbiers (2020)' },
    { '@type': 'ListItem', position: 12, name: 'Rénovation complète immeuble aux Herbiers (2020)' },
    { '@type': 'ListItem', position: 13, name: 'Aménagement combles en suite parentale à Saint-Jean-de-Monts (2018)' },
  ],
};

export default function NosRealisationsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      {children}
    </>
  );
}
