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
  // @TODO: these are overly simple and need revisited
  const startDate = project?.roles
    ?.map((x) => x.startDate)
    .filter((x) => !!x)
    .reduce((a, c) => a || c, "");
  const endDate = project?.roles
    ?.map((x) => x.endDate)
    .filter((x) => !!x)
    .reduce((a, c) => a || c, "");

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.projectName}>
          <div>
            Project: <span>{project?.name}</span>
          </div>
        </div>
        <div className={styles.dates}>
          {/* @TODO: use a date component */}
          {startDate && (
            <div>
              Start Date
              <span>{startDate}</span>
            </div>
          )}
          {endDate && (
            <div>
              End Date
              <span>{endDate}</span>
            </div>
          )}
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
