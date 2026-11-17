import MiniSearch from 'minisearch';
import {
  categoryTitle,
  industryLabels,
  mediaIndustries,
  projects,
  projectHref,
  videoHref,
  thumbnail,
  resolveIndustryFilter,
  type Project,
  type Media,
} from './catalogue';

export interface SearchItem {
  id: string;
  kind: 'project' | 'video';
  title: string;
  projectTitle: string;
  description: string;
  projectDescription: string;
  category: string;
  industries: string[];
  styles: string;
  tools: string;
  tags: string;
  href: string;
  image: string;
}
export interface SearchFilters {
  category?: string;
  industry?: string;
}
export interface SearchResults {
  matches: SearchItem[];
  related: SearchItem[];
}

const aliases: Record<string, string> = {
  ads: 'advertisement',
  ad: 'advertisement',
  adverts: 'advertisement',
  advertising: 'advertisement',
  promo: 'advertisement',
  promotional: 'advertisement',
  reels: 'short',
  reel: 'short',
  shorts: 'short',
  tiktok: 'short',
  cars: 'car',
  services: 'service',
  businesses: 'business',
  graphics: 'graphic',
  graphic: 'graphic',
  animated: 'animation',
  animations: 'animation',
  mcdonals: 'mcdonalds',
  mcdonald: 'mcdonalds',
  ryace: 'royce',
  premier: 'premiere',
  magnetise: 'magnates',
  magnetize: 'magnates',
  magnatesmedia: 'magnates',
};
export const normalizeTerm = (term: string) => {
  const normalized = term
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '');
  return aliases[normalized] ?? normalized;
};
function tokenize(text: string) {
  return text
    .toLowerCase()
    .replace(/mc[\s-]?donald[’']?s?/g, 'mcdonalds')
    .replace(/e[ -]commerce/g, 'ecommerce')
    .replace(/t[ -]shirts?/g, 'tshirt')
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean);
}
const stopWords = new Set([
  'a',
  'an',
  'and',
  'the',
  'for',
  'of',
  'in',
  'to',
  'with',
  'me',
  'show',
  'find',
  'i',
  'want',
  'my',
  'some',
  'please',
  'video',
  'videos',
  'about',
  'that',
  'which',
]);
const queryTerms = (query: string) =>
  tokenize(query).filter((term) => !stopWords.has(term));

const videoItem = (project: Project, media: Media): SearchItem => ({
  id: `video:${media.id}`,
  kind: 'video',
  title: media.title,
  projectTitle: project.title,
  description: media.description ?? '',
  projectDescription: project.description,
  category: project.category,
  industries: mediaIndustries(project, media),
  styles: (media.styles ?? project.styles ?? []).join(' '),
  tools: project.skills.join(' '),
  tags: [
    ...project.tags,
    ...(media.tags ?? []),
    media.format ?? '',
    categoryTitle(project.category),
    ...(media.format === 'advertisement'
      ? ['advertisement', 'product promotion']
      : []),
    ...mediaIndustries(project, media).map((i) => industryLabels[i] ?? i),
  ].join(' '),
  href: videoHref(project, media),
  image: thumbnail(media),
});
export const searchItems: SearchItem[] = projects.flatMap((project) => [
  {
    id: `project:${project.id}`,
    kind: 'project' as const,
    title: project.title,
    projectTitle: project.title,
    description: project.description,
    projectDescription: '',
    category: project.category,
    industries: [
      ...new Set([
        ...project.industries,
        ...project.media.flatMap((media) => media.industries ?? []),
      ]),
    ],
    styles: (project.styles ?? []).join(' '),
    tools: project.skills.join(' '),
    tags: [
      ...project.tags,
      categoryTitle(project.category),
      ...project.industries.map((i) => industryLabels[i] ?? i),
    ].join(' '),
    href: projectHref(project),
    image: project.cover,
  },
  ...project.media
    .filter((media) => media.type === 'video')
    .map((media) => videoItem(project, media)),
]);

// An industry always takes precedence, even in an old URL containing both filters.
export function resolveBrowseFilters(filters: SearchFilters): SearchFilters {
  const industry = resolveIndustryFilter(filters.industry);
  return industry ? { industry: industry.id } : { category: filters.category };
}
function allowed(item: SearchItem, filters: SearchFilters) {
  const industry = resolveIndustryFilter(filters.industry);
  return industry
    ? item.industries.some((value) => industry.industries.includes(value))
    : !filters.category || item.category === filters.category;
}
const relationships = [
  {
    terms: ['car wash', 'carwash', 'detailing'],
    industries: ['automotive', 'service-business'],
  },
  {
    terms: ['salon', 'plumber', 'cleaning', 'local business'],
    industries: ['service-business'],
  },
  {
    terms: ['clothing', 'apparel', 'fashion', 'tshirt'],
    industries: ['fashion', 'retail'],
  },
  { terms: ['restaurant', 'fruit', 'food', 'grocery'], industries: ['food'] },
  {
    terms: ['insurance', 'wedding'],
    industries: ['insurance', 'service-business'],
  },
];

export function createPortfolioSearch() {
  const engine = new MiniSearch<SearchItem>({
    fields: [
      'title',
      'projectTitle',
      'description',
      'projectDescription',
      'tags',
      'styles',
      'tools',
    ],
    storeFields: ['id'],
    tokenize,
    processTerm: normalizeTerm,
    searchOptions: {
      boost: {
        title: 9,
        description: 5,
        styles: 5,
        tags: 4,
        projectTitle: 2,
        tools: 1,
        projectDescription: 0.5,
      },
      prefix: true,
      fuzzy: (term) => (term.length >= 5 ? 0.2 : false),
      combineWith: 'AND',
    },
  });
  engine.addAll(searchItems);
  const byId = new Map(searchItems.map((item) => [item.id, item]));
  return {
    search(query: string, input: SearchFilters = {}): SearchResults {
      const filters = resolveBrowseFilters(input),
        terms = queryTerms(query);
      if (!terms.length)
        return {
          matches: searchItems.filter((item) => allowed(item, filters)),
          related: [],
        };
      const full = engine.search(terms.join(' '), {
        fields: [
          'title',
          'projectTitle',
          'description',
          'tags',
          'styles',
          'tools',
        ],
      });
      const matches = full
        .map((result) => byId.get(String(result.id))!)
        .filter((item) => allowed(item, filters));
      const ids = new Set(matches.map((item) => item.id));
      const ranked = new Map<string, number>();
      // Partial matches are useful for longer descriptions, but remain separate from complete matches.
      if (terms.length > 1) {
        for (const result of engine.search(terms.join(' '), {
          combineWith: 'OR',
        })) {
          const item = byId.get(String(result.id))!;
          if (
            item.kind === 'video' &&
            !ids.has(item.id) &&
            allowed(item, filters) &&
            result.queryTerms.length >= Math.ceil(terms.length / 2)
          )
            ranked.set(item.id, result.score);
        }
      }
      const groups = relationships.filter((group) =>
        group.terms.some((term) => query.toLowerCase().includes(term))
      );
      for (const item of searchItems) {
        if (
          item.kind !== 'video' ||
          ids.has(item.id) ||
          !allowed(item, filters)
        )
          continue;
        const industryScore = groups.reduce(
          (sum, group) =>
            sum +
            item.industries.filter((i) => group.industries.includes(i)).length *
              3,
          0
        );
        if (industryScore)
          ranked.set(
            item.id,
            (ranked.get(item.id) ?? 0) +
              industryScore +
              (/\bads?\b|advert|promo/.test(query.toLowerCase()) &&
              /service ad|advertisement/.test(item.tags)
                ? 2
                : 0)
          );
      }
      // A small result set also surfaces more work with the same verified editing style.
      if (matches.length > 0 && matches.length < 6) {
        const similarStyles = new Set(
          matches
            .slice(0, 3)
            .flatMap((item) => tokenize(item.styles))
            .filter((term) => term.length > 4)
        );
        for (const item of searchItems) {
          if (
            item.kind !== 'video' ||
            ids.has(item.id) ||
            !allowed(item, filters)
          )
            continue;
          const overlap = new Set(
            tokenize(item.styles).filter((term) => similarStyles.has(term))
          ).size;
          if (overlap >= 2)
            ranked.set(item.id, (ranked.get(item.id) ?? 0) + overlap);
        }
      }
      const counts = new Map<string, number>();
      const related = [...ranked]
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .map(([id]) => byId.get(id)!)
        .filter((item) => {
          const n = counts.get(item.projectTitle) ?? 0;
          counts.set(item.projectTitle, n + 1);
          return n < 4;
        })
        .slice(0, 12);
      return { matches, related };
    },
    suggest(query: string): string[] {
      const terms = queryTerms(query).map(normalizeTerm);
      if (!terms.length) return [];
      const examples = [
        'documentary',
        'motion graphics',
        '3D reels',
        'faceless videos',
        'product showcase',
        'comic style',
        'McDonalds history',
        'Magnetise Media',
        '2D character animation',
        'client feedback',
        'luxury fashion',
        'BBC Our Planet',
        'Formula 1',
        'wedding insurance',
      ];
      return examples
        .filter((value) =>
          terms.every((term) =>
            queryTerms(value)
              .map(normalizeTerm)
              .some((word) => word.startsWith(term))
          )
        )
        .filter((value) => value.toLowerCase() !== query.toLowerCase())
        .slice(0, 5);
    },
  };
}
