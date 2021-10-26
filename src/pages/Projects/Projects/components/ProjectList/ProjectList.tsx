import { Project } from "../../../../../services/api";
import ProjectCard from "../ProjectCard";
export default function Projects({
  projects,
}: {
  projects?: Project[];
}): JSX.Element {
  return (
    <>
      {projects?.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </>
  );
}
