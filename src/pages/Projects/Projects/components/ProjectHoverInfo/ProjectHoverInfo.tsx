import { Box, Flex, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import React from "react";
import { Role, Skill } from "../../../../../services/api";
import { skillBackgrounds } from "../../../../Dashboard/components/ReportTable/TableRow/TableRow";
interface ProjectHoverInfoProps {
  role: Role;
  skill?: Skill;
}
export const ProjectHoverInfo = ({
  role,
  skill,
}: ProjectHoverInfoProps): JSX.Element => {
  return (
    <Flex flex="1" alignItems="center">
      <Flex
        alignItems="center"
        justifyContent="center"
        height="36px"
        padding="8px"
        borderRadius="50%"
        boxSizing="content-box"
        backgroundColor={skill ? skillBackgrounds[skill.name] : "transparent"}
      >
        <Text fontWeight="700" textAlign="center" boxSizing="content-box">
          {skill ? skill.name : "-"}
        </Text>
      </Flex>
      <Box>
        <Flex paddingLeft="7px" flexDirection={"column"}>
          <Flex padding="4px">
            <Flex>
              <Text paddingRight="4px" fontWeight="bold" whiteSpace="nowrap">
                {role.startConfidence * 100}%
              </Text>
              <Text fontWeight="normal" paddingRight="8px" whiteSpace="nowrap">
                Confidence
              </Text>
            </Flex>

            <Flex>
              <Text paddingRight="4px" fontWeight="bold" whiteSpace="nowrap">
                {role.endConfidence ? `${role.endConfidence * 100}%` : "-"}
              </Text>
              <Text fontWeight="normal" paddingRight="8px" whiteSpace="nowrap">
                {role.endConfidence ? "Confidence" : ""}
              </Text>
            </Flex>
          </Flex>

          <Flex padding="4px">
            <Flex>
              <Text paddingRight="4px" fontWeight="bold" whiteSpace="nowrap">
                Start
              </Text>
              <Text fontWeight="normal" paddingRight="8px" whiteSpace="nowrap">
                {format(new Date(role.startDate), "MM/dd/yyyy")}
              </Text>
            </Flex>

            <Flex>
              <Text paddingRight="4px" fontWeight="bold" whiteSpace="nowrap">
                End
              </Text>
              <Text fontWeight="normal" paddingRight="8px" whiteSpace="nowrap">
                {role.endDate
                  ? `${format(new Date(role.endDate), "MM/dd/yyyy")}`
                  : "No End"}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};
