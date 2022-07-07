import React from "react";
import { TimelineRange } from "../../../services/projection";
import { Flex } from "@chakra-ui/layout";
import { Center, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import { formatDateToUTC } from "../../../services/helpers/utcdate";

type DataTimelineHeaderProps = {
  heading: string;
  timeline: TimelineRange[];
};

function DataTimelineHeader({
  heading,
  timeline,
}: DataTimelineHeaderProps): JSX.Element {
  return (
    <Flex py={6} pl={11} flexDirection="row">
      <Flex width={200}>{heading}</Flex>
      {timeline.map(({ title, type, startDate }, index) => {
        return (
          <Flex
            flex={1}
            fontFamily="Inter"
            color="#333333"
            fontWeight="700"
            letterSpacing="0.05em"
            key={title}
          >
            <Center flex={1} alignItems={"start"} flexDirection="column">
              <Center height={4} flex={1}>
                <Text textStyle="tableHead" fontSize="12px">
                  {title}
                </Text>
              </Center>

              <Center height={4} flex={1} justifyContent="start">
                {(type === "month" || type === "quarter") && (
                  <Text color={"#718096"}>
                    {format(formatDateToUTC(startDate), "MMM do")}
                  </Text>
                )}
              </Center>
            </Center>
          </Flex>
        );
      })}
    </Flex>
  );
}

export default DataTimelineHeader;
