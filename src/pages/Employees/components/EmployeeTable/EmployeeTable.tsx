import { Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { Image } from "@chakra-ui/image";
import type { Employee } from "../../../../services/api";
import EmployeeCard from "../EmployeeCard";

interface IEmployeeTable {
  employees: Employee[] | undefined;
  onEdit: (id: string, employee: Employee) => void;
}

export default function EmployeeTable({
  employees,
  onEdit,
}: IEmployeeTable): JSX.Element {
  return (
    <>
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
          <SimpleGrid mt="48px" columns={5}>
            <Text color="gray.800" textStyle="table.title">
              EMPLOYEE NAME
            </Text>
            <Text color="gray.800" textStyle="table.title">
              START DATE
            </Text>
            <Text color="gray.800" textStyle="table.title">
              END DATE
            </Text>
            <Text color="gray.800" textStyle="table.title">
              ROLES
            </Text>
            <Text color="gray.800" textStyle="table.title" justifySelf="end">
              ACTIONS
            </Text>
          </SimpleGrid>

          {employees?.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </>
      )}
    </>
  );
}
