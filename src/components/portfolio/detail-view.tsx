'use client';
import Link from 'next/link';
import { useState, useContext, createContext } from 'react';
import { Play, ArrowLeft, ExternalLink } from 'lucide-react';
import {
  categoryHref,
  categoryTitle,
  industryLabels,
  resolveIndustryFilter,
  mediaIndustries,
  projectHref,
  videoHref,
  thumbnail,
  relatedVideos,
  type Project,
  type Media,
} from '@/lib/catalogue';
import { ShareButton } from './share-button';

export const OverlayContext = createContext(false);

function VideoPlayer({ video }: { video: Media }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="space-y-3">
      {video.availability === 'unconfirmed' && (
        <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
          This older video may no longer be available on YouTube. You can try
          opening it there, or explore the related work below.
        </p>
      )}
      <div
        className={`relative mx-auto overflow-hidden rounded-2xl bg-neutral-950 ${video.orientation === 'portrait' ? 'aspect-[9/16] max-h-[75vh] max-w-sm' : 'aspect-video w-full'}`}
      >
        {playing ? (
          <iframe
            title={video.title}
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1`}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 h-full w-full"
            aria-label={`Play ${video.title}`}
          >
            {/* Remote thumbnails have their own fallback; no player loads until Play is pressed. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbnail(video)}
              alt=""
              className="h-full w-full object-contain"
              onError={(e) => {
                e.currentTarget.style.visibility = 'hidden';
              }}
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/15">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-black shadow-xl transition group-hover:scale-110">
                <Play fill="currentColor" size={25} />
              </span>
            </span>
          </button>
        )}
      </div>
      <a
        href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-xs text-neutral-500 underline underline-offset-4"
      >
        Watch on YouTube <ExternalLink size={12} />
      </a>
    </div>
  );
}

export function DetailView({
  project,
  video,
}: {
  project: Project;
  video?: Media;
}) {
  const overlay = useContext(OverlayContext);
  const selected = video ?? null;
  const related = selected ? relatedVideos(project, selected) : [];
  return (
    <article className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
        <Link
          href={
            selected ? projectHref(project) : categoryHref(project.category)
          }
          replace={overlay}
          scroll={!overlay}
          className="inline-flex items-center gap-2 text-neutral-600 hover:text-black"
        >
          <ArrowLeft size={16} />
          {selected ? `View ${project.title}` : categoryTitle(project.category)}
        </Link>
        <ShareButton
          href={selected ? videoHref(project, selected) : projectHref(project)}
        />
      </div>
      <header>
        <p className="mb-3 text-xs font-medium tracking-[0.18em] text-neutral-500 uppercase">
          {categoryTitle(project.category)} ·{' '}
          {selected ? project.title : project.year}
        </p>
        <h1 className="text-3xl leading-tight font-semibold tracking-tight sm:text-5xl">
          {selected?.title ?? project.title}
        </h1>
        <div className="mt-4 flex flex-wrap gap-2">
          {(selected
            ? mediaIndustries(project, selected)
            : project.industries
          ).map((industry) => (
            <Link
              replace={overlay}
              key={industry}
              href={`/projects?industry=${resolveIndustryFilter(industry)?.id ?? industry}`}
              className="rounded-full border px-3 py-1 text-xs text-neutral-600 hover:bg-neutral-100"
            >
              {industryLabels[industry] ?? industry}
            </Link>
          ))}
        </div>
      </header>
      {selected ? (
        <>
          <VideoPlayer key={selected.id} video={selected} />
          <p className="text-neutral-600">{selected.description}</p>
          <div className="flex flex-wrap gap-2" aria-label="Editing styles">
            {[...new Set([...(selected.styles ?? project.styles ?? [])])].map(
              (style) => (
                <span
                  key={style}
                  className="rounded-full bg-teal-50 px-3 py-1.5 text-xs text-teal-800"
                >
                  {style}
                </span>
              )
            )}
          </div>
        </>
      ) : (
        <>
          <div className="rounded-3xl bg-neutral-100/80 p-6 sm:p-8">
            <p className="leading-relaxed whitespace-pre-line text-neutral-700">
              {project.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-white px-3 py-1.5 text-xs text-neutral-600"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-8">
            {project.media.map((media) =>
              media.type === 'video' ? (
                <section key={media.id} className="space-y-3">
                  <Link
                    href={videoHref(project, media)}
                    replace={overlay}
                    scroll={!overlay}
                    className="group relative block aspect-video overflow-hidden rounded-2xl bg-neutral-100"
                    aria-label={`Open video: ${media.title}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={thumbnail(media)}
                      alt={media.title}
                      loading="lazy"
                      className="h-full w-full object-contain transition group-hover:scale-[1.02]"
                    />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 shadow-lg">
                        <Play fill="currentColor" size={23} />
                      </span>
                    </span>
                  </Link>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <Link
                      href={videoHref(project, media)}
                      replace={overlay}
                      scroll={!overlay}
                      className="text-base font-medium hover:underline"
                    >
                      {media.title}
                    </Link>
                    <ShareButton
                      href={videoHref(project, media)}
                      label="Copy video link"
                    />
                  </div>
                </section>
              ) : (
                <figure key={media.id}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={media.src}
                    alt={media.title}
                    loading="lazy"
                    className="mx-auto h-auto max-h-[800px] w-full rounded-2xl object-contain"
                  />
                </figure>
              )
            )}
          </div>
        </>
      )}
      {related.length > 0 && (
        <section className="border-t pt-8">
          <h2 className="mb-4 text-xl font-semibold">Explore related work</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {related.map((item) => (
              <Link
                key={item.media.id}
                href={videoHref(item.project, item.media)}
                replace={overlay}
                scroll={!overlay}
                className="group overflow-hidden rounded-2xl border"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thumbnail(item.media)}
                  alt=""
                  loading="lazy"
                  className="aspect-video w-full bg-neutral-100 object-cover"
                />
                <div className="p-4">
                  <p className="text-xs text-neutral-500">
                    {item.project.title}
                  </p>
                  <p className="mt-1 font-medium group-hover:underline">
                    {item.media.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
