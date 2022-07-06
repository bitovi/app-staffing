import type { Project, NewProject } from "../../../../../services/api";

import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/hooks";

import SingleProjectBreadCrumb from "../../../../../components/Breadcrumbs/SingleProjectBreadCrumb";
import ProjectsBreadCrumb from "../../../../../components/Breadcrumbs/ProjectsBreadCrumb";
import ProjectModal from "../ProjectModal";
import { useTimeline } from "../../../../../services/projection";
import DataTimelineHeader from "../../../../../components/DataTable/DataTimelineHeader";

interface ProjectHeaderProps {
  loading?: boolean;
  addProject?: (project: NewProject) => void;
  project?: Project;
}

export default function ProjectsHeader({
  loading,
  addProject,
  project,
}: ProjectHeaderProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { timeline } = useTimeline(new Date());
  return (
    <Box
      mb={project ? "" : "32px"}
      position="sticky"
      top="0"
      background="gray.10"
      padding="40px"
      paddingBottom="1em"
      zIndex="10"
    >
      <Breadcrumb
        spacing="8px"
        marginBottom="16px"
        fontSize="14px"
        color="gray.500"
        separator={<ChevronRightIcon />}
      >
        <BreadcrumbItem>
          <BreadcrumbLink href="/" data-testid="homeBreadcrumb">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>

        {/* Conditionals for Breadcrumb focus */}
        {project ? (
          <SingleProjectBreadCrumb name={project.name} loading={loading} />
        ) : (
          <ProjectsBreadCrumb loading={loading} />
        )}
      </Breadcrumb>

      <Flex
        width="full"
        fontFamily="Arial, Helvetica, sans-serif"
        display="flex"
        direction="column"
        justifyContent="space-between"
      >
        <Flex justify="space-between">
          <Heading
            as="h1"
            textStyle="title"
            color="gray.700"
            data-testid="projectListTitle"
          >
            {project ? project.name : "Projects"}
          </Heading>

          {!project && (
            <>
              <Button
                size="lg"
                variant="primary"
                arialabel="Add Project"
                onClick={onOpen}
                data-testid="addProjectButton"
              >
                Add Project
              </Button>

              <ProjectModal
                isOpen={isOpen}
                onClose={onClose}
                addProject={(project) => addProject?.(project)}
                project={project}
              />
            </>
          )}
        </Flex>

        <Flex padding="15px 0" borderBottom="1px solid #CBD5E0">
          <DataTimelineHeader
            heading="Name"
            headingWidth="150px"
            timeline={timeline}
          />
        </Flex>
      </Flex>
    </Box>
  );
}
