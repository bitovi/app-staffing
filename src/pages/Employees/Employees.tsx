import { Suspense, useCallback, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/layout";
import type { Employee } from "../../services/api";
import {
  useEmployees as useEmployeesDefault,
  useSkills as useSkillsDefault,
} from "../../services/api";
import EmployeeTable from "./components/EmployeeTable";
import { EmployeeCardSkeleton } from "./components/EmployeeCard/EmployeeCard";

import Button from "../../components/Button";
import EmployeeModal from "./components/EmployeeModal";

interface IEmployees {
  useEmployees: typeof useEmployeesDefault;
  useSkills: typeof useSkillsDefault;
}

export function EmployeePageLoadingLayout(): JSX.Element {
  return (
    <Box>
      <Box
        width="full"
        fontFamily="Arial, Helvetica, sans-serif"
        display="flex"
        justifyContent="space-between"
        padding="20px 0"
      >
        <Box fontSize="27px" color="#222">
          Team
        </Box>
        <Box display="flex" align-items="center" />
      </Box>

      <Box
        padding="30px 0px 10px 0px"
        display="table"
        minHeight="30px"
        width="calc(100% - 60px)"
      >
        <Button
          variant="link"
          disabled={true}
          onClick={() => {
            null;
          }}
        >
          Add Team Member +
        </Button>
      </Box>
      <EmployeeCardSkeleton />
    </Box>
  );
}

export default function EmployeesWrapper(): JSX.Element {
  return (
    <Suspense fallback={<EmployeePageLoadingLayout />}>
      <Employees
        useEmployees={useEmployeesDefault}
        useSkills={useSkillsDefault}
      />
    </Suspense>
  );
}

export function Employees({
  useEmployees,
  useSkills,
}: IEmployees): JSX.Element {
  const { employees, updateEmployee } = useEmployees();
  // const { skills } = useSkills();
  const [employeeModal, setEmployeeModal] = useState<boolean>(false);

  const handleEditSave = useCallback(
    async (id: string, employee: Employee) => {
      employee.name && (await updateEmployee(id, employee)); // @TODO: add a loading spinner to save button
    },
    [updateEmployee],
  );

  // const handleAddEmployee = async () => {
  //   await addEmployee({
  //     name: "",
  //     startDate: new Date(),
  //     skills: [],
  //   }); // @TODO: add a loading spinner to save button
  // };

  // const handleAddEmployee = (form: any) => {
  //   console.log(form);
  // };

  return (
    <Box>
      <EmployeeModal
        isOpen={employeeModal}
        onClose={() => setEmployeeModal(false)}
        onSave={(employeeData) => {
          console.log(employeeData);
        }}
      />

      <Flex
        width="full"
        fontFamily="Arial, Helvetica, sans-serif"
        display="flex"
        justifyContent="space-between"
        padding="20px 0"
      >
        <Text textStyle="title" color="gray.700">
          Team Members
        </Text>

        <Button variant="primary" onClick={() => setEmployeeModal(true)}>
          Add Team Member
        </Button>
      </Flex>

      <Suspense fallback={<EmployeeCardSkeleton />}>
        <EmployeeTable employees={employees} onEdit={handleEditSave} />
      </Suspense>
    </Box>
  );
}
