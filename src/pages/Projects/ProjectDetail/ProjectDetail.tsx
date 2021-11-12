import { Box } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Project } from "../../../services/api";
import { useProjects } from "../../../services/api";
import ProjectDeleteButton from "../components/ProjectDeleteButton";
import ProjectDescription from "../components/ProjectDescription";
import RoleList from "../components/RoleList";

export default function ProjectDetail(): JSX.Element {
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
          <Box mt={10}>
            <ProjectDeleteButton
              projectName={projectData.name}
              projectId={projectData.id}
            />
          </Box>
        </>
      )}
    </div>
  );
}
