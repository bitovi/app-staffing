import React from "react";
import { TimelineRange } from "../../../services/projection";
import { Flex } from "@chakra-ui/layout";
import { Center, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import { formatDateToUTC } from "../../../services/helpers/utcdate";

type DataTimelineHeaderProps = {
  heading: string;
  headingWidth?: string;
  timeline: TimelineRange[];
};

function DataTimelineHeader({
  heading,
  headingWidth = "200px",
  timeline,
}: DataTimelineHeaderProps): JSX.Element {
  return (
    <Flex flex="1" flexDirection="row">
      <Flex
        pl={11}
        width={headingWidth}
        fontWeight="700"
        textTransform="uppercase"
      >
        {heading}
      </Flex>
      {timeline.map(({ title, type, startDate }, index) => {
        return (
          <Flex
            flex={1}
            fontFamily="Inter"
            color="#333333"
            letterSpacing="0.05em"
            key={title}
          >
            <Center flex={1} key={index} flexDirection="column">
              <Center height={4} flex={1}>
                <Text
                  textStyle="tableHead"
                  fontSize="12px"
                  fontWeight="700"
                  textTransform="uppercase"
                >
                  {title}
                </Text>
              </Center>
              {/* Sub Heading */}
              <Center height={4} flex={1} justifyContent="start">
                {(type === "month" || type === "quarter") && (
                  <Text color={"#718096"} fontSize="12px">
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
