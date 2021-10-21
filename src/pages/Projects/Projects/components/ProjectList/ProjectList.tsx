import styles from "./ProjectList.module.scss";
import { Project } from "../../../../../services/api";
import { Button } from "@chakra-ui/react";
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
      <Button variant="link" onClick={onAddNew}>
        + Add Project
      </Button>

      {projects?.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
