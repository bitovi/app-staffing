import type { Project, NewProject } from "../../../../../services/api";

import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/hooks";

import SingleProjectBreadCrumb from "../../../../../components/Breadcrumbs/SingleProjectBreadCrumb";
import ProjectsBreadCrumb from "../../../../../components/Breadcrumbs/ProjectsBreadCrumb";
import ProjectModal from "../ProjectModal";
import { useTimeline } from "../../../../../services/projection";
import DataTimelineHeader from "../../../../../components/DataTable/DataTimelineHeader";
import FilterBar from "../../../../FilterBar";
import { sortData } from "../../../../../services/helpers/useSort/useSort";

interface ProjectHeaderProps {
  loading?: boolean;
  addProject?: (project: NewProject) => void;
  project?: Project;
  changeSort?: (sortData: string) => void;
  sortData?: sortData;
  onFilterChange?(filters: string[]): void;
}

export default function ProjectsHeader({
  loading,
  addProject,
  project,
  changeSort,
  sortData,
  onFilterChange,
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
                aria-label="Add Project"
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

        {onFilterChange && (
          <FilterBar
            ml={0}
            mb={6}
            maxWidth="100%"
            onFilterChange={onFilterChange}
            placeholder="Search by project name"
          ></FilterBar>
        )}

        {!project && changeSort && (
          <Flex padding="15px 0" borderBottom="1px solid #CBD5E0">
            <DataTimelineHeader
              heading={
                <Text cursor="pointer" onClick={() => changeSort("name")}>
                  <span>Name</span>
                  {sortData?.iteratee === "name" &&
                    (sortData?.order === "asc" ? (
                      <ChevronDownIcon
                        w="20px"
                        h="20px"
                        ml="5px"
                        data-testid="sort-icon-asc"
                      ></ChevronDownIcon>
                    ) : (
                      <ChevronUpIcon
                        w="20px"
                        h="20px"
                        ml="5px"
                        data-testid="sort-icon-desc"
                      ></ChevronUpIcon>
                    ))}
                </Text>
              }
              headingWidth="150px"
              timeline={timeline}
            />
          </Flex>
        )}
      </Flex>
    </Box>
  );
}
