import type { Project } from "../../../../services/api";

import Button from "../../../../components/Button";

import styles from "./ProjectCard.module.scss";

const ProjectCard = ({
  project,
  onView,
}: {
  project: Project;
  onView: (project: Project) => void;
}): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.projectNameWrapper}>
          <div>
            Project: <span className={styles.projectName}>{project?.name}</span>
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
    </div>
  );
};

export default ProjectCard;
