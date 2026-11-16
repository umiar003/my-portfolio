// Compatibility export. All portfolio content lives in src/data/projects.json.
import {projects,categoryTitle} from '@/lib/catalogue';
import {DetailView} from '@/components/portfolio/detail-view';
export const data=projects.map(project=>({title:project.title,category:categoryTitle(project.category),src:project.cover,content:<DetailView project={project}/>}));
