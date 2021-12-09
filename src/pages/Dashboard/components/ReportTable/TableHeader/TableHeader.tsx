import { useProjection } from "../../../../../services/projection";
import { TimescaleType } from "../../../../../services/timeline";
import { format } from "date-fns";
import { Box, Flex } from "@chakra-ui/layout";
import { Center, Text } from "@chakra-ui/react";

type TableHeaderProps = {
  date?: Date;
  columnLabel?: string;
};

export default function TableHeader({
  date = new Date(),
  columnLabel,
}: TableHeaderProps): JSX.Element {
  const { timeline } = useProjection(date);

  return (
    <Flex flex={1} height={8} mb={7} alignItems={"start"}>
      {columnLabel && (
        <Center width="3xs" justifyContent={"start"}>
          <Text textStyle="tableHead">{columnLabel}</Text>
        </Center>
      )}

      {timeline.map(({ title, type, startDate }, index) => {
        return (
          <Center
            flex={1}
            key={index}
            alignItems={"end"}
            flexDirection="column"
          >
            <Center height={4} flex={1}>
              <Text textStyle="tableHead">{title}</Text>
            </Center>

            {/* Sub Heading */}
            <Center height={4} flex={1} justifyContent="start">
              {type === TimescaleType.month && (
                <Text color={"#718096"}>{format(startDate, "MMM do")}</Text>
              )}
            </Center>
          </Center>
        );
      })}

      <Box w={28} />
    </Flex>
  );
}
