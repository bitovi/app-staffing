import type { Project } from "../../../../../services/api";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";

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
             <span className={styles.projectName}>{project?.name}</span>
          </div>
            <p>{project?.description}</p>
        </div>
        <div>
          <ChakraLink isExternal
            className={styles.viewProject}
            as={ReactLink}
            to={`/${project.id}`}
          >
            View
          </ChakraLink>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
