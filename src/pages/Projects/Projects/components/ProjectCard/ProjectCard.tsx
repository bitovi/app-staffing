import type { Project } from "@staffing/services/api";
import Link from "@staffing/components/Link";
import styles from "./ProjectCard.module.scss";

const ProjectCard = ({ project }: { project: Project }): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container} data-testid="container">
        <div className={styles.projectNameWrapper}>
          <div>
            <span className={styles.projectName}>{project?.name}</span>
          </div>
          <p>{project?.description}</p>
        </div>
        <div>
          <Link className={styles.viewProject} to={`/${project.id}`}>
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
