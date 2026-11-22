const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) =>
  module._compile(
    ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
        esModuleInterop: true,
      },
    }).outputText,
    filename
  );
const {
  projects,
  categories,
  getProject,
  getVideo,
  projectHref,
  videoHref,
  relatedVideos,
  resolveIndustryFilter,
} = require('../src/lib/catalogue.ts');
const {
  createPortfolioSearch,
  searchItems,
  resolveBrowseFilters,
} = require('../src/lib/portfolio-search.ts');
const search = createPortfolioSearch();

test('all retained original videos survive exactly once and Royal is removed', () => {
  const actual = projects
    .flatMap((p) => p.media.filter((m) => m.type === 'video').map((m) => m.id))
    .sort();
  const original = require('./legacy-video-ids.json').sort();
  for (const id of original)
    assert.equal(
      actual.filter((value) => value === id).length,
      1,
      `Original video ${id} must be preserved exactly once`
    );
  assert.equal(new Set(actual).size, actual.length);
  assert.equal(original.length, 79);
  assert.equal(getProject('royal'), undefined);
  assert(!searchItems.some((item) => item.href.includes('/royal')));
});
test('identifiers, media, references, and route targets are valid', () => {
  assert.equal(new Set(projects.map((p) => p.id)).size, projects.length);
  for (const project of projects) {
    assert(categories.some((c) => c.id === project.category));
    assert(fs.existsSync(path.join(__dirname, '../public', project.cover)));
    assert.equal(
      new Set(project.media.map((m) => m.id)).size,
      project.media.length
    );
    assert.equal(getProject(project.id), project);
    assert.equal(projectHref(project), `/projects/${project.id}`);
    for (const media of project.media) {
      if (media.type === 'video') {
        assert.notEqual(Boolean(media.youtubeId), Boolean(media.src));
        if (media.youtubeId)
          assert.match(media.youtubeId, /^[a-zA-Z0-9_-]{11}$/);
        else {
          assert(fs.existsSync(path.join(__dirname, '../public', media.src)));
          assert(media.poster);
        }
        if (media.poster)
          assert(
            fs.existsSync(path.join(__dirname, '../public', media.poster))
          );
        for (const category of media.categories ?? [])
          assert(categories.some((c) => c.id === category));
        assert.equal(getVideo(project, media.id), media);
        assert.equal(
          videoHref(project, media),
          `/projects/${project.id}/videos/${media.id}`
        );
      } else
        assert(fs.existsSync(path.join(__dirname, '../public', media.src)));
    }
  }
  assert.equal(getProject('missing'), undefined);
  assert.equal(getVideo(projects[0], 'missing'), undefined);
});
test('title terms locate individual videos rather than just their parent', () => {
  const found = search.search('BMW').matches;
  assert(found.some((r) => r.kind === 'video' && r.title.includes('BMW')));
  assert(found.every((r) => r.href.startsWith('/projects/')));
});
test('fuzzy matching handles misspellings', () =>
  assert(search.search('fashon').matches.length > 0));
test('multi-word phrases and aliases find promotional work', () => {
  assert(
    search
      .search('ecommerce ads')
      .matches.some((r) => r.kind === 'video' && r.category === 'ecommerce')
  );
  assert(
    search.search('3d reels').matches.some((r) => r.projectTitle === 'Viral 3D')
  );
  assert(
    search
      .search('wedding insurance ad')
      .matches.some((r) => r.id === 'video:D9e96dcTfeA')
  );
});
test('car wash alternatives are labelled separately and never fabricated as exact matches', () => {
  const found = search.search('car wash ads');
  assert.equal(found.matches.length, 0);
  assert(found.related.length > 0);
  assert(
    found.related.some(
      (r) =>
        r.industries.includes('service-business') ||
        r.industries.includes('automotive')
    )
  );
  assert(found.related.every((r) => !found.matches.some((m) => m.id === r.id)));
});
test('category browsing is independent and industry overrides old combined filters', () => {
  const ecommerce = search.search('', { category: 'ecommerce' });
  assert(
    ecommerce.matches.every((item) => item.categories.includes('ecommerce'))
  );
  const industry = search.search('', {
    category: 'youtube-videos',
    industry: 'brands-services',
  });
  assert(industry.matches.some((item) => item.category === 'reels-shorts'));
  assert(industry.matches.some((item) => item.category === 'ecommerce'));
  const group = resolveIndustryFilter('brands-services');
  assert(
    industry.matches.every((item) =>
      item.industries.some((value) => group.industries.includes(value))
    )
  );
  assert.deepEqual(
    resolveBrowseFilters({ category: 'ecommerce', industry: 'business' }),
    { industry: 'business-finance' }
  );
  assert.deepEqual(
    search.search('insurance', {
      category: 'ecommerce',
      industry: 'brands-services',
    }),
    search.search('insurance', { industry: 'brands-services' })
  );
});

