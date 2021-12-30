import type { Project } from "../../../services/api";

import { Suspense } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@chakra-ui/layout";

import {
  useProject as defaultUseProject,
  useProjects as defaultUseProjects,
  useRoleMutations as defaultRoleMutation,
  useProjectMutations as defaultUseProjectMutations,
} from "../../../services/api";
import ProjectDeleteButton from "../components/ProjectDeleteButton";
import ProjectDescription from "../components/ProjectDescription";
import RoleList from "../components/RoleList";

import ProjectsHeader from "../Projects/components/ProjectsHeader";
interface ProjectDetailProps {
  useProject: typeof defaultUseProject;
  useProjects: typeof defaultUseProjects;
  useProjectMutations: typeof defaultUseProjectMutations;
  useRoleMutations: typeof defaultRoleMutation;
}

export function ProjectDetail({
  useProject = defaultUseProject,
  useProjects = defaultUseProjects,
  useProjectMutations = defaultUseProjectMutations,
  useRoleMutations = defaultRoleMutation,
}: ProjectDetailProps): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const project = useProject(id);

  console.log(project);

  const { updateProject, destroyProject } = useProjectMutations();
  const { updateRole, destroyRole } = useRoleMutations();

  const onSave = (id: string, updated: Partial<Project>) => {
    updateProject(id, { ...project, ...updated });
  };

  return (
    <div>
      <ProjectsHeader name={project?.name} />
      {project && (
        <>
          <ProjectDescription onEdit={onSave} project={project} />
          <RoleList
            destroyRole={destroyRole}
            updateRole={updateRole}
            project={project}
          />
          <Box mt={10}>
            <ProjectDeleteButton
              projectName={project.name}
              projectId={project.id}
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
        useProject={defaultUseProject}
        useProjects={defaultUseProjects}
        useProjectMutations={defaultUseProjectMutations}
        useRoleMutations={defaultRoleMutation}
      />
    </Suspense>
  );
}
