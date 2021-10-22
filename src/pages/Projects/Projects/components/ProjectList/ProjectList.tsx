import styles from "./ProjectList.module.scss";
import { Project } from "@staffing/services/api";
import ProjectCard from "../ProjectCard";
import Button from "@staffing/components/Button";

export default function ProjectList({
  onAddNew,
  projects,
}: {
  onAddNew: () => void;
  projects?: Project[];
}): JSX.Element {
  return (
    <div className={styles.container}>
      <Button variant="link" onClick={onAddNew}>
        + Add Project
      </Button>

      {projects?.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
