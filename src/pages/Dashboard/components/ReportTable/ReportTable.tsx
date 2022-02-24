import { Flex } from "@chakra-ui/layout";
import { VStack } from "@chakra-ui/react";

import { useProjection } from "../../../../services/projection";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";
import { useSkills } from "../../../../services/api";

interface ReportTableProps {
  date?: Date;
}

export function ReportTable({
  date = new Date(),
}: ReportTableProps): JSX.Element {
  const availableSkills = useSkills();
  const { timeline, skills } = useProjection(date, availableSkills);

  return (
    <Flex flexDirection="column">
      <TableHeader timeline={timeline} columnLabel={"DEPARTMENT"}></TableHeader>

      <VStack spacing={4} align="stretch" maxHeight="73vh" overflowY="auto">
        {skills.map(({ skill, projections }) => (
          <TableRow key={skill.id} skill={skill} projections={projections} />
        ))}
      </VStack>
    </Flex>
  );
}

export default ReportTable;
