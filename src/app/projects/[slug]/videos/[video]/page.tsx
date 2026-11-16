import { notFound } from 'next/navigation';
import { projects, getProject, getVideo } from '@/lib/catalogue';
import { detailMetadata } from '@/lib/portfolio-metadata';
import { DetailView } from '@/components/portfolio/detail-view';
type Props = { params: Promise<{ slug: string; video: string }> };
export function generateStaticParams() {
  return projects.flatMap((project) =>
    project.media
      .filter((media) => media.type === 'video')
      .map((media) => ({ slug: project.id, video: media.id }))
  );
}
export async function generateMetadata({ params }: Props) {
  const p = await params;
  const project = getProject(p.slug);
  if (!project) notFound();
  const video = getVideo(project, p.video);
  if (!video) notFound();
  return detailMetadata(project, video);
}
export default async function VideoPage({ params }: Props) {
  const p = await params;
  const project = getProject(p.slug);
  if (!project) notFound();
  const video = getVideo(project, p.video);
  if (!video) notFound();
  return (
    <div className="mx-auto max-w-5xl px-5 py-8 sm:px-10">
      <DetailView project={project} video={video} />
    </div>
  );
}
