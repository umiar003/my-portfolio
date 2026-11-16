import { notFound } from 'next/navigation';
import { getProject } from '@/lib/catalogue';
import { DetailView } from '@/components/portfolio/detail-view';
import { RouteModal } from '@/components/portfolio/route-modal';
export default async function ProjectModal({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  return (
    <RouteModal title={project.title}>
      <DetailView project={project} />
    </RouteModal>
  );
}
