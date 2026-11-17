import {Suspense} from 'react';
import {ProjectGallery} from '@/components/portfolio/project-gallery';
export default function AllProjects(){return <Suspense fallback={<p>Loading projects…</p>}><ProjectGallery/></Suspense>;}
