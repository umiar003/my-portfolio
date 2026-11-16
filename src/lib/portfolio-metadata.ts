import type { Metadata } from 'next';
import {
  categoryTitle,
  projectHref,
  videoHref,
  thumbnail,
  type Project,
  type Media,
} from './catalogue';

export const siteUrl = 'https://umairvisuals.vercel.app';
export function detailMetadata(project: Project, video?: Media): Metadata {
  const path = video ? videoHref(project, video) : projectHref(project);
  const title = `${video?.title ?? project.title} | Umair Portfolio`;
  const description = (video?.description ?? project.description)
    .replace(/\s+/g, ' ')
    .slice(0, 180);
  const image = video ? thumbnail(video) : new URL(project.cover, siteUrl).href;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: 'Umair Portfolio',
      type: 'website',
      images: [{ url: image, alt: video?.title ?? project.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}
export function galleryMetadata(category?: string): Metadata {
  const title = `${category ? categoryTitle(category) : 'Projects'} | Umair Portfolio`;
  const path = category ? `/projects/category/${category}` : '/projects';
  const description =
    'Explore video editing, motion graphics, ecommerce campaigns, and short-form creative work by Muhammad Umair.';
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: 'website',
      images: [{ url: '/landing-memojis.png' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/landing-memojis.png'],
    },
  };
}
