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
  onEdit: (id: string, employee: Employee) => void;
}

export default function EmployeeTable({
  employees,
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
          <Table>
            <Thead>
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
                  isNumeric
                  color="gray.800"
                  textStyle="table.title"
                >
                  ACTIONS
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {employees?.map((employee) => (
                <>
                  <EmployeeCard key={employee.id} employee={employee} />
                  <Box height={4} />
                </>
              ))}
            </Tbody>
          </Table>
        </>
      )}
    </Box>
  );
}
