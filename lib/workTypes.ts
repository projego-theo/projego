export interface DpType {
  slug: string;
  name: string;
  description: string;
  keywords: string[];
}

export interface PcType {
  slug: string;
  name: string;
  description: string;
  keywords: string[];
}

export const dpTypes: DpType[] = [
  {
    slug: 'piscine',
    name: 'Piscine',
    description: 'Déclaration préalable pour piscine de 10 à 100 m² non couverte',
    keywords: ['déclaration préalable piscine', 'DP piscine', 'piscine hors-sol permis'],
  },
  {
    slug: 'cloture',
    name: 'Clôture',
    description: 'Déclaration préalable pour clôture, portail ou mur de séparation',
    keywords: ['déclaration préalable clôture', 'DP clôture portail', 'autorisation clôture'],
  },
  {
    slug: 'abri-de-jardin',
    name: 'Abri de jardin',
    description: 'Déclaration préalable pour abri de jardin de 5 à 20 m²',
    keywords: ['déclaration préalable abri jardin', 'DP abri de jardin'],
  },
  {
    slug: 'pergola',
    name: 'Pergola',
    description: 'Déclaration préalable pour pergola, tonnelle ou treille de plus de 5 m²',
    keywords: ['déclaration préalable pergola', 'DP pergola', 'permis pergola'],
  },
  {
    slug: 'carport',
    name: 'Carport',
    description: 'Déclaration préalable pour carport, abri voiture ou garage ouvert',
    keywords: ['déclaration préalable carport', 'DP carport', 'autorisation carport'],
  },
  {
    slug: 'veranda',
    name: 'Véranda',
    description: 'Déclaration préalable pour véranda de moins de 40 m²',
    keywords: ['déclaration préalable véranda', 'DP véranda', 'autorisation véranda'],
  },
  {
    slug: 'extension',
    name: 'Extension < 40 m²',
    description: 'Déclaration préalable pour extension ou agrandissement jusqu\'à 40 m²',
    keywords: ['déclaration préalable extension', 'DP extension maison', 'agrandissement déclaration'],
  },
  {
    slug: 'ravalement',
    name: 'Ravalement de façade',
    description: 'Déclaration préalable pour ravalement modifiant l\'aspect extérieur du bâtiment',
    keywords: ['déclaration préalable ravalement', 'DP ravalement façade'],
  },
  {
    slug: 'changement-fenetre',
    name: 'Changement de fenêtres',
    description: 'Déclaration préalable pour modification de l\'aspect extérieur par changement de menuiseries',
    keywords: ['déclaration préalable fenêtre', 'DP changement fenêtre'],
  },
  {
    slug: 'portail',
    name: 'Portail',
    description: 'Déclaration préalable pour portail, portillon ou accès',
    keywords: ['déclaration préalable portail', 'DP portail', 'autorisation portail'],
  },
];

export const pcTypes: PcType[] = [
  {
    slug: 'extension',
    name: 'Extension > 40 m²',
    description: 'Permis de construire pour agrandissement de plus de 40 m²',
    keywords: ['permis de construire extension', 'PC extension maison'],
  },
  {
    slug: 'maison-neuve',
    name: 'Maison neuve',
    description: 'Permis de construire pour construction d\'une maison individuelle neuve',
    keywords: ['permis de construire maison neuve', 'PC construction maison'],
  },
  {
    slug: 'surelevation',
    name: 'Surélévation',
    description: 'Permis de construire pour ajout d\'un étage ou rehaussement du bâtiment',
    keywords: ['permis de construire surélévation', 'PC surélévation maison'],
  },
  {
    slug: 'garage',
    name: 'Garage > 20 m²',
    description: 'Permis de construire pour garage fermé de plus de 20 m² d\'emprise',
    keywords: ['permis de construire garage', 'PC construction garage'],
  },
  {
    slug: 'pool-house',
    name: 'Pool-house',
    description: 'Permis de construire pour pool-house ou local piscine couvert',
    keywords: ['permis de construire pool house', 'PC pool-house piscine'],
  },
  {
    slug: 'transformation-combles',
    name: 'Transformation de combles',
    description: 'Permis de construire pour aménagement et surélévation de combles habitables',
    keywords: ['permis de construire combles', 'PC aménagement combles'],
  },
];

export function getDpTypeBySlug(slug: string): DpType | undefined {
  return dpTypes.find((t) => t.slug === slug);
}

export function getPcTypeBySlug(slug: string): PcType | undefined {
  return pcTypes.find((t) => t.slug === slug);
}
