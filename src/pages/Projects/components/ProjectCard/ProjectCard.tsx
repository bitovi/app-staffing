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
      <div className={styles.flexBetween}>
        <div>Project: {project?.projectName}</div>
        <div className={styles.dateGrid}>
          <label>
            Start Date
            <input
              defaultValue={project?.roles?.reduce((a, c) => a ?? c)?.startDate}
            />
          </label>
        </div>
        <div>
          <button className={styles.button} onClick={() => onView(project)}>
            View Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
