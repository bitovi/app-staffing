import type { Project } from "../../../services/api";

import { useParams } from "react-router-dom";

import ProjectDescription from "../components/ProjectDescription";
import RoleList from "../components/RoleList";
import { useProjects } from "../../../services/api";

import styles from "./ProjectDetail.module.scss";

export default function ProjectDetail(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const { data: projects, updateProject } = useProjects();

  const projectData = projects?.find((p) => p.id === id);

  const onSave = (project: Project) => {
    updateProject(project);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {projectData && (
          <>
            <ProjectDescription onEdit={onSave} project={projectData} />
            <RoleList onEdit={onSave} project={projectData} />
          </>
        )}
      </div>
    </div>
  );
}
