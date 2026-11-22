# Portfolio content and search

All projects and media are maintained in **src/data/projects.json**. Routes, filters, search results, related videos, sharing metadata, and the sitemap read this catalogue. No paid API, hosted search service, or database is involved.

## Adding work

### Portfolio reviewed on 22 November 2026

The approved catalogue contains 17 collections and 121 videos. VitaeSmile, KC Consultancy Firm, Ikhlax, Podcast Reel Edit using AI tool, AI UGC Ads, and My Personal AI Video were added. BizWorldExplorer replaced Titans with eight documentaries. Royal was also removed. Titans was withdrawn by its owner and must stay out of future catalogues.

Projects and videos have direct links and can open in popups while browsing. MiniSearch searches the descriptions, styles, tools, and tags. Videos can appear in multiple categories. Ikhlax graphics appear only inside its collection. The Projects page leads with the category filters and includes AI and Claude Edited search suggestions.

The homepage uses the AI Specialist, Video Editor, and Graphic & Motion Designer title, updated avatar, Explore shortcuts, and Upwork link. The Me section has the updated portrait, biography, and intro video. AI Creativity leads Skills. WhatsApp and Upwork are the primary contact options. The original liquid cursor is shared across portfolio pages.

### Catalogue entries

Add a media entry to its parent project's `media` array. A video needs `id`, `type: "video"`, `youtubeId`, `title`, `description`, `format`, `industries`, and `tags`. Use its YouTube ID as its permanent `id`. The URL is `/projects/PROJECT-ID/videos/VIDEO-ID`. Never change a published ID when renaming or reordering work.

Use a descriptive title, a factual one-sentence summary, and relevant tags. Video-specific subjects belong on that video. Project-wide tags and industries are inherited. Supported formats are `short-form`, `long-form`, and `advertisement`. The optional `orientation` is `portrait` or `landscape`; leave it unset for the existing landscape YouTube uploads, including uploads containing a vertical edit inside a landscape frame.

An image needs `id`, `type: "image"`, `src`, and `title`. Put its file under `public/`. Keep media IDs unique inside their project.

Add new projects using the same structure as an existing entry, with a permanent lowercase `id`, a valid category, a public cover image, description, year, skills, industries, tags, and media. Current category definitions and industry labels are in `src/lib/catalogue.ts`. Categories are collections, formats describe videos, and industries describe the client's field.

For a local MP4, use a stable descriptive `id`, a public `src` and a lightweight `poster` instead of a YouTube ID. Local files use the browser's player. A YouTube entry can also supply a local poster. Set `featuredVideo` on a project to offer its main episode inline. Keep the main video first in the media array.

Each video can specify its own `categories` in display order, such as `["ai", "ugc", "ecommerce", "reels-shorts"]`. This list replaces the parent category for that video. Older entries inherit their project's category. A collection appears in each category containing one of its videos. Optional per-video `tools` override project skills in the search index.

Use `graphicsHeading` for a project with a separate artwork section. Its images appear beneath the videos on the project detail page. Only projects and videos have routes and search entries. Use a video frame for the cover when the graphics are reserved for the project page.

New content becomes searchable automatically when the site is rebuilt and deployed. No separate search index update is necessary.

## Metadata provenance

The migration preserved every original YouTube ID and all local gallery images. Public YouTube oEmbed titles were available for 87 of 92 videos. The seven Viral 3D thumbnails were also reviewed to replace vague upload titles with factual descriptions. This was a metadata/thumbnail review, not a full playback review of all 92 videos.

The owner supplied project/video summaries, editing styles, and tools. Royal and its five unavailable videos were removed. On 22 November 2026, the owner withdrew Titans and replaced its eight videos with eight BizWorldExplorer documentaries. The replacement titles, subjects, and cover artwork come from the supplied uploads and their YouTube metadata. Keep the withdrawn project, its videos, and its cover out of future releases.

