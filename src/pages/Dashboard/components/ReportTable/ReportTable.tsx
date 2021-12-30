import { Flex } from "@chakra-ui/layout";
import { VStack } from "@chakra-ui/react";

import { useProjection } from "../../../../services/projection";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";

interface ReportTableProps {
  date?: Date;
}

export function ReportTable({
  date = new Date(),
}: ReportTableProps): JSX.Element {
  const { timeline, skills } = useProjection(date);

  return (
    <Flex flexDirection="column">
      <TableHeader timeline={timeline} columnLabel={"DEPARTMENT"}></TableHeader>

      <VStack spacing={4} align="stretch">
        {skills.map(({ skill, projections }) => (
          <TableRow key={skill.id} skill={skill} projections={projections} />
        ))}
      </VStack>
    </Flex>
  );
}

export default ReportTable;
