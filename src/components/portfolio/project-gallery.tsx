'use client';
import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';
import { useMemo, useRef } from 'react';
import { Search, ArrowLeft, ArrowRight, Play, X } from 'lucide-react';
import {
  categories,
  categoryHref,
  categoryTitle,
  industryLabels,
  projects,
  projectHref,
} from '@/lib/catalogue';
import { createPortfolioSearch, type SearchItem } from '@/lib/portfolio-search';
import { ShareButton } from './share-button';

function ResultCard({ item }: { item: SearchItem }) {
  return (
    <Link
      data-portfolio-open
      href={item.href}
      scroll={false}
      className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="relative aspect-video overflow-hidden bg-neutral-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-medium">
          {item.kind === 'video' ? 'Video' : 'Project'}
        </span>
        {item.kind === 'video' && (
          <span className="absolute right-3 bottom-3 flex h-8 w-8 items-center justify-center rounded-full bg-white">
            <Play size={14} fill="currentColor" />
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-neutral-500">
          {categoryTitle(item.category)} · {item.projectTitle}
        </p>
        <h3 className="mt-2 text-sm leading-relaxed font-semibold group-hover:underline">
          {item.title}
        </h3>
      </div>
    </Link>
  );
}

export function ProjectGallery({ category }: { category?: string }) {
  const params = useSearchParams();
  const pathname = usePathname();
  const query = params.get('q') ?? '';
  const industry = params.get('industry') ?? '';
  const format = params.get('format') ?? '';
  const search = useMemo(() => createPortfolioSearch(), []);
  const results = useMemo(
    () => search.search(query, { category, industry, format }),
    [search, query, category, industry, format]
  );
  const suggestions = useMemo(
    () => (query.length > 1 ? search.suggest(query) : []),
    [query, search]
  );
  const carousel = useRef<HTMLDivElement>(null);
  const activeSearch = Boolean(query.trim() || industry || format);
  const availableIndustries = useMemo(
    () =>
      [
        ...new Set(
          projects.flatMap((project) => [
            ...project.industries,
            ...project.media.flatMap((media) => media.industries ?? []),
          ])
        ),
      ].sort((a, b) =>
        (industryLabels[a] ?? a).localeCompare(industryLabels[b] ?? b)
      ),
    []
  );
  function update(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    window.history.replaceState(
      null,
      '',
      `${pathname}${next.size ? `?${next}` : ''}`
    );
  }
  const queryString = params.toString();
  const suffix = queryString ? `?${queryString}` : '';
  const categoryPath = category ? categoryHref(category) : '/projects';
  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
      <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
        <Link href="/" className="portfolio-action">
          <ArrowLeft size={16} /> Back home
        </Link>
        <ShareButton
          href={`${categoryPath}${suffix}`}
          label={
            activeSearch
              ? 'Copy results link'
              : category
                ? 'Copy category link'
                : 'Copy gallery link'
          }
        />
      </div>
      <header>
        <p className="mb-3 text-xs font-medium tracking-[0.2em] text-neutral-500 uppercase">
          Selected work
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {category ? categoryTitle(category) : 'My Projects'}
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-500">
          Find the right example for your next project. Explore collections or
          go straight to a video.
        </p>
      </header>
      <form role="search" onSubmit={(e) => e.preventDefault()} className="mt-7">
        <label htmlFor="portfolio-search" className="sr-only">
          Search projects and videos
        </label>
        <div className="flex items-center gap-3 rounded-2xl border bg-white px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-neutral-300">
          <Search size={20} className="shrink-0 text-neutral-400" />
          <input
            id="portfolio-search"
            type="search"
            value={query}
            onChange={(e) => update('q', e.target.value)}
            placeholder="Try ecommerce ads, 3D reels, fashion…"
            className="min-w-0 flex-1 bg-transparent text-base outline-none"
          />
          {query && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => update('q', '')}
              className="rounded-full p-2 hover:bg-neutral-100"
            >
              <X size={17} />
            </button>
          )}
        </div>
        {suggestions.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-neutral-500">Suggestions</span>
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                className="rounded-full border px-3 py-1.5 hover:bg-neutral-100"
                onClick={() => update('q', suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
        <div className="mt-4 grid grid-cols-2 gap-3 sm:flex">
          <label className="flex min-w-0 flex-col gap-1 text-xs text-neutral-500">
            Industry
            <select
              value={industry}
              onChange={(e) => update('industry', e.target.value)}
              className="rounded-xl border bg-white px-3 py-2.5 text-sm text-neutral-800"
            >
              <option value="">All industries</option>
              {availableIndustries.map((id) => (
                <option value={id} key={id}>
                  {industryLabels[id] ?? id}
                </option>
              ))}
            </select>
          </label>
          <label className="flex min-w-0 flex-col gap-1 text-xs text-neutral-500">
            Format
            <select
              value={format}
              onChange={(e) => update('format', e.target.value)}
              className="rounded-xl border bg-white px-3 py-2.5 text-sm text-neutral-800"
            >
              <option value="">All formats</option>
              <option value="short-form">Reels / Shorts</option>
              <option value="long-form">Long-form</option>
              <option value="advertisement">Promotional videos</option>
            </select>
          </label>
          {activeSearch && (
            <Link
              href={categoryPath}
              className="self-end px-2 py-2.5 text-sm text-neutral-500 underline underline-offset-4"
            >
              Clear search & filters
            </Link>
          )}
        </div>
      </form>
      <nav
        aria-label="Project categories"
        className="mt-6 flex flex-wrap gap-2"
      >
        <Link
          href={`/projects${suffix}`}
          aria-current={!category ? 'page' : undefined}
          className={`portfolio-chip ${!category ? 'portfolio-chip-active' : ''}`}
        >
          All work
        </Link>
        {categories.map((item) => (
          <Link
            key={item.id}
            href={`${categoryHref(item.id)}${suffix}`}
            aria-current={category === item.id ? 'page' : undefined}
            className={`portfolio-chip ${category === item.id ? 'portfolio-chip-active' : ''}`}
          >
            {item.title}
          </Link>
        ))}
      </nav>
      {!activeSearch ? (
        <>
          <div
            ref={carousel}
            className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain rounded-3xl pb-5"
            aria-label="Project collections"
            tabIndex={0}
          >
            {projects
              .filter((project) => !category || project.category === category)
              .map((project) => (
                <Link
                  data-portfolio-open
                  key={project.id}
                  href={projectHref(project)}
                  scroll={false}
                  className="group relative block h-80 w-56 shrink-0 snap-start overflow-hidden rounded-3xl bg-neutral-100 transition hover:scale-[0.98]"
                  aria-label={`Open project: ${project.title}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.cover}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/10 to-transparent" />
                  <div className="relative p-7 text-white">
                    <p className="text-xs text-white/80">
                      {categoryTitle(project.category)}
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold">
                      {project.title}
                    </h2>
                  </div>
                  <span className="absolute right-5 bottom-5 flex h-9 w-9 items-center justify-center rounded-full bg-white text-black">
                    <ArrowRight size={18} />
                  </span>
                </Link>
              ))}
          </div>
          <div className="mt-2 flex justify-end gap-2">
            <button
              aria-label="Scroll left"
              className="portfolio-action"
              onClick={() =>
                carousel.current?.scrollBy({ left: -240, behavior: 'smooth' })
              }
            >
              <ArrowLeft size={18} />
            </button>
            <button
              aria-label="Scroll right"
              className="portfolio-action"
              onClick={() =>
                carousel.current?.scrollBy({ left: 240, behavior: 'smooth' })
              }
            >
              <ArrowRight size={18} />
            </button>
          </div>
          <div className="mt-8 rounded-2xl bg-neutral-100 p-5">
            <p className="text-sm font-medium">
              Have a particular style in mind?
            </p>
            <p className="mt-1 text-sm text-neutral-500">
              Try a subject, industry, or format.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                'ecommerce ads',
                '3d reels',
                'service ads',
                'fashion',
                'formula 1',
              ].map((q) => (
                <button
                  key={q}
                  className="rounded-full border bg-white px-3 py-1.5 text-xs"
                  onClick={() => update('q', q)}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="mt-8">
          <p className="mb-5 text-sm text-neutral-500" role="status">
            {results.matches.length
              ? `${results.matches.length} matching ${results.matches.length === 1 ? 'result' : 'results'}`
              : 'No close matches for this search.'}
          </p>
          {results.matches.length > 0 && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {results.matches.map((item) => (
                <ResultCard key={item.id} item={item} />
              ))}
            </div>
          )}
          {!results.matches.length && (
            <div className="rounded-2xl border border-dashed p-6 text-sm leading-relaxed text-neutral-600">
              Try fewer words or another industry. Your selected category and
              filters stay applied.{' '}
              <Link
                className="underline underline-offset-4"
                href={`/projects${query ? `?q=${encodeURIComponent(query)}` : ''}`}
              >
                Search all work
              </Link>
            </div>
          )}
          {results.related.length > 0 && (
            <section className="mt-10 border-t pt-8">
              <h2 className="text-xl font-semibold">Related examples</h2>
              <p className="mt-2 mb-5 text-sm text-neutral-500">
                These share a relevant industry or style. They are alternatives,
                not exact subject matches.
              </p>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {results.related.map((item) => (
                  <ResultCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </section>
  );
}
