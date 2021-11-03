import { Suspense, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/layout";
// import type { Employee } from "../../services/api";
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
      <Flex
        width="full"
        fontFamily="Arial, Helvetica, sans-serif"
        display="flex"
        justifyContent="space-between"
      >
        <Text textStyle="title" color="gray.700">
          Team Members
        </Text>

        <Button
          size="lg"
          variant="primary"
          onClick={() => { null }}
        >
          Add Team Member
        </Button>
      </Flex>
      <Box mt="48px">
        <EmployeeCardSkeleton />
      </Box>
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
  const { employees } = useEmployees();
  const { skills } = useSkills();
  const [employeeModal, setEmployeeModal] = useState<boolean>(false);

  console.log("employees", employees);
  console.log("skills", skills);

  // const handleEditSave = useCallback(
  //   async (id: string, employee: Employee) => {
  //     employee.name && (await updateEmployee(id, employee)); // @TODO: add a loading spinner to save button
  //   },
  //   [updateEmployee],
  // );

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
    <Box maxHeight="100%" /*overflow="scroll"*/>
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
      >
        <Text textStyle="title" color="gray.700">
          Team Members
        </Text>

        <Button
          size="lg"
          variant="primary"
          onClick={() => setEmployeeModal(true)}
        >
          Add Team Member
        </Button>
      </Flex>

      <Suspense fallback={<EmployeeCardSkeleton />}>
        <EmployeeTable
          mt="48px"
          employees={employees}
          onEdit={() => undefined}
        />
      </Suspense>
    </Box>
  );
}
