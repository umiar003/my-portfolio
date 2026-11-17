'use client';
import Link from 'next/link';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useMemo, useState, useEffect } from 'react';
import {
  Search,
  ArrowLeft,
  ArrowUpRight,
  Play,
  X,
  Layers,
  Film,
  Sparkles,
  ShoppingBag,
  ChevronDown,
} from 'lucide-react';
import {
  categories,
  categoryHref,
  categoryTitle,
  industryLabels,
  industryFilters,
  resolveIndustryFilter,
  projects,
  projectHref,
} from '@/lib/catalogue';
import {
  createPortfolioSearch,
  searchItems,
  resolveBrowseFilters,
  type SearchItem,
} from '@/lib/portfolio-search';
import { ShareButton } from './share-button';

const categoryIcons = {
  'youtube-videos': Film,
  'reels-shorts': Sparkles,
  ecommerce: ShoppingBag,
};
const suggestions = [
  'Documentary',
  '3D reels',
  'Product showcase',
  'Motion graphics',
  'Comic style',
  'Client feedback',
];
const countText = (count: number, unit: string) =>
  `${count} ${unit}${count === 1 ? '' : 's'}`;
function ResultCard({ item }: { item: SearchItem }) {
  return (
    <Link
      data-portfolio-open
      href={item.href}
      scroll={false}
      className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white transition duration-200 hover:-translate-y-1 hover:border-teal-300 hover:shadow-lg"
    >
      <div className="relative aspect-video overflow-hidden bg-neutral-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 rounded-full bg-black/65 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur">
          {categoryTitle(item.category)}
        </span>
        <span className="absolute right-3 bottom-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow">
          <Play size={16} fill="currentColor" />
        </span>
      </div>
      <div className="p-4 sm:p-5">
        <p className="text-[11px] font-medium text-teal-700">
          {item.projectTitle}
        </p>
        <h3 className="mt-1.5 line-clamp-2 text-base leading-snug font-semibold tracking-tight group-hover:text-teal-800">
          {item.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-neutral-500">
          {item.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {item.industries.slice(0, 2).map((industry) => (
            <span
              key={industry}
              className="rounded-full bg-neutral-100 px-2 py-1 text-[10px] text-neutral-600"
            >
              {industryLabels[industry] ?? industry}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
function VideoGrid({
  items,
  initial = 12,
}: {
  items: SearchItem[];
  initial?: number;
}) {
  const [visible, setVisible] = useState(initial);
  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.slice(0, visible).map((item) => (
          <ResultCard key={item.id} item={item} />
        ))}
      </div>
      {items.length > visible && (
        <div className="mt-7 text-center">
          <button
            className="portfolio-action px-6 py-3"
            onClick={() => setVisible((n) => n + 12)}
          >
            Show more videos <ChevronDown size={16} />
            <span className="text-neutral-400">
              {items.length - visible} more
            </span>
          </button>
        </div>
      )}
    </>
  );
}
function CollectionGrid({ items }: { items: SearchItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
      {items.map((item) => {
        const project = projects.find((p) => projectHref(p) === item.href)!;
        return (
          <Link
            data-portfolio-open
            key={item.id}
            href={item.href}
            scroll={false}
            aria-label={`Open project: ${project.title}`}
            className="group overflow-hidden rounded-2xl border bg-white transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.cover}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
              <span className="absolute right-2 bottom-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/95">
                <ArrowUpRight size={15} />
              </span>
            </div>
            <div className="p-3 sm:p-4">
              <h3 className="text-sm font-semibold sm:text-base">
                {project.title}
              </h3>
              <p className="mt-1 text-[10px] text-neutral-500 sm:text-xs">
                {countText(
                  project.media.filter((m) => m.type === 'video').length,
                  'video'
                )}
                · {categoryTitle(project.category)}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export function ProjectGallery({ category }: { category?: string }) {
  const params = useSearchParams(),
    pathname = usePathname(),
    router = useRouter();
  const isGalleryPath =
    pathname === '/projects' || pathname.startsWith('/projects/category/');
  const liveQuery = params.get('q') ?? '';
  const liveIndustry = params.get('industry') ?? '';
  const [backgroundBrowse, setBackgroundBrowse] = useState({
    query: liveQuery,
    industry: liveIndustry,
  });
  useEffect(() => {
    if (isGalleryPath)
      setBackgroundBrowse({ query: liveQuery, industry: liveIndustry });
  }, [isGalleryPath, liveQuery, liveIndustry]);
  const query = isGalleryPath ? liveQuery : backgroundBrowse.query;
  const filters = resolveBrowseFilters({
    category,
    industry:
      (isGalleryPath ? liveIndustry : backgroundBrowse.industry) || undefined,
  });
  const selectedCategory = filters.category,
    selectedIndustry = resolveIndustryFilter(filters.industry);
  const search = useMemo(() => createPortfolioSearch(), []);
  const results = useMemo(
    () =>
      search.search(query, {
        category: selectedCategory,
        industry: selectedIndustry?.id,
      }),
    [search, query, selectedCategory, selectedIndustry?.id]
  );
  const matchesByKind = {
    videos: results.matches.filter((item) => item.kind === 'video'),
    collections: results.matches.filter((item) => item.kind === 'project'),
  };
  const suggested = search.suggest(query);
  const normalizedParams = new URLSearchParams();
  if (query) normalizedParams.set('q', query);
  if (selectedIndustry) normalizedParams.set('industry', selectedIndustry.id);
  const basePath = selectedCategory
    ? categoryHref(selectedCategory)
    : '/projects';
  const normalizedHref =
    basePath + (normalizedParams.size ? `?${normalizedParams}` : '');
  // Normalize older combined/filter links without narrowing an industry to a category.
  useEffect(() => {
    const current = pathname + (params.size ? `?${params}` : '');
    if (isGalleryPath && current !== normalizedHref)
      router.replace(normalizedHref, { scroll: false });
  }, [pathname, params, normalizedHref, router, isGalleryPath]);
  function updateQuery(value: string) {
    const next = new URLSearchParams();
    if (value) next.set('q', value);
    if (selectedIndustry) next.set('industry', selectedIndustry.id);
    window.history.replaceState(
      null,
      '',
      basePath + (next.size ? `?${next}` : '')
    );
  }
  function chooseIndustry(value: string) {
    const next = new URLSearchParams();
    if (query) next.set('q', query);
    if (value) next.set('industry', value);
    router.push('/projects' + (next.size ? `?${next}` : ''), { scroll: false });
  }
  const querySuffix = query ? `?q=${encodeURIComponent(query)}` : '';
  const hasQuery = Boolean(query.trim());
  const gridKey = `${query}|${selectedCategory}|${selectedIndustry?.id}`;
  // Round-robin browsing showcases every collection instead of filling the first screen with one channel.
  const browseVideos = useMemo(() => {
    const items = results.matches.filter((item) => item.kind === 'video'),
      groups = projects.map((project) =>
        items.filter((item) => item.projectTitle === project.title)
      );
    const ordered: SearchItem[] = [];
    const max = Math.max(0, ...groups.map((group) => group.length));
    for (let n = 0; n < max; n++)
      for (const group of groups) if (group[n]) ordered.push(group[n]);
    return ordered;
  }, [results.matches]);
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pt-6 pb-12 sm:px-6 sm:pt-9">
      <div className="mb-7 flex items-center justify-between gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-medium text-neutral-500 hover:text-black"
        >
          <ArrowLeft size={15} />
          Back home
        </Link>
        <ShareButton
          href={normalizedHref}
          label={
            hasQuery
              ? 'Copy search link'
              : selectedIndustry
                ? 'Copy industry link'
                : selectedCategory
                  ? 'Copy category link'
                  : 'Copy gallery link'
          }
        />
      </div>
      <header className="mb-7">
        <p className="mb-3 text-[10px] font-semibold tracking-[0.22em] text-teal-700 uppercase">
          The portfolio
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Explore my work<span className="text-teal-600">.</span>
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-500">
          Documentaries, 3D reels, brand campaigns, and everything in between.
          Pick a collection or find a video that fits your idea.
        </p>
      </header>
      <nav
        aria-label="Project categories"
        className="grid grid-cols-2 gap-2.5 sm:grid-cols-4"
      >
        {[{ id: '', title: 'All Work' }, ...categories].map((item) => {
          const Icon = item.id
            ? categoryIcons[item.id as keyof typeof categoryIcons]
            : Layers;
          const count = searchItems.filter(
            (entry) =>
              entry.kind === 'video' && (!item.id || entry.category === item.id)
          ).length;
          const active = (selectedCategory ?? '') === item.id;
          return (
            <Link
              key={item.id}
              href={
                (item.id ? categoryHref(item.id) : '/projects') + querySuffix
              }
              aria-current={active ? 'page' : undefined}
              className={`flex items-center gap-3 rounded-2xl border p-3.5 transition sm:p-4 ${active ? 'border-neutral-900 bg-neutral-900 text-white shadow-md' : 'border-neutral-200 bg-white text-neutral-700 hover:border-teal-400 hover:bg-teal-50/40'}`}
            >
              <Icon
                size={19}
                className={active ? 'text-teal-300' : 'text-teal-700'}
              />
              <span>
                <span className="block text-xs font-semibold sm:text-sm">
                  {item.title}
                </span>
                <span
                  className={`mt-1 block text-[10px] ${active ? 'text-neutral-400' : 'text-neutral-400'}`}
                >
                  {count} videos
                </span>
              </span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-5 rounded-2xl border border-neutral-200 bg-neutral-50/70 p-3 sm:p-4">
        <form
          role="search"
          onSubmit={(event) => event.preventDefault()}
          className="flex items-center gap-3 rounded-xl border bg-white px-3 py-3 focus-within:ring-2 focus-within:ring-teal-400/40"
        >
          <Search size={19} className="shrink-0 text-neutral-400" />
          <label htmlFor="portfolio-search" className="sr-only">
            Search projects and videos
          </label>
          <input
            id="portfolio-search"
            type="search"
            value={query}
            onChange={(event) => updateQuery(event.target.value)}
            placeholder="Try McDonalds, documentary, comic style…"
            className="min-w-0 flex-1 bg-transparent text-base outline-none"
          />
          {query && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => updateQuery('')}
              className="rounded-lg p-1.5 hover:bg-neutral-100"
            >
              <X size={17} />
            </button>
          )}
        </form>
        <div className="mt-3 flex flex-wrap gap-2">
          {(hasQuery ? suggested : suggestions).map((value) => (
            <button
              key={value}
              onClick={() => updateQuery(value)}
              className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-[11px] text-neutral-600 transition hover:border-teal-400 hover:text-teal-800"
            >
              {value}
            </button>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-200/80 pt-3">
          <label className="flex flex-wrap items-center gap-2 text-xs text-neutral-500">
            Or browse by industry
            <select
              aria-label="Industry"
              value={selectedIndustry?.id ?? ''}
              onChange={(event) => chooseIndustry(event.target.value)}
              className="max-w-full rounded-lg border bg-white px-3 py-2 text-xs font-medium text-neutral-800"
            >
              <option value="">All industries</option>
              {industryFilters.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.title}
                </option>
              ))}
            </select>
          </label>
          <p className="text-[10px] text-neutral-400">
            Industries explore work across every category.
          </p>
        </div>
      </div>
      <div className="mt-8 mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            {hasQuery
              ? 'Search results'
              : selectedIndustry
                ? selectedIndustry.title
                : selectedCategory
                  ? categoryTitle(selectedCategory)
                  : 'Collections'}
          </h2>
          <p role="status" className="mt-1 text-xs text-neutral-500">
            {hasQuery
              ? `${countText(matchesByKind.videos.length, 'video')} and ${countText(matchesByKind.collections.length, 'collection')} match your search`
              : `${countText(matchesByKind.collections.length, 'collection')} · ${countText(matchesByKind.videos.length, 'video')} to explore`}
          </p>
        </div>
        {!hasQuery && (
          <a
            href="#portfolio-videos"
            className="text-xs font-medium text-teal-700 underline underline-offset-4"
          >
            Jump to videos ↓
          </a>
        )}
        {(hasQuery || selectedIndustry || selectedCategory) && (
          <Link
            href="/projects"
            className="text-xs text-teal-700 underline underline-offset-4"
          >
            Reset to all work
          </Link>
        )}
      </div>
      {hasQuery ? (
        <>
          {matchesByKind.videos.length > 0 && (
            <VideoGrid key={gridKey} items={matchesByKind.videos} />
          )}
          {!results.matches.length && (
            <div className="rounded-2xl border border-dashed bg-neutral-50 p-6">
              <h3 className="font-medium">No exact match yet</h3>
              <p className="mt-2 text-sm text-neutral-500">
                Try a subject, an editing style, or fewer words. You can also
                explore the related work below.
              </p>
            </div>
          )}
          {matchesByKind.collections.length > 0 && (
            <section className="mt-9">
              <h2 className="mb-4 text-lg font-semibold">
                Matching collections
              </h2>
              <CollectionGrid items={matchesByKind.collections} />
            </section>
          )}
          {results.related.length > 0 && (
            <section className="mt-10 border-t pt-8">
              <h2 className="text-xl font-semibold">More to explore</h2>
              <p className="mt-2 mb-5 text-xs text-neutral-500">
                Related subjects or editing styles. These are broader
                suggestions, not exact matches.
              </p>
              <VideoGrid
                key={`related-${gridKey}`}
                items={results.related}
                initial={6}
              />
            </section>
          )}
        </>
      ) : (
        <>
          <CollectionGrid items={matchesByKind.collections} />
          <section id="portfolio-videos" className="mt-10 scroll-mt-6">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.2em] text-teal-700 uppercase">
                  Straight to the work
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  Explore the videos
                </h2>
              </div>
              <p className="text-xs text-neutral-400">
                Open any video. Share it in one click.
              </p>
            </div>
            <VideoGrid key={gridKey} items={browseVideos} />
          </section>
        </>
      )}
    </section>
  );
}
