import { MetadataRoute } from 'next';
import { cities } from '@/lib/cities';
import { getAllPostsMeta } from '@/lib/blog';
import { franceVilles } from '@/lib/franceVilles';
import { departements } from '@/lib/departements';
import { proPages } from '@/lib/proMetiers';
import { dpTypes, pcTypes } from '@/lib/workTypes';

const BASE_URL = 'https://www.projego.fr';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/declaration-prealable`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/permis-de-construire`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/maitrise-oeuvre`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/construction-maison-neuve`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/extension-maison`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/renovation-maison`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/suivi-de-chantier`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/espace-pro`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/nos-realisations`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${BASE_URL}/a-propos`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${BASE_URL}/mentions-legales`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE_URL}/politique-confidentialite`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ];

  const blogPosts: MetadataRoute.Sitemap = getAllPostsMeta().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  // Vendée cities (existing)
  const vendeePages: MetadataRoute.Sitemap = cities.flatMap((city) => [
    { url: `${BASE_URL}/villes/${city.slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE_URL}/declaration-prealable/${city.slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/permis-de-construire/${city.slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/maitrise-oeuvre/${city.slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE_URL}/extension-maison/${city.slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE_URL}/construction-maison-neuve/${city.slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
  ]);

  // 50 grandes villes françaises
  const grandesVillesPages: MetadataRoute.Sitemap = franceVilles.flatMap((v) => [
    { url: `${BASE_URL}/declaration-prealable/ville-france/${v.slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/permis-de-construire/ville-france/${v.slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 },
  ]);

  // 96 départements
  const deptPages: MetadataRoute.Sitemap = departements.flatMap((d) => [
    { url: `${BASE_URL}/declaration-prealable/departement/${d.slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE_URL}/permis-de-construire/departement/${d.slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
  ]);

  // Pro pages (27)
  const proPagesList: MetadataRoute.Sitemap = proPages.map((p) => ({
    url: `${BASE_URL}/pro/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // DP types (10) + PC types (6)
  const typePages: MetadataRoute.Sitemap = [
    ...dpTypes.map((t) => ({ url: `${BASE_URL}/declaration-prealable/type/${t.slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 })),
    ...pcTypes.map((t) => ({ url: `${BASE_URL}/permis-de-construire/type/${t.slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 })),
  ];

  // DP type × ville (500) + PC type × ville (300)
  const typeVillePages: MetadataRoute.Sitemap = [
    ...dpTypes.flatMap((t) =>
      franceVilles.map((v) => ({
        url: `${BASE_URL}/declaration-prealable/type/${t.slug}/${v.slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      }))
    ),
    ...pcTypes.flatMap((t) =>
      franceVilles.map((v) => ({
        url: `${BASE_URL}/permis-de-construire/type/${t.slug}/${v.slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      }))
    ),
  ];

  return [
    ...staticPages,
    ...blogPosts,
    ...vendeePages,
    ...grandesVillesPages,
    ...deptPages,
    ...proPagesList,
    ...typePages,
    ...typeVillePages,
  ];
}
