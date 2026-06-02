export interface CityDetail {
  slug: string;
  mairie: string;
  typicalProjects: string[];
  localContext: string;
  distanceFromHerbiers: number;
}

const cityDetailsData: CityDetail[] = [
  {
    slug: 'les-herbiers',
    mairie: 'Mairie des Herbiers',
    typicalProjects: ['maison neuve', 'extension', 'piscine', 'pergola', 'surélévation'],
    localContext: "Chef-lieu du bocage vendéen et ville la plus peuplée du secteur, Les Herbiers connaît une forte activité de construction résidentielle.",
    distanceFromHerbiers: 0,
  },
  {
    slug: 'cholet',
    mairie: 'Mairie de Cholet',
    typicalProjects: ['maison neuve', 'extension', 'rénovation', 'permis de construire'],
    localContext: "Grande ville Maine-et-Loire limitrophe de la Vendée, Cholet est un bassin de vie dynamique avec de nombreux projets de construction et rénovation.",
    distanceFromHerbiers: 25,
  },
  {
    slug: 'montaigu',
    mairie: 'Mairie de Montaigu-Vendée',
    typicalProjects: ['maison neuve', 'extension', 'piscine', 'clôture', 'garage'],
    localContext: "Montaigu-Vendée est l'une des communes les plus dynamiques du département, avec une forte croissance démographique et de nombreux lotissements en développement.",
    distanceFromHerbiers: 22,
  },
  {
    slug: 'la-roche-sur-yon',
    mairie: 'Mairie de La Roche-sur-Yon',
    typicalProjects: ['permis de construire', 'déclaration préalable', 'rénovation', 'extension'],
    localContext: "Préfecture de Vendée, La Roche-sur-Yon est le centre administratif et économique du département, avec une activité de construction soutenue.",
    distanceFromHerbiers: 38,
  },
  {
    slug: 'bressuire',
    mairie: 'Mairie de Bressuire',
    typicalProjects: ['maison neuve', 'extension', 'surélévation', 'rénovation'],
    localContext: "Sous-préfecture des Deux-Sèvres, Bressuire est un pôle d'attractivité pour le bocage bressuirais avec de nombreux projets de construction individuelle.",
    distanceFromHerbiers: 30,
  },
  {
    slug: 'saint-fulgent',
    mairie: 'Mairie de Saint-Fulgent',
    typicalProjects: ['maison neuve', 'piscine', 'pergola', 'extension', 'abri de jardin'],
    localContext: "Commune rurale prisée entre Les Herbiers et Montaigu, Saint-Fulgent attire de nombreuses familles pour des projets de construction en terrain disponible.",
    distanceFromHerbiers: 10,
  },
  {
    slug: 'beaurepaire',
    mairie: 'Mairie de Beaurepaire',
    typicalProjects: ['maison neuve', 'extension', 'piscine', 'rénovation', 'permis de construire'],
    localContext: "Siège social de Projego, Beaurepaire est une commune en plein essor résidentiel, idéalement située entre Les Herbiers et Montaigu.",
    distanceFromHerbiers: 12,
  },
  {
    slug: 'pouzauges',
    mairie: 'Mairie de Pouzauges',
    typicalProjects: ['maison neuve', 'rénovation', 'extension', 'surélévation'],
    localContext: "Située en pays de Pouzauges, cette commune du haut bocage vendéen est appréciée pour ses grandes parcelles et son cadre naturel propice aux projets d'habitat individuel.",
    distanceFromHerbiers: 18,
  },
  {
    slug: 'chantonnay',
    mairie: 'Mairie de Chantonnay',
    typicalProjects: ['maison neuve', 'extension', 'piscine', 'clôture', 'carport'],
    localContext: "Carrefour du sud Vendée, Chantonnay est une commune en développement avec de nombreux nouveaux lotissements et projets de construction individuelle.",
    distanceFromHerbiers: 20,
  },
  {
    slug: 'clisson',
    mairie: 'Mairie de Clisson',
    typicalProjects: ['rénovation', 'extension', 'permis de construire', 'déclaration préalable'],
    localContext: "Ville d'art et d'histoire à l'architecture italianisante unique, Clisson est soumise à des règles d'urbanisme strictes, notamment autour des monuments historiques.",
    distanceFromHerbiers: 28,
  },
];

const cityDetailsBySlug = Object.fromEntries(cityDetailsData.map((c) => [c.slug, c]));

export function getCityDetail(slug: string): CityDetail | undefined {
  return cityDetailsBySlug[slug];
}
