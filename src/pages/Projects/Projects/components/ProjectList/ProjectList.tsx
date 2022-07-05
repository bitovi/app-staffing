import { Box, BoxProps, Flex, Text } from "@chakra-ui/react";
import { FolderWithFilesIcon } from "../../../../assets/Icons";
import { Project } from "../../../../../services/api";
import DataTableBody from "../../../../../components/DataTable/DataTableBody";
import { TimelineRange } from "../../../../../services/projection";
interface ProjectListProps extends BoxProps {
  projects: Project[] | undefined;
  timeline: TimelineRange[]
}

export default function ProjectList({
  projects,
  timeline,
  ...rest
}: ProjectListProps): JSX.Element {
  
  return (
    <>
      <Box {...rest}>
        {projects && projects.length === 0 && (
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
            <FolderWithFilesIcon height="100" width="100" />
            <Text fontWeight="bold" fontSize="16px" lineHeight="24px">
              There are currently no projects available.
            </Text>
          </Flex>
        )}
        {projects && projects?.length > 0 && (
          <Box>
            {/* <Flex padding="15px 51px" borderBottom="1px solid #CBD5E0">
              <DataTimelineHeader
                heading="Name"
                headingWidth="150px"
                timeline={timeline}
              />
            </Flex> */}
            <Flex flexDirection="column">
              {projects?.length &&
                projects.map((project) => (
                  <DataTableBody
                    key={project.id}
                    project={project}
                    columnCount={timeline.length}
                  />
                ))}
            </Flex>
          </Box>
        )}
      </Box>
    </>
  );
}

export const ProjectListRow = ({
  project,
  children,
}: {
  project: Project;
  children: JSX.Element | boolean;
}): JSX.Element => {
  return (
    <>
      <DataTableBody project={project} />
      {children}
    </>
  );
};
