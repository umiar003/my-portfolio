import records from '../data/projects.json';

export const categories = [
  { id: 'youtube-videos', title: 'Youtube Videos' },
  { id: 'reels-shorts', title: 'Reels/Shorts' },
  { id: 'ecommerce', title: 'Ecommerce' },
] as const;

export const industryLabels: Record<string, string> = {
  business: 'Business',
  finance: 'Finance',
  entertainment: 'Entertainment',
  'health-wellness': 'Health & wellness',
  education: 'Education',
  nature: 'Nature',
  sports: 'Sports',
  publishing: 'Publishing',
  'service-business': 'Service businesses',
  fashion: 'Fashion',
  retail: 'Retail',
  food: 'Food & produce',
  insurance: 'Insurance',
  automotive: 'Automotive',
};

// Broad browse groups keep a small portfolio discoverable; specific industry labels remain on the work.
export const industryFilters = [
  {
    id: 'business-finance',
    title: 'Business & finance',
    industries: ['business', 'finance'],
  },
  {
    id: 'brands-services',
    title: 'Brands & services',
    industries: [
      'service-business',
      'publishing',
      'insurance',
      'retail',
      'food',
      'fashion',
    ],
  },
  {
    id: 'health-learning',
    title: 'Health & personal growth',
    industries: ['health-wellness', 'education'],
  },
  {
    id: 'fashion-retail',
    title: 'Fashion & ecommerce',
    industries: ['fashion', 'retail', 'food'],
  },
  {
    id: 'sports-automotive',
    title: 'Sports & automotive',
    industries: ['sports', 'automotive'],
  },
  { id: 'nature-wildlife', title: 'Nature & wildlife', industries: ['nature'] },
];

export function resolveIndustryFilter(id?: string) {
  if (!id) return undefined;
  return (
    industryFilters.find((group) => group.id === id) ??
    industryFilters.find((group) => group.industries.includes(id))
  );
}

export interface Media {
  id: string;
  type: 'video' | 'image';
  title: string;
  src?: string;
  youtubeId?: string;
  description?: string;
  format?: 'short-form' | 'long-form' | 'advertisement';
  industries?: string[];
  tags?: string[];
  styles?: string[];
  orientation?: 'portrait' | 'landscape';
  metadataSource?: string;
  availability?: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  cover: string;
  description: string;
  year: string;
  skills: string[];
  industries: string[];
  tags: string[];
  styles?: string[];
  media: Media[];
}

export const projects = records as Project[];
export const categoryTitle = (id: string) =>
  categories.find((c) => c.id === id)?.title ?? id;
export const projectHref = (project: Project) => `/projects/${project.id}`;
export const videoHref = (project: Project, video: Media) =>
  `${projectHref(project)}/videos/${video.id}`;
export const categoryHref = (id: string) => `/projects/category/${id}`;
export const getProject = (id: string) =>
  projects.find((project) => project.id === id);
export const getVideo = (project: Project, id: string) =>
  project.media.find((media) => media.type === 'video' && media.id === id);
export const thumbnail = (video: Media) =>
  `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
export const mediaIndustries = (project: Project, media: Media) => [
  ...new Set([...project.industries, ...(media.industries ?? [])]),
];

export function relatedVideos(project: Project, selected: Media) {
  const industries = mediaIndustries(project, selected);
  const tags = new Set([...project.tags, ...(selected.tags ?? [])]);
  return projects
    .flatMap((parent) =>
      parent.media
        .filter((m) => m.type === 'video' && m.id !== selected.id)
        .map((media) => ({
          project: parent,
          media,
          score:
            mediaIndustries(parent, media).filter((i) => industries.includes(i))
              .length *
              3 +
            [...parent.tags, ...(media.tags ?? [])].filter((t) => tags.has(t))
              .length +
            (parent.id === project.id ? 1 : 0),
        }))
    )
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.media.id.localeCompare(b.media.id))
    .slice(0, 4);
}
