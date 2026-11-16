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
} = require('../src/lib/catalogue.ts');
const {
  createPortfolioSearch,
  searchItems,
} = require('../src/lib/portfolio-search.ts');
const search = createPortfolioSearch();

test('all original videos survive migration exactly once', () => {
  const actual = projects
    .flatMap((p) =>
      p.media.filter((m) => m.type === 'video').map((m) => m.youtubeId)
    )
    .sort();
  const original = require('./legacy-video-ids.json').sort();
  for (const id of original)
    assert.equal(
      actual.filter((value) => value === id).length,
      1,
      `Original video ${id} must be preserved exactly once`
    );
  assert.equal(new Set(actual).size, actual.length);
  assert(projects.length >= 12);
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
        assert.match(media.youtubeId, /^[a-zA-Z0-9_-]{11}$/);
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
  const found = search.search('Rolex').matches;
  assert(found.some((r) => r.kind === 'video' && r.title.includes('Rolex')));
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
test('explicit filters apply to exact and related results', () => {
  for (const q of ['ecommerce ads', 'car wash ads', '']) {
    const found = search.search(q, {
      category: 'ecommerce',
      industry: 'fashion',
      format: 'advertisement',
    });
    for (const item of [...found.matches, ...found.related]) {
      assert.equal(item.category, 'ecommerce');
      assert(item.industries.includes('fashion'));
      assert.equal(item.format, 'advertisement');
    }
  }
});
test('unknown queries remain empty and broad query prose is ignored', () => {
  assert.deepEqual(search.search('zxqvnonexistent'), {
    matches: [],
    related: [],
  });
  assert.deepEqual(
    search.search('show me videos of Rolex'),
    search.search('Rolex')
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
