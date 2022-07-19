import { Box, Flex, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import { Assignment, Skill } from "../../../services/api";
import { colors } from "../../../theme/colors";
import { skillBackgrounds } from "../../Dashboard/components/ReportTable/TableRow/TableRow";
interface AssignmentHoverInfoProps {
  assignment: Assignment;
  skill: Skill;
}
export const AssignmentHoverInfo = ({
  assignment,
  skill,
}: AssignmentHoverInfoProps): JSX.Element => {
  return (
    <Flex flex="1" alignItems="center">
      <Flex
        alignItems="center"
        justifyContent="center"
        height="36px"
        padding="8px"
        borderRadius="50%"
        boxSizing="content-box"
        backgroundColor={skillBackgrounds[skill.name]}
      >
        <Text
          fontWeight="500"
          fontSize="20px"
          textAlign="center"
          boxSizing="content-box"
        >
          {getInitials(assignment.employee.name)}
        </Text>
      </Flex>
      <Box>
        <Flex paddingLeft="7px" flexDirection={"column"}>
          <Flex padding="4px">
            <Flex>
              <Text paddingRight="4px" fontWeight="bold" whiteSpace="nowrap">
                {assignment.employee.name}
              </Text>
            </Flex>
          </Flex>
          <Flex padding="4px">
            <Flex>
              <Text paddingRight="4px" fontWeight="bold" whiteSpace="nowrap">
                Start
              </Text>
              <Text fontWeight="normal" paddingRight="8px" whiteSpace="nowrap">
                {format(new Date(assignment.startDate), "MM/dd/yyyy")}
              </Text>
            </Flex>

            <Flex>
              <Text paddingRight="4px" fontWeight="bold" whiteSpace="nowrap">
                End
              </Text>
              <Text fontWeight="normal" paddingRight="8px" whiteSpace="nowrap">
                {assignment.endDate
                  ? `${format(new Date(assignment.endDate), "MM/dd/yyyy")}`
                  : "No End"}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

function getInitials(name: string) {
  const splitName = name.split(" ");
  if (splitName.length > 1) {
    return `${splitName[0][0]}${splitName[1][0]}`;
  } else {
    return splitName[0][0];
  }
}
