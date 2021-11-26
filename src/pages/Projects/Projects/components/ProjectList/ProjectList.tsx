import { Project } from "../../../../../services/api";
import ProjectCard from "../ProjectCard";
import EmptyCard from "../../../../../components/Empty/EmptyCard";

export default function ProjectList({
  projects,
}: {
  projects?: Project[];
}): JSX.Element {
  return (
    <>
      {(projects?.length &&
        projects?.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))) || (
        <EmptyCard message="There are currently no projects available." />
      )}
    </>
  );
}
