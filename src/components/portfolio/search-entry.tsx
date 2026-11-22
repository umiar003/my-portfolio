import Link from 'next/link';
import { Search } from 'lucide-react';

export function SearchEntry() {
  return (
    <div className="relative z-10 mx-auto mt-6 w-full max-w-xl px-1">
      <form
        action="/projects"
        role="search"
        className="flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white/90 p-2 shadow-sm"
      >
        <Search className="ml-2 shrink-0 text-neutral-400" size={19} />
        <label className="sr-only" htmlFor="home-search">
          Search projects and videos
        </label>
        <input
          id="home-search"
          type="search"
          name="q"
          placeholder="Find a video, subject, or editing style…"
          className="min-w-0 flex-1 bg-transparent py-2 text-base outline-none"
        />
        <button className="rounded-xl bg-neutral-900 px-4 py-2 text-sm text-white">
          Search
        </button>
      </form>
      <div className="mt-3 flex flex-wrap justify-center gap-2 text-xs text-neutral-500">
        <span className="py-1">Explore</span>
        {[
          ['AI Videos', '/projects/category/ai'],
          ['Ecommerce Ads', '/projects/category/ecommerce?q=ads'],
          ['Youtube', '/projects/category/youtube-videos'],
          ['Documentary', '/projects?q=documentary'],
          ['3D reels', '/projects?q=3d%20reels'],
          ['Service ads', '/projects?q=service%20ads'],
        ].map(([label, href]) => (
          <Link
            key={href}
            className="rounded-full border bg-white/80 px-3 py-1 hover:border-neutral-500"
            href={href}
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
