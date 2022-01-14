import type { Project } from "../../../services/api";

import { Suspense } from "react";
import { useParams } from "react-router-dom";
import {
  Flex,
  Text,
  IconButton,
  Spacer,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import {
  useProject as defaultUseProject,
  useRoleMutations as defaultRoleMutation,
  useProjectMutations as defaultUseProjectMutations,
} from "../../../services/api";
import { Image } from "@chakra-ui/image";
import ProjectDeleteButton from "../components/ProjectDeleteButton";
import ProjectDescription from "../components/ProjectDescription";
import RoleList from "../components/RoleList";
import ProjectsHeader from "../Projects/components/ProjectsHeader";
import { EditIcon } from "./../../assets";

interface ProjectDetailProps {
  useProject: typeof defaultUseProject;
  useProjectMutations: typeof defaultUseProjectMutations;
  useRoleMutations: typeof defaultRoleMutation;
}

export function LoadingProjectDetails(): JSX.Element {
  return (
    <>
      <Stack data-testid="loading-project-details-skeleton">
        <Skeleton height="10px" width="14rem" />
        <Skeleton height="55px" width="10rem" />
        <Flex
          width="100%"
          flexDirection="row"
          minHeight="30px"
          alignItems="center"
        >
          <Skeleton height="55px" width="100%" mr="2rem" />
          <Skeleton width="3rem" height="30px" mr="0.5rem" />
          <Skeleton width="3rem" height="30px" />
        </Flex>
        <Skeleton height="35px" width="8rem" />
        <Skeleton height="55vh" />
      </Stack>
    </>
  );
}

export function ProjectDetail({
  useProject = defaultUseProject,
  useProjectMutations = defaultUseProjectMutations,
  useRoleMutations = defaultRoleMutation,
}: ProjectDetailProps): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const project = useProject(id);

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
          <Flex
            width="100%"
            flexDirection="row"
            minHeight="30px"
            alignItems="center"
          >
            <ProjectDescription onEdit={onSave} project={project} />
            <Spacer />
            <IconButton
              variant="editAction"
              aria-label="Edit Project"
              fontSize="20px"
              icon={<EditIcon fill="currentColor" />}
              onClick={() => alert("TODO")}
            />
            <ProjectDeleteButton
              projectName={project.name}
              projectId={project.id}
              destroyProject={destroyProject}
            />
          </Flex>
          <RoleList
            destroyRole={destroyRole}
            updateRole={updateRole}
            project={project}
          />
        </>
      )}

      {project.roles.length === 0 && (
        <Flex
          width="100%"
          flexDirection="column"
          minHeight="30px"
          boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
          backgroundColor="white"
          padding="82px 30px 153px"
          border="1px solid #eee"
          borderRadius="4px"
          alignItems="center"
          marginTop="25px"
        >
          <Image
            height="100px"
            width="100px"
            src="../assets/images/folderWithFile.png"
            alt="Folder With File"
          />
          <Text fontWeight="bold" fontSize="16px" lineHeight="24px">
            There are currently no roles available.
          </Text>
        </Flex>
      )}
    </div>
  );
}

export default function ProjectDetailWrapper(): JSX.Element {
  return (
    <Suspense fallback={<LoadingProjectDetails />}>
      <ProjectDetail
        useProject={defaultUseProject}
        useProjectMutations={defaultUseProjectMutations}
        useRoleMutations={defaultRoleMutation}
      />
    </Suspense>
  );
}
