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
      <div className={styles.dates}></div>
      {/** remove css class name */}
      <div>
        <button className={styles.viewProject} onClick={() => onView(project)}>
          View Project
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