test('owner descriptions are searchable even when a subject is absent from tags', () => {
  const result = search.search('seaweed').matches;
  assert(result.some((item) => item.id === 'video:N-VHoFjbe0w'));
  assert(
    !searchItems
      .find((item) => item.id === 'video:N-VHoFjbe0w')
      .tags.includes('seaweed')
  );
  assert(
    search
      .search('carbon dioxide')
      .matches.some((item) => item.id === 'video:snsT-x61pfs')
  );
  assert(
    search
      .search('shadow work')
      .matches.some((item) => item.id === 'video:I5g1TuW47wE')
  );
  assert(
    search
      .search('micro habits')
      .matches.some((item) => item.id === 'video:9R4z37-jnb4')
  );
});

test('supplied campaigns retain their media, order and provider', () => {
  const vitae = getProject('vitaesmile');
  assert.deepEqual(
    vitae.media.slice(0, 4).map((m) => path.basename(m.src)),
    [
      'Minimal Motion Grpahic Whitening Stripe Video.mp4',
      'Fun Music Product promo whitening Stripe.mp4',
      'Fast Stomp Promo style video of whitening stripe.mp4',
      'Fun Fast video about whitening stripe.mp4',
    ]
  );
  const kc = getProject('kc-consultancy-firm');
  assert.deepEqual(
    kc.media.map((m) => m.youtubeId),
    ['0gjtoRoT14U', 'PfP6uvXiBsQ', 'ExmbB11FVbQ', 'xcfqc34NQr0']
  );
  assert.equal(kc.featuredVideo, kc.media[0].id);
  assert.equal(
    getProject('my-personal-ai-video').media[0].youtubeId,
    '2P8j-w3OWeA'
  );
  for (const [slug, folder] of [
    ['vitaesmile', 'VitaeSmile'],
    ['ikhlax', 'AI Work/ikhlax'],
    ['ai-podcast-reel-edit', 'AI Work/Podcast Reel Edit using AI tool'],
    ['ai-ugc-ads', 'AI Work/AI UGC Ads'],
  ]) {
    const names = fs
      .readdirSync(path.join(__dirname, '../public', folder))
      .filter((f) => /\.(mp4|png|jpg)$/i.test(f));
    assert.deepEqual(
      getProject(slug)
        .media.map((m) => path.basename(m.src))
        .sort(),
      names.sort()
    );
  }
});

