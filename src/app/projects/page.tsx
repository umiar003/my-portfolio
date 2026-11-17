import { Suspense } from 'react';
import { ProjectGallery } from '@/components/portfolio/project-gallery';
import { galleryMetadata } from '@/lib/portfolio-metadata';
export const metadata = galleryMetadata();
export default function ProjectsPage() {
  return (
    <Suspense fallback={<p className="p-8">Loading projects…</p>}>
      <ProjectGallery />
    </Suspense>
  );
}
