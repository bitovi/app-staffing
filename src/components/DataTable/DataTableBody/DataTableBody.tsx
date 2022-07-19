import { Link as ReactRouterLink } from "react-router-dom";
import { Text } from "@chakra-ui/layout";
import { Link, Box, Flex, Tooltip } from "@chakra-ui/react";
import { skillBackgrounds } from "../../../pages/Dashboard/components/ReportTable/TableRow/TableRow";
import Badge from "../../Badge";
import { Project } from "../../../services/api";
import { TimelineRange } from "../../../services/projection";
import { HoverInfo } from "../../../pages/Projects/Projects/components/ProjectHoverInfo/ProjectHoverInfo";
import { GanttCell } from "../../../services/helpers/gantt/ganttCell/GanttCell";

interface PropjectCardProps {
  project: Project;
  timeline?: TimelineRange[];
}

const DataTableBody = ({
  project,
  timeline = [],
}: PropjectCardProps): JSX.Element => {
  return (
    <Box
      backgroundColor="#FFFFFF"
      borderRadius="4px"
      boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
      key={project.id}
      margin="15px 51px"
    >
      <Flex
        backgroundColor="#EDF2F7"
        borderRadius="4px 4px 0px 0px"
        justify="space-between"
        padding="6px 10px"
      >
        <Text fontWeight="600">{project.name}</Text>
        <Link
          to={`/projects/${project.id}`}
          as={ReactRouterLink}
          color="teal.500"
          fontWeight="bold"
          textDecoration="underline"
          _hover={{ textDecoration: "none" }}
        >
          View Project Detail
        </Link>
      </Flex>

      <Flex direction="column">
        {project?.roles?.map((role) => (
          <Box key={role.id}>
            {role?.skills?.map((skill) => (
              <Tooltip
                key={skill.id}
                minWidth="400px"
                height="fit-content"
                hasArrow
                placement="top"
                label={<HoverInfo role={role} skill={skill} />}
                aria-label="project start and end tooltip"
              >
                <Flex
                  alignItems="center"
                  borderBottom="1px solid rgba(0, 0, 0, 0.04)"
                  minHeight="50px"
                >
                  <Flex
                    alignItems="center"
                    alignSelf="stretch"
                    flex="0 1 150px"
                    justify="center"
                    padding="0 16px"
                  >
                    <Badge
                      background={skillBackgrounds[skill.name]}
                      display="flex"
                      isTruncated={false}
                      maxWidth="100px"
                      size="sm"
                      textAlign="center"
                      whiteSpace="break-spaces"
                    >
                      {skill.name}
                    </Badge>
                  </Flex>
                  {timeline.map((item: TimelineRange, index: number) => {
                    return (
                      <Box
                        textAlign="center"
                        alignSelf="stretch"
                        backgroundColor={
                          index % 2 === 0 ? "rgba(0,0,0,.04)" : "transparent"
                        }
                        flex="1"
                        key={`${!!item}=${index}`}
                      >
                        <Flex width="100%" height="100%">
                          <GanttCell
                            role={role}
                            timeline={timeline}
                            index={index}
                          />
                        </Flex>
                      </Box>
                    );
                  })}
                </Flex>
              </Tooltip>
            ))}
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default DataTableBody;
