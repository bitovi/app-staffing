import { Stack, StackDivider } from "@chakra-ui/layout";
import type { Employee } from "../../../../services/api";

import EmployeeCard from "../EmployeeCard";

import styles from "./EmployeeTable.module.scss";

export default function EmployeeTable({
  filterValue,
  filteredEmployees,
  onEdit,
}: {
  filterValue?: string;
  filteredEmployees: Employee[];
  onEdit: (id: string, employee: Employee) => void;
}): JSX.Element {
  if (!filteredEmployees.length) {
    return (
      <div className={styles.noResults}>NO RESULTS MATCHING: {filterValue}</div>
    );
  }

  return (
    <Stack spacing={4} divider={<StackDivider borderColor="gray.200" />}>
      {filteredEmployees.map((employee) => (
        <EmployeeCard
          key={employee.id}
          employee={employee}
          onSave={(editedEmployee) => onEdit(employee.id, editedEmployee)}
        />
      ))}
    </Stack>
  );
}
