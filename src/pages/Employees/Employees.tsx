import { Suspense, useState } from "react";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import {
  Employee,
  useEmployees as useEmployeesDefault,
  useEmployeeMutations as useEmployeeMutationsDefault,
  useSkills as useSkillsDefault,
} from "../../services/api";
import EmployeeTable from "./components/EmployeeTable";
import { EmployeeCardSkeleton } from "./components/EmployeeCard/EmployeeCard";
import Button from "../../components/Button";
import EmployeeModal from "./components/EmployeeModal";
import EmployeesBreadcrumbs from "./components/EmployeesBreadcrumbs";

interface EmployeesProps {
  useEmployees: typeof useEmployeesDefault;
  useEmployeeMutations: typeof useEmployeeMutationsDefault;
  useSkills: typeof useSkillsDefault;
}

export function EmployeePageLoadingLayout(): JSX.Element {
  return (
    <Box>
      <EmployeesBreadcrumbs />
      <Flex
        width="full"
        fontFamily="Arial, Helvetica, sans-serif"
        display="flex"
        justifyContent="space-between"
      >
        <Heading as="h1" textStyle="title" color="gray.700">
          Team Members
        </Heading>

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
        useEmployeeMutations={useEmployeeMutationsDefault}
        useSkills={useSkillsDefault}
      />
    </Suspense>
  );
}

export function Employees({
  useEmployees,
  useEmployeeMutations,
  useSkills,
}: EmployeesProps): JSX.Element {
  const { createEmployee, updateEmployee, destroyEmployee } =
    useEmployeeMutations();
  const employees = useEmployees({ include: "skills", sort: "name" });
  const skills = useSkills();

  const [employeeModal, setEmployeeModal] = useState<boolean>(false);

  const addNewEmployee = async (data: Omit<Employee, "id">) => {
    await createEmployee(data);
  };
  return (
    <Box>
      {employeeModal && (
        <EmployeeModal
          isOpen={employeeModal}
          onClose={() => setEmployeeModal(false)}
          onSave={addNewEmployee}
          skills={skills}
        />
      )}

      <EmployeesBreadcrumbs />

      <Flex
        width="full"
        fontFamily="Arial, Helvetica, sans-serif"
        display="flex"
        justifyContent="space-between"
        position="sticky"
        top="0"
      >
        <Heading
          as="h1"
          textStyle="title"
          color="gray.700"
          data-testid="employeesTitle"
        >
          Team Members
        </Heading>

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
        destroyEmployee={destroyEmployee}
        employees={employees}
        skills={skills}
      />
    </Box>
  );
}
