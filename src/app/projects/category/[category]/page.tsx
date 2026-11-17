import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { categories } from '@/lib/catalogue';
import { galleryMetadata } from '@/lib/portfolio-metadata';
import { ProjectGallery } from '@/components/portfolio/project-gallery';
type Props = { params: Promise<{ category: string }> };
export function generateStaticParams() {
  return categories.map((category) => ({ category: category.id }));
}
export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  return galleryMetadata(category);
}
export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  if (!categories.some((item) => item.id === category)) notFound();
  return (
    <Suspense fallback={<p className="p-8">Loading projects…</p>}>
      <ProjectGallery category={category} />
    </Suspense>
  );
}