test('per-video discovery finds cross-category ads, podcast shorts and HeyGen footage', () => {
  const videos = (q, category) =>
    search
      .search(q, { category })
      .matches.filter((x) => x.kind === 'video')
      .map((x) => x.id);
  const ads = getProject('ai-ugc-ads').media;
  for (const m of ads) {
    for (const cat of ['ai', 'ugc', 'reels-shorts'])
      assert(videos('UGC', cat).includes('video:' + m.id));
    assert.equal(
      videos('', 'ecommerce').includes('video:' + m.id),
      !m.tags.includes('Software Ad')
    );
  }
  const stomp = getProject('vitaesmile').media[2];
  for (const cat of ['ai', 'ecommerce', 'reels-shorts'])
    assert(videos('HeyGen', cat).includes('video:' + stomp.id));
  assert(!videos('HeyGen', 'ugc').includes('video:' + stomp.id));
  const kc = getProject('kc-consultancy-firm');
  for (const [i, m] of kc.media.entries()) {
    assert.equal(
      videos('podcast', 'youtube-videos').includes('video:' + m.id),
      i === 0
    );
    assert.equal(
      videos('podcast', 'reels-shorts').includes('video:' + m.id),
      i > 0
    );
  }
  assert.equal(
    videos('Claude Code', 'ai').filter((id) =>
      getProject('ai-podcast-reel-edit').media.some(
        (m) => id === 'video:' + m.id
      )
    ).length,
    4
  );
});

test('Ikhlax graphics are project-only and follow all eight reels', () => {
  const p = getProject('ikhlax');
  assert.deepEqual(
    p.media.map((m) => m.type),
    [...Array(8).fill('video'), ...Array(7).fill('image')]
  );
  for (const image of p.media.slice(8)) {
    assert(
      !searchItems.some(
        (item) => item.image === image.src || item.id === 'video:' + image.id
      )
    );
    assert.equal(getVideo(p, image.id), undefined);
  }
});
test('withdrawn project is absent and its replacement preserves the supplied video order', () => {
  assert.equal(getProject('titans'), undefined);
  assert(!searchItems.some((item) => item.href.startsWith('/projects/titans')));
  const videos = getProject('bizworldexplorer').media;
  assert.deepEqual(
    videos.map((m) => m.youtubeId),
    [
      'VXmqBSKoFaw',
      'MRQ2C0IGG8k',
      '6rtISwKs8s4',
      'LU2LLiQvN78',
      'V3iEBeKYBzM',
      'esBda6x-xt4',
      'r4csCaI5Fdc',
      'wsqmxUUN2QQ',
    ]
  );
  assert(
    search
      .search('BMW comeback', { category: 'youtube-videos' })
      .matches.some((item) => item.id === 'video:MRQ2C0IGG8k')
  );
  const edits = search
    .search('Claude Edited')
    .matches.filter((item) => item.kind === 'video');
  assert.deepEqual(
    edits.map((i) => i.href).sort(),
    getProject('ai-podcast-reel-edit')
      .media.map((m) => '/projects/ai-podcast-reel-edit/videos/' + m.id)
      .sort()
  );
});
test('styles and tools match owner descriptions without labelling a whole collection incorrectly', () => {
  const comic = search
    .search('comic style')
    .matches.filter((item) => item.kind === 'video');
  assert.equal(comic.length, 2);
  assert(comic.every((item) => item.projectTitle === 'Trufanism'));
  assert.equal(
    search
      .search('client feedback')
      .matches.filter((item) => item.kind === 'video').length,
    1
  );
  assert(
    search
      .search('motion graphics')
      .matches.filter((item) => item.kind === 'video').length >= 25
  );
  assert(
    search
      .search('premier pro')
      .matches.some((item) => item.projectTitle === 'Goodness Nature')
  );
});
test('unknown queries remain empty and broad query prose is ignored', () => {
  assert.deepEqual(search.search('zxqvnonexistent'), {
    matches: [],
    related: [],
  });
  assert.deepEqual(
    search.search('show me videos of BMW'),
    search.search('BMW')
  );
});
test('results stay stable across repeated searches and video recommendations exclude self', () => {
  assert.deepEqual(search.search('fashion'), search.search('fashion'));
  const project = getProject('viral-3d'),
    video = getVideo(project, 'D9e96dcTfeA');
  assert(
    relatedVideos(project, video).every(
      (result) => result.media.id !== video.id
    )
  );
  assert.equal(
    searchItems.length,
    projects.length +
      projects.flatMap((p) => p.media).filter((m) => m.type === 'video').length
  );
});
