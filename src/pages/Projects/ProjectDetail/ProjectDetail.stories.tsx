import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import Loading from "../../Loading";
import ProjectDetail from "./ProjectDetail";
import ProjectDeleteButton from "../components/ProjectDeleteButton";
import ProjectDescription from "../components/ProjectDescription";
// import RoleList from "../components/RoleList";
import { Suspense } from "react";
import { useProjects } from "../../../services/api";

export default {
  title: "Pages/Projects/ProjectDetail",
  component: ProjectDetail,
} as ComponentMeta<typeof ProjectDetail>;

export const ProjectDetailStory: ComponentStory<typeof ProjectDetail> = () => {
  const projects = useProjects();
  const project = projects[0];

  return (
    <div>
      <Suspense fallback={<Loading />}>
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

        <ProjectDescription
          onEdit={() => Promise.resolve()}
          project={project}
        />
        {/* <RoleList onEdit={() => Promise.resolve()} project={project} /> */}
        <Box mt={10}>
          <ProjectDeleteButton
            projectName={project.name}
            projectId={project.id}
            destroyProject={async (id: string) => {
              console.log("null");
            }}
          />
        </Box>
      </Suspense>
    </div>
  );
};
