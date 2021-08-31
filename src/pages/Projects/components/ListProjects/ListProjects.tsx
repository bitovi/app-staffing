import { Project } from "../../../../services/api";
import ProjectCard from "../ProjectCard";
import styles from "./ListProjects.module.scss";

export default function Projects({
  projects,
  onAddNew,
}: {
  projects?: Project[];
  onAddNew: () => void;
}): JSX.Element {
  return (
    <div className={styles.flexBetween}>
      <button className={styles.addButton} onClick={onAddNew}>
        Add Project +
      </button>

      {projects?.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
