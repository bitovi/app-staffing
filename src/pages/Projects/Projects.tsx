import NewProject from "./components/NewProject";
import ListProjects from "./components/ListProjects";

import { useState } from "react";

import { Project, useProjects } from "../../services/api";

import styles from "./Projects.module.scss";

export default function Projects(): JSX.Element {
  const { data: projects } = useProjects();
  const [isAdding, setIsAdding] = useState(false);

  const addNewProject = () => setIsAdding(true);
  const cancelAddingProject = () => setIsAdding(false);
  const saveNewProject = (project: Project) => {
    setIsAdding(false);
    // @TODO: save new project
  };

  return (
    <div className={styles.wrapper}>
      {isAdding ? (
        <NewProject onCancel={cancelAddingProject} onSave={saveNewProject} />
      ) : (
        <ListProjects projects={projects} onAddNew={addNewProject} />
      )}
    </div>
  );
}
