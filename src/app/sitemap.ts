/**
 * SITEMAP DINÂMICO - Gerado automaticamente para SEO
 */

import { MetadataRoute } from 'next';
import { getPublishedPosts } from '@/lib/db/posts';

const BASE_URL = 'https://studioamendollanoivas.com.br';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedPosts();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/servicos`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];

  const postPages: MetadataRoute.Sitemap = posts.map(post => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...postPages];
}
