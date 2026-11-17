import Link from 'next/link';
export default function MissingProject() {
  return (
    <div className="mx-auto max-w-xl px-6 py-20 text-center">
      <h1 className="text-3xl font-semibold">This work couldn’t be found</h1>
      <p className="mt-4 text-neutral-500">
        The address may be incomplete, or this item may have moved. Explore the
        gallery to find another example.
      </p>
      <Link href="/projects" className="portfolio-action mt-6">
        Browse projects
      </Link>
    </div>
  );
}
