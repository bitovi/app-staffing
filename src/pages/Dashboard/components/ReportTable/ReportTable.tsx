import { Flex } from "@chakra-ui/layout";
import { VStack } from "@chakra-ui/react";

import TableRow from "./TableRow";
import { useProjection } from "../../../../services/projection/useProjection";
import TableHeader from "./TableHeader";

interface ReportTableProps {
  reportDate?: Date;
}

export function ReportTable({
  reportDate = new Date(),
}: ReportTableProps): JSX.Element {
  const { projections } = useProjection(reportDate);

  return (
    <Flex flexDirection="column">
      <TableHeader date={reportDate} columnLabel={"DEPARTMENT"}></TableHeader>

      <VStack spacing={4} align="stretch">
        {projections.map((item) => (
          <TableRow key={item.role.id} rowData={item} />
        ))}
      </VStack>
    </Flex>
  );
}

export default ReportTable;
