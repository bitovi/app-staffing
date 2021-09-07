import ListProjects from "../components/ListProjects";

import { useHistory } from "react-router-dom";

import { Project, useProjects } from "../../../services/api";

import styles from "./Projects.module.scss";

export default function Projects(): JSX.Element {
  const { data: projects } = useProjects();
  const history = useHistory();

  const addNewProject = () => {
    /** @Todo */
  };

  const editProject = (project: Project) => {
    history.push(`/project/${project.id}`);
  };

  return (
    <div className={styles.wrapper}>
      <ListProjects
        onAddNew={addNewProject}
        onView={editProject}
        projects={projects}
      />
    </div>
  );
}
