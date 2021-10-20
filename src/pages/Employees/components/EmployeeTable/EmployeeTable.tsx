import { Box, Stack, StackDivider, Skeleton } from "@chakra-ui/react";
import { Image } from "@chakra-ui/image";
import type { Employee } from "../../../../services/api";

import EmployeeCard from "../EmployeeCard";

import FolderWithFileIcon from "../../assets/pngs/FolderWithFile.png";
interface IEmployeeTable {
  loading?: boolean;
  filterValue?: string;
  filteredEmployees: Employee[] | undefined;
  onEdit: (id: string, employee: Employee) => void;
}

export default function EmployeeTable({
  loading,
  filterValue,
  filteredEmployees,
  onEdit,
}: IEmployeeTable): JSX.Element {
  return (
    <Skeleton isLoaded={loading} data-testid="skeleton-loader">
      {filteredEmployees && filteredEmployees.length === 0 && (
        <Box
          width="100%"
          textAlign="center"
          minHeight="30px"
          color="#777"
          padding="82px 30px 153px"
          border="1px solid #eee"
          borderRadius="4px"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Image height="100px" width="100px" src={FolderWithFileIcon} alt="" />
          {!filterValue
            ? "There are currently no team members."
            : `NO RESULTS MATCHING: ${filterValue}`}
        </Box>
      )}

      {filteredEmployees && filteredEmployees.length > 0 && (
        <Stack spacing={4} divider={<StackDivider borderColor="gray.200" />}>
          {filteredEmployees?.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              onSave={(editedEmployee) => onEdit(employee.id, editedEmployee)}
            />
          ))}
        </Stack>
      )}
    </Skeleton>
  );
}
