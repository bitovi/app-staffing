import type { TimelineRange } from "../../../../../services/projection";

import { format } from "date-fns";
import { Center, Text, Th, Thead, Tr } from "@chakra-ui/react";

type TableHeaderProps = {
  timeline: TimelineRange[];
  columnLabel?: string;
};

export default function TableHeader({
  timeline,
  columnLabel,
}: TableHeaderProps): JSX.Element {
  return (
    <Thead>
      <Tr>
        <Th
          px="5px"
          fontFamily="Inter"
          color="#333333"
          fontWeight="700"
          letterSpacing="0.05em"
        >
          {columnLabel && (
            <Text textStyle="tableHead" fontSize="12px">
              {columnLabel}
            </Text>
          )}
        </Th>
        <Th textTransform="none" color="transparent">
          <Text>Needed</Text>
        </Th>

        {timeline.map(({ title, type, startDate }, index) => {
          return (
            <Th
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
            </Th>
          );
        })}
      </Tr>
    </Thead>
  );
}
