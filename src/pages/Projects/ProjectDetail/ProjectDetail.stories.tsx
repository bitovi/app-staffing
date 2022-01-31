import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Image,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { LoadingProjectDetails, ProjectDetail } from "./ProjectDetail";
import ProjectDeleteButton from "../components/ProjectDeleteButton";
import ProjectDescription from "../components/ProjectDescription";
import RoleList from "../components/RoleList";
import { useProjects } from "../../../services/api";
import { EditIcon } from "../../assets";

export default {
  title: "Pages/ProjectDetail",
  component: ProjectDetail,
} as ComponentMeta<typeof ProjectDetail>;

const backgroundColor = "gray.10";

export const Empty: ComponentStory<typeof ProjectDetail> = () => {
  const projects = useProjects();
  const project = projects[0];
  // Recreated ProjectDetail page because the props were breaking the Story.
  return (
    <div>
      <Box backgroundColor={backgroundColor} h={"75%"}>
        <Breadcrumb
          fontWeight="medium"
          fontSize="sm"
          separator={<ChevronRightIcon />}
        >
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href="#">Projects</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">Nike Store</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Text textStyle="title" color="gray.700">
          Nike Store
        </Text>
        <Flex
          width="100%"
          flexDirection="row"
          minHeight="30px"
          alignItems="center"
        >
          <ProjectDescription
            onEdit={() => Promise.resolve()}
            project={project}
          />

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
            destroyProject={async (id: string) => {
              alert(`delete project ${id}`);
            }}
          />
        </Flex>
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
        {/* <RoleList onEdit={() => Promise.resolve()} project={project} /> */}
      </Box>
    </div>
  );
};

export const NonEmpty: ComponentStory<typeof ProjectDetail> = () => {
  const projects = useProjects();
  const project = projects[3];
  // Recreated ProjectDetail page because the props were breaking the Story.
  return (
    <div>
      <Box backgroundColor={backgroundColor} h={"75%"}>
        <Breadcrumb
          fontWeight="medium"
          fontSize="sm"
          separator={<ChevronRightIcon />}
        >
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href="#">Projects</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">Nike Store</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Text textStyle="title" color="gray.700">
          Nike Store
        </Text>
        <Flex
          width="100%"
          flexDirection="row"
          minHeight="30px"
          alignItems="center"
        >
          <ProjectDescription
            onEdit={() => Promise.resolve()}
            project={project}
          />

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
            destroyProject={async (id: string) => {
              alert(`delete project ${id}`);
            }}
          />
        </Flex>
        <RoleList project={project} createRole={() => Promise.resolve("")} />
      </Box>
    </div>
  );
};

export const loadingProjectDetails: ComponentStory<any> = ({ ...props }) => (
  <LoadingProjectDetails />
);
