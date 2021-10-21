import type { Project } from "../../../services/api";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ProjectDescription from "../components/ProjectDescription";
import RoleList from "../components/RoleList";
import { useProjects as useProjectsDefault } from "../../../services/api";

export default function ProjectDetail({
  useProjects = useProjectsDefault,
}: {
  useProjects?: typeof useProjectsDefault;
}): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const { projects, updateProject } = useProjects();

  const [projectData, setProjectData] = useState<Project | undefined>(
    projects?.find((p) => p.id === id),
  );
  useEffect(() => {
    if (!projects) return;

    setProjectData(projects.find((p) => p.id === id));
  }, [projects, id]);
  const onSave = (project: Project) => {
    updateProject(project.id, project);
  };

  return (
    <div>
      {projectData && (
        <>
          <ProjectDescription onEdit={onSave} project={projectData} />
          <RoleList onEdit={onSave} project={projectData} />
        </>
      )}
    </div>
  );
}
