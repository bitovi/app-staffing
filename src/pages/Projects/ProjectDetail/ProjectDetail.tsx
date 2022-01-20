import { Suspense } from "react";
import { useParams } from "react-router-dom";
import isEmpty from "lodash/isEmpty";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Spacer,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/image";
import {
  useProject as useProjectDefault,
  useProjectMutations as useProjectMutationsDefault,
  useRole as useRoleDefault,
  useRoleMutations as useRoleMutationsDefault,
} from "../../../services/api";
import ProjectDeleteButton from "../components/ProjectDeleteButton";
import ProjectDescription from "../components/ProjectDescription";
import RoleList from "../components/RoleList";
import ProjectsHeader from "../Projects/components/ProjectsHeader";
import { EditIcon } from "./../../assets";
import type { Project } from "../../../services/api";

interface ProjectDetailProps {
  useProject: typeof useProjectDefault;
  useProjectMutations: typeof useProjectMutationsDefault;
  useRole: typeof useRoleDefault;
  useRoleMutations: typeof useRoleMutationsDefault;
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
  useProject = useProjectDefault,
  useProjectMutations = useProjectMutationsDefault,
  useRole = useRoleDefault,
  useRoleMutations = useRoleMutationsDefault,
}: ProjectDetailProps): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const project = useProject(id, {
    include: ["roles"],
  });

  const { updateProject, destroyProject } = useProjectMutations();
  const { createRole, updateRole, destroyRole } = useRoleMutations();
  // const roles = useRole();
  console.log("project", project);
  // console.log("roles", roles);

  const onSave = (id: string, updated: Partial<Project>) => {
    updateProject(id, { ...project, ...updated });
  };

  return (
    <div>
      <ProjectsHeader project={project} />

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
            <Box mt={10} />
            <ProjectDeleteButton
              projectName={project.name}
              projectId={project.id}
              destroyProject={destroyProject}
            />
          </Flex>
          <RoleList
            createRole={createRole}
            destroyRole={destroyRole}
            updateRole={updateRole}
            project={project}
            updateProject={updateProject}
          />
        </>
      )}

      {isEmpty(project.roles) && (
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
        useProject={useProjectDefault}
        useProjectMutations={useProjectMutationsDefault}
        useRole={useRoleDefault}
        useRoleMutations={useRoleMutationsDefault}
      />
    </Suspense>
  );
}
