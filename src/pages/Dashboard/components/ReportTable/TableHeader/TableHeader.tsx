import type { TimelineRange } from "../../../../../services/projection";

import { format } from "date-fns";
import { Center, chakra, Text, Th, Thead, Tr } from "@chakra-ui/react";

type TableHeaderProps = {
  timeline: TimelineRange[];
  columnLabel?: string;
};

const StickyHeader = chakra(Th, {
  baseStyle: {
    position: "sticky",
    top: "10em",
    background: "inherit",
    zIndex: "10",
  },
});

export default function TableHeader({
  timeline,
  columnLabel,
}: TableHeaderProps): JSX.Element {
  return (
    <Thead background="inherit">
      <Tr background="inherit">
        <StickyHeader
          px="5px"
          fontFamily="Inter"
          color="#333333"
          fontWeight="700"
          letterSpacing="0.05em"
          width="7rem"
        >
          {columnLabel && (
            <Text textStyle="tableHead" fontSize="12px">
              {columnLabel}
            </Text>
          )}
        </StickyHeader>
        <StickyHeader textTransform="none" color="transparent" width="5rem">
          <Text>Needed</Text>
        </StickyHeader>

        {timeline.map(({ title, type, startDate }, index) => {
          return (
            <StickyHeader
              px="5px"
              fontFamily="Inter"
              color="#333333"
              fontWeight="700"
              letterSpacing="0.05em"
              key={title}
            >
              <Center
                flex={1}
                key={index}
                alignItems={"start"}
                flexDirection="column"
              >
                <Center height={4} flex={1}>
                  <Text textStyle="tableHead" fontSize="12px">
                    {title}
                  </Text>
                </Center>

                {/* Sub Heading */}
                <Center height={4} flex={1} justifyContent="start">
                  {(type === "month" || type === "quarter") && (
                    <Text color={"#718096"}>{format(startDate, "MMM do")}</Text>
                  )}
                </Center>
              </Center>
            </StickyHeader>
          );
        })}

        <StickyHeader borderRadius="8px">
          <Center>
            <Text userSelect="none" color="transparent">
              Details
            </Text>
          </Center>
        </StickyHeader>
      </Tr>
    </Thead>
  );
}
