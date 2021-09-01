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
          Project: <span>{project?.projectName}</span>
        </div>
      </div>
      <div className={styles.dates}>
        <div>
          Start Date
          <span>{project?.roles?.reduce((a, c) => a ?? c)?.startDate}</span>
        </div>
        {/* <div>
          End Date
          <span>{project?.roles?.reduce((a, c) => a ?? c)?.startDate}</span>
        </div> */}
      </div>
      <div>
        <button className={styles.viewProject} onClick={() => onView(project)}>
          View Project
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
