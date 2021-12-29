import type { Project } from "../../../services/api";

import { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@chakra-ui/layout";

import {
  useProjects as defaultUseProjects,
  useProjectMutations as defaultUseProjectMutations,
} from "../../../services/api";
import ProjectDeleteButton from "../components/ProjectDeleteButton";
import ProjectDescription from "../components/ProjectDescription";
import RoleList from "../components/RoleList";

import ProjectsHeader from "../Projects/components/ProjectsHeader";
interface ProjectDetailProps {
  useProjects: typeof defaultUseProjects;
  useProjectMutations: typeof defaultUseProjectMutations;
}

export function ProjectDetail({
  useProjects = defaultUseProjects,
  useProjectMutations = defaultUseProjectMutations,
}: ProjectDetailProps): JSX.Element {
  const projects = useProjects();
  const { updateProject } = useProjectMutations();

  const { id } = useParams<{ id: string }>();

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
      {/* TODO: pull out header to top level components since its in Projects and Project Detail. Should also change
      the logic for addProject so it optional */}
      <ProjectsHeader name={projectData?.name} addProject={() => null} />
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

export default function ProjectDetailWrapper(): JSX.Element {
  return (
    // TODO: Skeleton
    <Suspense fallback={<h1>loading</h1>}>
      <ProjectDetail
        useProjects={defaultUseProjects}
        useProjectMutations={defaultUseProjectMutations}
      />
    </Suspense>
  );
}