The notes repeat a Self-Made Mind URL for two different videos; the existing correct video IDs were retained. The six numbered Viral 3D descriptions do not correspond one-to-one with the seven existing uploads. The extra known talking-head clip is retained; the general insurance introduction is mapped to the SaveMoney Hub upload and the wedding-insurance description to the known wedding video. Specific per-video styles override collection-wide style defaults, so a testimonial or comic-style edit does not incorrectly label every video in its collection.

`metadataSource` records whether a title came from the original portfolio, YouTube oEmbed, or oEmbed plus thumbnail review. Search does not fetch YouTube metadata at runtime. Existing videos may become private, unavailable, or restricted by their owners; the website cannot override those restrictions.

## Search behaviour

`src/lib/portfolio-search.ts` builds MiniSearch from the catalogue in the visitor's browser. It searches individual descriptions, titles, project names, styles, tools, and tags. General project descriptions are indexed for broader suggestions rather than turning every video into an exact match for a topic mentioned anywhere in its collection. Complete multi-term matches come first, followed by separately labelled partial-topic or style suggestions. Prefix matching, conservative typo tolerance, and common spellings such as McDonald's/McDonalds/mcdonals are supported.

The category controls are All Work, Youtube Videos, Reels/Shorts, Ecommerce, AI and UGC. Each count is the number of distinct videos in that category. Industry browsing uses six broader groups defined in `src/lib/catalogue.ts`. Choosing an industry searches across all categories. Selecting a category clears the industry. Industry takes precedence when an old URL contains both. Text search can refine either browsing mode.

Default browsing presents a grid of every matching collection followed by video previews diversified across collections. Show more reveals additional videos. Popup navigation preserves the underlying gallery's query, filters, expanded video count, focus, and scroll context.

Related results use explicit subject-to-industry relationships and appear separately. For example, a search for car wash ads can suggest automotive or service-business work without claiming those videos show a car wash. Related results are limited per collection to avoid one project overwhelming the suggestions. Add verified subjects to catalogue entries rather than adding unrelated keywords to make them appear in search.

## Routes and popups

- `/projects` — gallery and search; `q` and `industry` query parameters are shareable.
- `/projects/category/ecommerce` — category gallery; the text query is preserved, and industry/obsolete format parameters are cleared when switching categories.
- `/projects/viral-3d` — project.
- `/projects/viral-3d/videos/D9e96dcTfeA` — individual video.

Next.js parallel/intercepting routes preserve popup browsing during client navigation. Opening the same URL directly or refreshing renders the standalone detail page. In a popup, moving between its project and videos replaces that popup's URL, so closing returns to the originating gallery/search. Back and Forward work with the same history. A single Radix dialog manages focus and scroll locking.

Copy link uses the currently opened website's origin, so localhost links remain local and deployed links use the deployment's address. Canonical/social URLs use `https://umairvisuals.vercel.app`; update `src/lib/portfolio-metadata.ts` and `src/app/layout.tsx` together if the production domain changes. Messaging apps may cache older sharing previews.

## Development and validation

Use npm (the obsolete pnpm lockfile has been removed):

```text
npm ci
npm run dev
npm test
npm run check:portfolio
npm run build
npm audit
```

`.npmrc` retains legacy peer-dependency resolution for the inherited Tailwind tooling. Dependencies stay on Next.js 15 and React 19. The PostCSS override and scoped minimatch override apply patched transitive versions without upgrading Next.js to a new major version.

The build runs catalogue/search tests and lint for the new feature before compiling. `npm run lint` is the inherited whole-project lint command: older untouched cursor and template files have pre-existing findings, so it is separate from `check:portfolio`. The original build setting that skips whole-project lint is retained. New feature files pass lint without disabled rules.

The tests preserve original video references, validate asset/route references, and check search relevance, typo tolerance, aliases, honest related results, filter constraints, and deterministic results. When deliberately deleting an original video, update its entry in `tests/legacy-video-ids.json` as part of that content change.
