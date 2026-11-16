import { notFound } from 'next/navigation';
import { getProject, getVideo } from '@/lib/catalogue';
import { DetailView } from '@/components/portfolio/detail-view';
import { RouteModal } from '@/components/portfolio/route-modal';
export default async function VideoModal({
  params,
}: {
  params: Promise<{ slug: string; video: string }>;
}) {
  const p = await params;
  const project = getProject(p.slug);
  if (!project) notFound();
  const video = getVideo(project, p.video);
  if (!video) notFound();
  return (
    <RouteModal title={video.title}>
      <DetailView project={project} video={video} />
    </RouteModal>
  );
}
