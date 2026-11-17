import { notFound } from 'next/navigation';
import { projects, getProject } from '@/lib/catalogue';
import { detailMetadata } from '@/lib/portfolio-metadata';
import { DetailView } from '@/components/portfolio/detail-view';
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}
export async function generateMetadata({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  return detailMetadata(project);
}
export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  return (
    <div className="mx-auto max-w-5xl px-5 py-8 sm:px-10">
      <DetailView project={project} />
    </div>
  );
}
