import MiniSearch from 'minisearch';
import {
  categoryTitle,
  industryLabels,
  mediaIndustries,
  projects,
  projectHref,
  videoHref,
  thumbnail,
  type Project,
  type Media,
} from './catalogue';

export interface SearchItem {
  id: string;
  kind: 'project' | 'video';
  title: string;
  projectTitle: string;
  description: string;
  category: string;
  industries: string[];
  format: string;
  tags: string;
  href: string;
  image: string;
}
export interface SearchFilters {
  category?: string;
  industry?: string;
  format?: string;
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
  ecommerce: 'ecommerce',
  'e-commerce': 'ecommerce',
  cars: 'car',
  tshirts: 'tshirt',
  't-shirts': 'tshirt',
  services: 'service',
  businesses: 'business',
};
export const normalizeTerm = (term: string) => {
  const normalized = term
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '');
  return aliases[normalized] ?? normalized;
};
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
  'videos',
  'video',
]);
const queryTerms = (q: string) =>
  q
    .toLowerCase()
    .replace(/e-commerce/g, 'ecommerce')
    .split(/[^\p{L}\p{N}]+/u)
    .filter((t) => t && !stopWords.has(t));

const videoItem = (project: Project, media: Media): SearchItem => ({
  id: `video:${media.id}`,
  kind: 'video',
  title: media.title,
  projectTitle: project.title,
  description: media.description ?? '',
  category: project.category,
  industries: mediaIndustries(project, media),
  format: media.format ?? '',
  tags: [
    ...project.tags,
    ...(media.tags ?? []),
    ...(media.format === 'advertisement'
      ? ['advertisement', 'product promotion']
      : []),
    categoryTitle(project.category),
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
    category: project.category,
    industries: project.industries,
    format: '',
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

function allowed(item: SearchItem, filters: SearchFilters) {
  return (
    (!filters.category || item.category === filters.category) &&
    (!filters.industry || item.industries.includes(filters.industry)) &&
    (!filters.format || item.format === filters.format)
  );
}

// Explicit relationships broaden the subject only in the separately labelled related section.
const relationships: {
  terms: string[];
  industries: string[];
  tags: string[];
}[] = [
  {
    terms: ['car wash', 'carwash', 'detailing', 'auto detailing'],
    industries: ['automotive', 'service-business'],
    tags: [],
  },
  {
    terms: ['salon', 'plumbing', 'plumber', 'cleaning', 'local business'],
    industries: ['service-business'],
    tags: [],
  },
  {
    terms: ['clothing', 'apparel', 'menswear', 'tshirt', 't shirt', 'fashion'],
    industries: ['fashion'],
    tags: [],
  },
  {
    terms: ['restaurant', 'fruit', 'vegetable', 'food', 'grocery'],
    industries: ['food'],
    tags: [],
  },
  {
    terms: ['insurance', 'wedding'],
    industries: ['insurance', 'service-business'],
    tags: [],
  },
  {
    terms: ['3d', 'animation', 'animated'],
    industries: [],
    tags: ['3d animation', 'motion graphics'],
  },
  {
    terms: ['f1', 'formula one', 'formula 1', 'racing'],
    industries: ['sports'],
    tags: [],
  },
];

export function createPortfolioSearch() {
  const engine = new MiniSearch<SearchItem>({
    fields: ['title', 'projectTitle', 'tags', 'description'],
    storeFields: ['id'],
    processTerm: normalizeTerm,
    searchOptions: {
      boost: { title: 8, tags: 6, projectTitle: 3, description: 1 },
      prefix: true,
      fuzzy: (term) => (term.length >= 5 ? 0.2 : false),
      combineWith: 'AND',
    },
  });
  engine.addAll(searchItems);
  const byId = new Map(searchItems.map((item) => [item.id, item]));
  return {
    search(query: string, filters: SearchFilters = {}): SearchResults {
      const terms = queryTerms(query);
      if (!terms.length)
        return {
          matches: searchItems.filter((item) => allowed(item, filters)),
          related: [],
        };
      const results = engine.search(terms.join(' '));
      const matches = results
        .map((result) => byId.get(String(result.id))!)
        .filter((item) => allowed(item, filters));
      const matchedIds = new Set(matches.map((item) => item.id));
      const queryLower = query.toLowerCase();
      const groups = relationships.filter((group) =>
        group.terms.some((term) => queryLower.includes(term))
      );
      const rankedRelated = searchItems
        .filter(
          (item) =>
            item.kind === 'video' &&
            !matchedIds.has(item.id) &&
            allowed(item, filters)
        )
        .map((item) => ({
          item,
          score: groups.reduce(
            (total, group) =>
              total +
              item.industries.reduce(
                (sum, industry) =>
                  sum +
                  (group.industries.includes(industry)
                    ? Math.max(2, 6 - group.industries.indexOf(industry) * 3)
                    : 0),
                0
              ) +
              group.tags.filter((t) => item.tags.includes(t)).length,
            0
          ),
        }))
        .filter((result) => result.score > 0)
        .map((result) => ({
          ...result,
          score:
            result.score +
            (/\bads?\b|advert|promo/.test(queryLower) &&
            /service ad|product ads|advertisement/.test(result.item.tags)
              ? 2
              : 0),
        }))
        .sort(
          (a, b) => b.score - a.score || a.item.id.localeCompare(b.item.id)
        );
      const collectionCounts = new Map<string, number>();
      const related = rankedRelated
        .filter(({ item }) => {
          const count = collectionCounts.get(item.projectTitle) ?? 0;
          collectionCounts.set(item.projectTitle, count + 1);
          return count < 3;
        })
        .slice(0, 8)
        .map((result) => result.item);
      return { matches, related };
    },
    suggest(query: string): string[] {
      const terms = queryTerms(query);
      if (!terms.length) return [];
      const curated = [
        'ecommerce ads',
        '3d reels',
        'service ads',
        'wedding insurance',
        'fashion',
        'formula 1',
        'talking head',
        'book cover design',
        ...new Set(
          searchItems
            .flatMap((item) => item.industries)
            .map((id) => industryLabels[id] ?? id)
        ),
      ];
      const normalizedQuery = terms.map(normalizeTerm);
      const preferred = curated
        .filter((suggestion) =>
          normalizedQuery.every((term) =>
            queryTerms(suggestion)
              .map(normalizeTerm)
              .some((word) => word.startsWith(term))
          )
        )
        .filter(
          (suggestion) => suggestion.toLowerCase() !== query.toLowerCase()
        );
      const generated = engine
        .autoSuggest(terms.join(' '), {
          fuzzy: (term) => (term.length >= 5 ? 0.2 : false),
        })
        .map((result) =>
          [
            ...new Set(
              result.suggestion
                .split(' ')
                .map((word) => (word === 'advertisement' ? 'ads' : word))
            ),
          ].join(' ')
        )
        .filter(
          (suggestion) =>
            !suggestion.includes('commerce') ||
            !suggestion.includes('ecommerce')
        );
      return [...new Set([...preferred, ...generated])]
        .filter(
          (suggestion) => suggestion.toLowerCase() !== query.toLowerCase()
        )
        .slice(0, 4);
    },
  };
}
