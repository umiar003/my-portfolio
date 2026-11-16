import Link from 'next/link';
import { PortfolioNavigation } from '@/components/portfolio/navigation-context';

export default function ProjectsLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <div className="mx-auto flex max-w-5xl items-center justify-between border-b border-neutral-100 px-5 py-5 sm:px-6">
        <Link href="/" className="text-sm font-semibold">
          Umair<span className="ml-1 text-neutral-400">/ portfolio</span>
        </Link>
        <Link
          href="/projects"
          className="text-xs text-neutral-500 hover:text-black"
        >
          Browse work
        </Link>
      </div>
      <PortfolioNavigation>
        {children}
        {modal}
      </PortfolioNavigation>
      <footer className="mx-auto mt-12 max-w-5xl border-t px-5 py-7 text-xs text-neutral-500">
        Have a project in mind?{' '}
        <a
          href="mailto:umair.official.pk@gmail.com"
          className="underline underline-offset-4"
        >
          Let’s talk.
        </a>
      </footer>
    </div>
  );
}
