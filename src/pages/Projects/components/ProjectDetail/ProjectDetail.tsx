import type { Project } from "../../../../services/api";

import { useState } from "react";
import { useParams } from "react-router-dom";

import styles from "./ProjectDetail.module.scss";

import ProjectDescription from "../ProjectDescription";
import RoleList from "../RoleList";
import { useProjects } from "../../../../services/api";

export default function ProjectDetail(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const { data: projects, updateProject } = useProjects();

  const [projectData] = useState<Project>(projects!.find((p) => p.id === id)!);

  const onSave = (project: Project) => {
    updateProject(project);
  };

  return (
    <div className={styles.container}>
      <ProjectDescription onEdit={onSave} project={projectData} />
      <RoleList roles={projectData.roles} />
    </div>
  );
}
