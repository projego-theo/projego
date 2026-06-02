export interface FranceVille {
  slug: string;
  name: string;
  department: string;
  deptCode: string;
  region: string;
  population: number;
}

export const franceVilles: FranceVille[] = [
  { slug: 'paris', name: 'Paris', department: 'Paris', deptCode: '75', region: 'Île-de-France', population: 2161000 },
  { slug: 'lyon', name: 'Lyon', department: 'Rhône', deptCode: '69', region: 'Auvergne-Rhône-Alpes', population: 522000 },
  { slug: 'marseille', name: 'Marseille', department: 'Bouches-du-Rhône', deptCode: '13', region: 'Provence-Alpes-Côte d\'Azur', population: 870000 },
  { slug: 'toulouse', name: 'Toulouse', department: 'Haute-Garonne', deptCode: '31', region: 'Occitanie', population: 486000 },
  { slug: 'nice', name: 'Nice', department: 'Alpes-Maritimes', deptCode: '06', region: 'Provence-Alpes-Côte d\'Azur', population: 342000 },
  { slug: 'nantes', name: 'Nantes', department: 'Loire-Atlantique', deptCode: '44', region: 'Pays de la Loire', population: 314000 },
  { slug: 'montpellier', name: 'Montpellier', department: 'Hérault', deptCode: '34', region: 'Occitanie', population: 295000 },
  { slug: 'strasbourg', name: 'Strasbourg', department: 'Bas-Rhin', deptCode: '67', region: 'Grand Est', population: 284000 },
  { slug: 'bordeaux', name: 'Bordeaux', department: 'Gironde', deptCode: '33', region: 'Nouvelle-Aquitaine', population: 257000 },
  { slug: 'lille', name: 'Lille', department: 'Nord', deptCode: '59', region: 'Hauts-de-France', population: 233000 },
  { slug: 'rennes', name: 'Rennes', department: 'Ille-et-Vilaine', deptCode: '35', region: 'Bretagne', population: 221000 },
  { slug: 'reims', name: 'Reims', department: 'Marne', deptCode: '51', region: 'Grand Est', population: 183000 },
  { slug: 'le-havre', name: 'Le Havre', department: 'Seine-Maritime', deptCode: '76', region: 'Normandie', population: 172000 },
  { slug: 'saint-etienne', name: 'Saint-Étienne', department: 'Loire', deptCode: '42', region: 'Auvergne-Rhône-Alpes', population: 171000 },
  { slug: 'toulon', name: 'Toulon', department: 'Var', deptCode: '83', region: 'Provence-Alpes-Côte d\'Azur', population: 170000 },
  { slug: 'grenoble', name: 'Grenoble', department: 'Isère', deptCode: '38', region: 'Auvergne-Rhône-Alpes', population: 160000 },
  { slug: 'dijon', name: 'Dijon', department: 'Côte-d\'Or', deptCode: '21', region: 'Bourgogne-Franche-Comté', population: 157000 },
  { slug: 'angers', name: 'Angers', department: 'Maine-et-Loire', deptCode: '49', region: 'Pays de la Loire', population: 156000 },
  { slug: 'nimes', name: 'Nîmes', department: 'Gard', deptCode: '30', region: 'Occitanie', population: 154000 },
  { slug: 'villeurbanne', name: 'Villeurbanne', department: 'Rhône', deptCode: '69', region: 'Auvergne-Rhône-Alpes', population: 150000 },
  { slug: 'le-mans', name: 'Le Mans', department: 'Sarthe', deptCode: '72', region: 'Pays de la Loire', population: 147000 },
  { slug: 'aix-en-provence', name: 'Aix-en-Provence', department: 'Bouches-du-Rhône', deptCode: '13', region: 'Provence-Alpes-Côte d\'Azur', population: 143000 },
  { slug: 'clermont-ferrand', name: 'Clermont-Ferrand', department: 'Puy-de-Dôme', deptCode: '63', region: 'Auvergne-Rhône-Alpes', population: 141000 },
  { slug: 'brest', name: 'Brest', department: 'Finistère', deptCode: '29', region: 'Bretagne', population: 140000 },
  { slug: 'tours', name: 'Tours', department: 'Indre-et-Loire', deptCode: '37', region: 'Centre-Val de Loire', population: 136000 },
  { slug: 'amiens', name: 'Amiens', department: 'Somme', deptCode: '80', region: 'Hauts-de-France', population: 136000 },
  { slug: 'limoges', name: 'Limoges', department: 'Haute-Vienne', deptCode: '87', region: 'Nouvelle-Aquitaine', population: 131000 },
  { slug: 'perpignan', name: 'Perpignan', department: 'Pyrénées-Orientales', deptCode: '66', region: 'Occitanie', population: 121000 },
  { slug: 'metz', name: 'Metz', department: 'Moselle', deptCode: '57', region: 'Grand Est', population: 117000 },
  { slug: 'besancon', name: 'Besançon', department: 'Doubs', deptCode: '25', region: 'Bourgogne-Franche-Comté', population: 116000 },
  { slug: 'orleans', name: 'Orléans', department: 'Loiret', deptCode: '45', region: 'Centre-Val de Loire', population: 114000 },
  { slug: 'rouen', name: 'Rouen', department: 'Seine-Maritime', deptCode: '76', region: 'Normandie', population: 111000 },
  { slug: 'mulhouse', name: 'Mulhouse', department: 'Haut-Rhin', deptCode: '68', region: 'Grand Est', population: 110000 },
  { slug: 'caen', name: 'Caen', department: 'Calvados', deptCode: '14', region: 'Normandie', population: 105000 },
  { slug: 'nancy', name: 'Nancy', department: 'Meurthe-et-Moselle', deptCode: '54', region: 'Grand Est', population: 104000 },
  { slug: 'saint-denis', name: 'Saint-Denis', department: 'Seine-Saint-Denis', deptCode: '93', region: 'Île-de-France', population: 111000 },
  { slug: 'argenteuil', name: 'Argenteuil', department: 'Val-d\'Oise', deptCode: '95', region: 'Île-de-France', population: 110000 },
  { slug: 'montreuil', name: 'Montreuil', department: 'Seine-Saint-Denis', deptCode: '93', region: 'Île-de-France', population: 109000 },
  { slug: 'roubaix', name: 'Roubaix', department: 'Nord', deptCode: '59', region: 'Hauts-de-France', population: 96000 },
  { slug: 'dunkerque', name: 'Dunkerque', department: 'Nord', deptCode: '59', region: 'Hauts-de-France', population: 90000 },
  { slug: 'avignon', name: 'Avignon', department: 'Vaucluse', deptCode: '84', region: 'Provence-Alpes-Côte d\'Azur', population: 93000 },
  { slug: 'poitiers', name: 'Poitiers', department: 'Vienne', deptCode: '86', region: 'Nouvelle-Aquitaine', population: 89000 },
  { slug: 'versailles', name: 'Versailles', department: 'Yvelines', deptCode: '78', region: 'Île-de-France', population: 86000 },
  { slug: 'la-rochelle', name: 'La Rochelle', department: 'Charente-Maritime', deptCode: '17', region: 'Nouvelle-Aquitaine', population: 78000 },
  { slug: 'pau', name: 'Pau', department: 'Pyrénées-Atlantiques', deptCode: '64', region: 'Nouvelle-Aquitaine', population: 77000 },
  { slug: 'colmar', name: 'Colmar', department: 'Haut-Rhin', deptCode: '68', region: 'Grand Est', population: 68000 },
  { slug: 'quimper', name: 'Quimper', department: 'Finistère', deptCode: '29', region: 'Bretagne', population: 64000 },
  { slug: 'bayonne', name: 'Bayonne', department: 'Pyrénées-Atlantiques', deptCode: '64', region: 'Nouvelle-Aquitaine', population: 54000 },
  { slug: 'troyes', name: 'Troyes', department: 'Aube', deptCode: '10', region: 'Grand Est', population: 60000 },
  { slug: 'chartres', name: 'Chartres', department: 'Eure-et-Loir', deptCode: '28', region: 'Centre-Val de Loire', population: 38000 },
];

export function getFranceVilleBySlug(slug: string): FranceVille | undefined {
  return franceVilles.find((v) => v.slug === slug);
}
