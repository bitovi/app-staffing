import styles from "./ProjectList.module.scss";
import { Project } from "../../../../../services/api";
import ProjectCard from "../ProjectCard";
import Button from "../../../../../components/Button";

export default function Projects({
  onAddNew,
  projects,
}: {
  onAddNew: () => void;
  projects?: Project[];
}): JSX.Element {
  
  return (
    <div className={styles.container}>
      <Button variant="link" onClick={onAddNew}>
        Create a new project
      </Button>

      {projects?.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
