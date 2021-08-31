import type { Project } from "../../../../services/api";

import styles from "./ProjectCard.module.scss";

const ProjectCard = ({ project }: { project?: Project }): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.flexBetween}>
        <div>Project: {project?.projectName}</div>
        <div className={styles.dateGrid}>
          <label>
            Start Date
            <input
              value={project?.roles?.reduce((a, c) => a ?? c)?.startDate}
            />
          </label>
        </div>
        <div>
          <button className={styles.button}>View Project</button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
