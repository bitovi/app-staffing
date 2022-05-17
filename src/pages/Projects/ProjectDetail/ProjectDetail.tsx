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
  useDisclosure,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/image";
import {
  useProject as useProjectDefault,
  useProjectMutations as useProjectMutationsDefault
} from "../../../services/api";
import ProjectDeleteButton from "../components/ProjectDeleteButton";
import ProjectDescription from "../components/ProjectDescription";
import RoleList from "../components/RoleList";
import ProjectsHeader from "../Projects/components/ProjectsHeader";
import { EditIcon } from "./../../assets";
import type { Project } from "../../../services/api";
import AddProjectModal from "../Projects/components/AddProjectModal";

interface ProjectDetailProps {
  useProject: typeof useProjectDefault;
  useProjectMutations: typeof useProjectMutationsDefault;
}

export function LoadingProjectDetails(): JSX.Element {
  return (
    <>
      <Stack
        data-testid="loading-project-details-skeleton"
        paddingInline="40px"
        marginBlock="40px"
      >
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
}: ProjectDetailProps): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const project = useProject(id, {
    include: ["roles.skills", "roles.assignments.employee"],
  });
  // const {roles} = {...useProject(id, {
  //   include: ["roles.skills", "roles.assignments.employee"],
  // })};
  // useEffect(()=>{
    
  // })
  const { updateProject, destroyProject } = useProjectMutations();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSave = (id: string, updated: Partial<Project>) => {
    updateProject(id, updated );
    console.log(project);


  };

  return (
    <div>
      <ProjectsHeader project={project} />

      <Flex
        width="100%"
        flexDirection="row"
        minHeight="30px"
        alignItems="center"
        paddingInline="40px"
        position="sticky"
        top="8.5em"
        zIndex="10"
        backgroundColor="gray.10"
      >
        <ProjectDescription onEdit={onSave} project={project} />
        <Spacer />
        <IconButton
          variant="editAction"
          aria-label="Edit Project"
          fontSize="20px"
          icon={<EditIcon fill="currentColor" />}
          onClick={onOpen}
        />
          <>
            {/* <Button
              size="lg"
              variant="primary"
              arialabel="Add Project"
              onClick={onOpen}
              data-testid="addProjectButton"
            >
              Add Project
            </Button> */}

            <AddProjectModal
              isOpen={isOpen}
              addProject={()=>alert('added')}
              updateProject={onSave}
              onClose={onClose}
              project={project}
            />
          </>
        <Box mt={10} />
        <ProjectDeleteButton
          projectName={project.name}
          projectId={project.id}
          destroyProject={destroyProject}
        />
      </Flex>
      <RoleList project={project} />

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
      />
    </Suspense>
  );
}
