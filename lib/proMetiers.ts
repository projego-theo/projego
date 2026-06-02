export interface Metier {
  slug: string;
  name: string;
  dpProjects: string[];
  pcProjects: string[];
  planProjects: string[];
}

export const metiers: Metier[] = [
  {
    slug: 'menuisier',
    name: 'Menuisier',
    dpProjects: ['pergola', 'véranda', 'carport', 'abri de jardin', 'clôture bois'],
    pcProjects: ['extension véranda > 20 m²', 'agrandissement avec modification structure'],
    planProjects: ['croquis de pergola en plan professionnel', 'plan de véranda', 'élévations façades modifiées'],
  },
  {
    slug: 'pisciniste',
    name: 'Pisciniste',
    dpProjects: ['piscine hors-sol < 100 m²', 'abri de piscine', 'local technique', 'pool-house < 20 m²'],
    pcProjects: ['piscine couverte > 100 m²', 'complexe aquatique', 'pool-house > 20 m²'],
    planProjects: ['plan de masse avec implantation piscine', 'insertion graphique', 'plan de situation'],
  },
  {
    slug: 'paysagiste',
    name: 'Paysagiste',
    dpProjects: ['clôture', 'portail', 'terrasse surélevée > 0,60 m', 'pergola', 'abri de jardin'],
    pcProjects: ['pool-house', 'abri de jardin > 20 m²', 'local de stockage'],
    planProjects: ['plan d\'aménagement paysager', 'plan de masse', 'plan de situation cadastral'],
  },
  {
    slug: 'macon',
    name: 'Maçon',
    dpProjects: ['extension < 40 m²', 'modification de façade', 'ravalement avec changement aspect', 'mur de clôture'],
    pcProjects: ['extension > 40 m²', 'surélévation', 'maison neuve', 'changement de destination'],
    planProjects: ['plans d\'extension cotés', 'coupes verticales', 'plans de façades', 'plan de masse 3D'],
  },
  {
    slug: 'peintre',
    name: 'Peintre',
    dpProjects: ['ravalement modifiant l\'aspect extérieur', 'changement de couleur de façade en zone réglementée'],
    pcProjects: ['changement de destination avec modification de structure'],
    planProjects: ['plan de façades avant/après', 'document graphique d\'insertion'],
  },
  {
    slug: 'plombier',
    name: 'Plombier',
    dpProjects: ['local technique piscine', 'abri pompe à chaleur', 'extension local technique < 5 m²'],
    pcProjects: ['extension buanderie ou chaufferie > 20 m²', 'local commercial'],
    planProjects: ['plan technique simplifié', 'coupe du bâtiment', 'plan de masse'],
  },
  {
    slug: 'electricien',
    name: 'Électricien',
    dpProjects: ['local technique ou armoire électrique extérieure', 'abri compteur', 'carport avec borne de recharge'],
    pcProjects: ['local commercial ou industriel', 'bâtiment technique'],
    planProjects: ['plan de situation', 'plan de masse', 'coupe simplifiée'],
  },
  {
    slug: 'charpentier',
    name: 'Charpentier',
    dpProjects: ['modification de toiture', 'fenêtre de toit (vélux)', 'extension ossature bois < 40 m²', 'carport'],
    pcProjects: ['surélévation avec charpente', 'transformation de combles en surface habitable', 'extension > 40 m²'],
    planProjects: ['plan de toiture coté', 'coupe charpente', 'plan de façades', 'document graphique'],
  },
  {
    slug: 'couvreur',
    name: 'Couvreur',
    dpProjects: ['modification aspect de toiture', 'changement de matériaux ou couleur de couverture', 'fenêtre de toit'],
    pcProjects: ['surélévation modifiant le volume', 'extension avec modification toiture > 40 m²'],
    planProjects: ['plan de toiture existant et projeté', 'façades modifiées', 'document graphique insertion'],
  },
];

export type ProService = 'declaration-prealable' | 'permis-de-construire' | 'plans-pro';

export const proServices: Array<{ slug: ProService; name: string; delay: string }> = [
  { slug: 'declaration-prealable', name: 'Déclaration Préalable', delay: '24-48h' },
  { slug: 'permis-de-construire', name: 'Permis de Construire', delay: '48-72h' },
  { slug: 'plans-pro', name: 'Plans AutoCAD', delay: '48h' },
];

export interface ProPage {
  slug: string; // e.g. "declaration-prealable-menuisier"
  service: ProService;
  serviceName: string;
  metier: Metier;
}

export const proPages: ProPage[] = proServices.flatMap((service) =>
  metiers.map((metier) => ({
    slug: `${service.slug}-${metier.slug}`,
    service: service.slug,
    serviceName: service.name,
    metier,
  }))
);

export function getProPageBySlug(slug: string): ProPage | undefined {
  return proPages.find((p) => p.slug === slug);
}
