import ProjectCard from "./components/ProjectCard";

import { useProjects } from "../../services/api";

export default function Projects(): JSX.Element {
  const { data: projects } = useProjects();

  return (
    <div>
      {projects?.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
