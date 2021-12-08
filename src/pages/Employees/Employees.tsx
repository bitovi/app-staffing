import { Suspense, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/layout";
import {
  useEmployees as useEmployeesDefault,
  useSkills as useSkillsDefault,
} from "../../services/api";
import EmployeeTable from "./components/EmployeeTable";
import { EmployeeCardSkeleton } from "./components/EmployeeCard/EmployeeCard";
import Button from "../../components/Button";
import EmployeeModal from "./components/EmployeeModal";
import { EmployeeJSON } from "../../services/api/employees";
import { useToast } from "@chakra-ui/toast";

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
          onClick={() => {
            null;
          }}
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
  const { useEmployeeList, useEmployeeActions } = useEmployees();
  const { addEmployee, updateEmployee, deleteEmployee } = useEmployeeActions();
  const { data: employees } = useEmployeeList();

  const { skills } = useSkills();
  const [employeeModal, setEmployeeModal] = useState<boolean>(false);

  const toast = useToast();

  const addNewEmployee = async (data: Omit<EmployeeJSON, "id">) => {
    await addEmployee({ data });
    toast({
      title: "Team member added",
      description: ` ${data.attributes.name} was successfully added!`,
      duration: 5000,
      isClosable: false,
      position: "bottom-right",
      variant: "left-accent",
      status: "success",
    });
  };

  return (
    <Box maxHeight="100%">
      <EmployeeModal
        isOpen={employeeModal}
        onClose={() => setEmployeeModal(false)}
        onSave={addNewEmployee}
        skills={skills}
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
          arialabel="Add Employee"
        >
          Add Team Member
        </Button>
      </Flex>

      <EmployeeTable
        mt="48px"
        updateEmployee={updateEmployee}
        deleteEmployee={deleteEmployee}
        employees={employees}
        skills={skills}
      />
    </Box>
  );
}
