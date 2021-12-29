import type { Project } from "../../../services/api";

import { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@chakra-ui/layout";

import {
  useProjects as defaultUseProjects,
  useRoleMutations as defaultRoleMutation,
  useProjectMutations as defaultUseProjectMutations,
} from "../../../services/api";
import ProjectDeleteButton from "../components/ProjectDeleteButton";
import ProjectDescription from "../components/ProjectDescription";
import RoleList from "../components/RoleList";

import ProjectsHeader from "../Projects/components/ProjectsHeader";
interface ProjectDetailProps {
  useProjects: typeof defaultUseProjects;
  useProjectMutations: typeof defaultUseProjectMutations;
  useRoleMutations: typeof defaultRoleMutation;
}

export function ProjectDetail({
  useProjects = defaultUseProjects,
  useProjectMutations = defaultUseProjectMutations,
  useRoleMutations = defaultRoleMutation,
}: ProjectDetailProps): JSX.Element {
  const projects = useProjects();
  const { updateProject, destroyProject } = useProjectMutations();
  const { updateRole, destroyRole } = useRoleMutations();

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
      {/* TODO: pull out header to top level components since its in 
      Projects and Project Detail. Should also change
      the logic for addProject so it optional */}
      <ProjectsHeader name={projectData?.name} addProject={() => null} />
      {projectData && (
        <>
          <ProjectDescription onEdit={onSave} project={projectData} />
          <RoleList
            destroyRole={destroyRole}
            updateRole={updateRole}
            project={projectData}
          />
          <Box mt={10}>
            <ProjectDeleteButton
              projectName={projectData.name}
              projectId={projectData.id}
              destroyProject={destroyProject}
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
        useRoleMutations={defaultRoleMutation}
      />
    </Suspense>
  );
}
