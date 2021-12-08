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

const mockProject = {
  description:
    "Vero perspiciatis nulla nihil fuga facilis eum. Ullam saepe inventore sapiente enim eum. Autem vel non deleniti similique reprehenderit. Quo quasi laboriosam dicta est voluptatem consequatur fugiat a omnis.",
  id: "1001",
  name: "Assurance Facilitators",
  roles: [
    {
      employees: [],
      endDate: { confidence: "" },
      id: "409",
      skill: { name: "Node", id: "103" },
      startDate: { confidence: "" },
    },
    {
      employees: [],
      endDate: {
        confidence: "74%",
      },
      id: "113",
      skill: { id: "103", name: "Node" },
      startDate: {
        confidence: "18%",
      },
    },
  ],
};

export default {
  title: "Pages/ProjectDetail",
  component: ProjectDetail,
} as ComponentMeta<typeof ProjectDetail>;

export const projectDetail: ComponentStory<typeof ProjectDetail> = () => (
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
        project={mockProject}
      />
      {/* <RoleList onEdit={() => Promise.resolve()} project={mockProject} /> */}
      <Box mt={10}>
        <ProjectDeleteButton
          projectName={mockProject.name}
          projectId={mockProject.id}
        />
      </Box>
    </Suspense>
  </div>
);
