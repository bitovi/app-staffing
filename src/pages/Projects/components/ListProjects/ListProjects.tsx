import { Project } from "../../../../services/api";
import ProjectCard from "../ProjectCard";
import styles from "./ListProjects.module.scss";

export default function Projects({
  onAddNew,
  onView,
  projects,
}: {
  onAddNew: () => void;
  onView: (project: Project) => void;
  projects?: Project[];
}): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.flexLeft}>
        <button className={styles.button} onClick={onAddNew}>
          + Add Project
        </button>
      </div>

      {projects?.map((project) => (
        <ProjectCard key={project.id} project={project} onView={onView} />
      ))}
    </div>
  );
}
