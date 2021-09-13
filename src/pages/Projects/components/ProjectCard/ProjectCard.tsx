import { Button } from "../../../../components/Layout/components/Button";
import type { Project } from "../../../../services/api";

import styles from "./ProjectCard.module.scss";

const ProjectCard = ({
  project,
  onView,
}: {
  project: Project;
  onView: (project: Project) => void;
}): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.projectName}>
        <div>
          Project: <span>{project?.name}</span>
        </div>
      </div>
      <div>
        <Button
          variant="link"
          className={styles.viewProject}
          onClick={() => onView(project)}
        >
          View Project
        </Button>
      </div>
    </div>
  );
};

export default ProjectCard;
