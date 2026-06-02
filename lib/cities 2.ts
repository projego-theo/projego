export interface City {
  name: string;
  slug: string;
  department: string;
  region: string;
}

export function toSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

const cityNames = [
  'Les Herbiers',
  'Cholet',
  'Montaigu',
  'La Roche-sur-Yon',
  'Bressuire',
  'Saint-Fulgent',
  'Mortagne-sur-Sèvre',
  'Tiffauges',
  'Mallièvre',
  'Saint-Laurent-sur-Sèvre',
  'La Verrie',
  'Mouchamps',
  'Réaumur',
  'Les Épesses',
  'Vendrennes',
  'Chavagnes-en-Paillers',
  'Saint-Malo-du-Bois',
  'Beaurepaire',
  'Rocheservière',
  'Bazoges-en-Paillers',
  "Saint-André-Goule-d'Oie",
  'Cugand',
  'Boufféré',
  'Saint-Georges-de-Montaigu',
  'La Boissière-de-Montaigu',
  'Treize-Septiers',
  'Le Boupère',
  'Saint-Michel-Mont-Mercure',
  'La Gaubretière',
  'Gesté',
  'Clisson',
  'Torfou',
  'Tillières',
  'Saint-Philbert-de-Bouaine',
  'Legé',
  'Palluau',
  'La Ferrière',
  'Saint-Sulpice-le-Verdon',
  'Chantonnay',
  'Saint-Prouant',
  'Sainte-Cécile',
  'Pouzauges',
  'Cheffois',
  'Mouilleron-en-Pareds',
  'Saint-Mars-la-Réorthe',
  'Treize-Vents',
  'Chambretaud',
  'La Flocellière',
];

export const cities: City[] = cityNames.map((name) => ({
  name,
  slug: toSlug(name),
  department: 'Vendée (85)',
  region: 'Pays de la Loire',
}));

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}
