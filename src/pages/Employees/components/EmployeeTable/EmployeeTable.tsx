import {
  Box,
  BoxProps,
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/image";
import type { Employee } from "../../../../services/api";
import EmployeeCard from "../EmployeeCard";

interface IEmployeeTable extends BoxProps {
  employees: Employee[] | undefined;
  deleteEmployee: (employeeId: string) => Promise<void>;
  onEdit: (id: string, employee: Employee) => void;
}

export default function EmployeeTable({
  employees,
  deleteEmployee,
  onEdit,
  ...props
}: IEmployeeTable): JSX.Element {
  return (
    <Box {...props}>
      {employees && employees.length === 0 && (
        <Flex
          width="100%"
          flexDirection="column"
          minHeight="30px"
          boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
          backgroundColor="white"
          padding="82px 30px 153px"
          border="1px solid #eee"
          borderRadius="4px"
          alignItems="center"
        >
          <Image
            height="100px"
            width="100px"
            src="assets/images/folderWithFile.png"
            alt="Folder With File"
          />
          <Text fontWeight="bold" fontSize="16px" lineHeight="24px">
            There are currently no team members.
          </Text>
        </Flex>
      )}

      {employees && employees.length > 0 && (
        <>
          <Box maxHeight="80vh" overflowY="auto">
            <Table>
              <Thead position="sticky" top="0" zIndex="sticky" bg="gray.10">
                <Tr>
                  <Th pt="0px" pb={4} color="gray.800" textStyle="table.title">
                    EMPLOYEE NAME
                  </Th>
                  <Th pt="0px" pb={4} color="gray.800" textStyle="table.title">
                    START DATE
                  </Th>
                  <Th pt="0px" pb={4} color="gray.800" textStyle="table.title">
                    END DATE
                  </Th>
                  <Th pt="0px" pb={4} color="gray.800" textStyle="table.title">
                    ROLES
                  </Th>
                  <Th
                    pt="0px"
                    pb={4}
                    pr={12}
                    color="gray.800"
                    textStyle="table.title"
                    isNumeric
                  >
                    ACTIONS
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {employees?.map((employee, index) => (
                  <EmployeeTableRow
                    key={employee.id}
                    deleteEmployee={deleteEmployee}
                    employee={employee}
                  >
                    {employees.length - 1 !== index && <Tr height={4}></Tr>}
                  </EmployeeTableRow>
                ))}
              </Tbody>
            </Table>
          </Box>
        </>
      )}
    </Box>
  );
}

const EmployeeTableRow = ({
  employee,
  children,
  deleteEmployee,
}: {
  employee: Employee;
  deleteEmployee: (employeeId: string) => Promise<void>;
  children: JSX.Element | boolean;
}): JSX.Element => {
  return (
    <>
      <EmployeeCard deleteEmployee={deleteEmployee} employee={employee} />
      {children}
    </>
  );
};
