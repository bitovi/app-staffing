import styles from "./ProjectList.module.scss";
import { Project } from "../../../../../services/api";
import ProjectCard from "../ProjectCard";

export default function Projects({
  onAddNew,
  projects,
}: {
  onAddNew: () => void;
  projects?: Project[];
}): JSX.Element {
  return (
    <div className={styles.container}>
      {projects?.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
