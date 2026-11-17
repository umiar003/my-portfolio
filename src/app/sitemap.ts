import type { MetadataRoute } from 'next';
import {
  projects,
  categories,
  projectHref,
  videoHref,
  categoryHref,
} from '@/lib/catalogue';
import { siteUrl } from '@/lib/portfolio-metadata';
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    '/',
    '/projects',
    ...categories.map((c) => categoryHref(c.id)),
    ...projects.flatMap((p) => [
      projectHref(p),
      ...p.media.filter((m) => m.type === 'video').map((m) => videoHref(p, m)),
    ]),
  ].map((path) => ({ url: new URL(path, siteUrl).href }));
}
