import ProjectDetail from "./components/ProjectDetail";
import ListProjects from "./components/ListProjects";

import { useState } from "react";

import { Project, useProjects } from "../../services/api";

import styles from "./Projects.module.scss";

export default function Projects(): JSX.Element {
  const { data: projects } = useProjects();
  const [isAdding, setIsAdding] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>();

  const addNewProject = () => setIsAdding(true);
  const cancelAddingProject = () => setIsAdding(false);
  const saveNewProject = (project: Project) => {
    // @TODO: save new project
    setIsAdding(false);
  };
  const editProject = (project: Project) => {
    setEditingProject(project);
  };
  const cancelEditProject = () => {
    setEditingProject(undefined);
  };
  const updateProject = (project: Project) => {
    // @TODO: persist update
    setEditingProject(undefined);
  };

  return (
    <div className={styles.wrapper}>
      {isAdding ? (
        <ProjectDetail onCancel={cancelAddingProject} onSave={saveNewProject} />
      ) : editingProject ? (
        /* @TODO: viewing/editing should be handled through routing */
        <ProjectDetail
          onCancel={cancelEditProject}
          onSave={updateProject}
          project={editingProject}
        />
      ) : (
        <ListProjects
          onAddNew={addNewProject}
          onView={editProject}
          projects={projects}
        />
      )}
    </div>
  );
}
