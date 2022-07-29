import { Box, Flex } from "@chakra-ui/react";
import { Role } from "../../../services/api";

import GanttCell from "../../../services/helpers/gantt/ganttCell";
import { TimelineRange } from "../../../services/projection";

const DataGanttLine = ({
  role,
  timeline,
}: {
  role: Role;
  timeline: TimelineRange[];
}): JSX.Element => {
  const skill = role.skills[0];
  return (
    <Box key={role.id}>
      <Flex
        key={skill.id}
        alignItems="center"
        borderBottom="1px solid rgba(0, 0, 0, 0.04)"
        minHeight="50px"
      >
        {timeline.map((item: TimelineRange, index: number) => {
          return (
            <Box
              textAlign="center"
              alignSelf="stretch"
              key={`gantt-cell-project-${role.id}-${index}`}
              backgroundColor={
                index % 2 === 0 ? "rgba(0,0,0,.04)" : "transparent"
              }
              flex="1"
            >
              <Flex marginTop="14px" flexDirection="column">
                <GanttCell
                  roleAssignments={[role]}
                  timeline={timeline}
                  index={index}
                  skill={skill}
                />
              </Flex>
            </Box>
          );
        })}
      </Flex>
    </Box>
  );
};

export default DataGanttLine;
