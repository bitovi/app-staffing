import { useHistory } from "react-router-dom";

import ProjectList from "./components/ProjectList";
import { useProjects } from "../../../services/api";

import styles from "./Projects.module.scss";

export default function Projects(): JSX.Element {
  const { projects, addProject } = useProjects();
  const history = useHistory();

  const addNewProject = async () => {
    const newProjectId = await addProject({
      name: "New Project",
      description: "click to edit",
      roles: [],
    });

    history.push(`/${newProjectId}`);
  };

  return (
    <div className={styles.wrapper}>
      <ProjectList
        onAddNew={addNewProject}
        projects={projects}
      />
    </div>
  );
}
