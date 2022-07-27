import { Box, Center, Flex, Td, Text, VStack } from "@chakra-ui/react";
import { isBefore } from "date-fns";
import { date } from "faker";
import { roleMocks } from "../../../mocks/roles/mocks";
import { Role } from "../../../services/api";
import GanttCell from "../../../services/helpers/gantt/ganttCell";
import { TimelineRange, useTimeline } from "../../../services/projection";

const DataGanttLine = (props: any) => {
  const endDate = props.role.endDate;
  const endOfTimeline = props.timeline[props.timeline.length - 1].endDate;

  const isEndInTimeLine = () => {
    if (isBefore(endDate, endOfTimeline)) {
      return true;
    }
  };

  console.log({ endOfTimeline });

  const { timeline: newTimeline } = useTimeline(new Date(endOfTimeline));

  // const endDateTimeline = () => {

  //   return (
  //     <Box
  //             textAlign="center"
  //             alignSelf="stretch"
  //             key={`gantt-cell-project-${role.id}-${index}`}
  //             backgroundColor={
  //               index % 2 === 0 ? "rgba(0,0,0,.04)" : "transparent"
  //             }
  //             flex="1"
  //           >
  //             <Flex marginTop="14px" flexDirection="column"><GanttCell
  //                 roleAssignments={[role]}
  //                 timeline={timeline}
  //                 index={index}
  //                 skill={skill}
  //               />
  //             </Flex>
  //           </Box>
  //   )
  // }

  const role = props.role;
  console.log('role in gantt', role)
  const timeline = props.timeline;
  const skill = props.role.skills[0];
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
        
        {/* {isEndInTimeLine() &&
          newTimeline.map((item: TimelineRange, index: number) => {
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
                    isEndConfidence={true}
                  />
                </Flex>
              </Box>
            );
          })} */}
      </Flex>
    </Box>
  );
};

export default DataGanttLine;

