import { useState } from "react";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import {
  Employee,
  useEmployeeMutations as useEmployeeMutationsDefault,
} from "../../services/api";
import EmployeeTable from "./components/EmployeeTable";
import { EmployeeCardSkeleton } from "./components/EmployeeCard/EmployeeCard";
import Button from "../../components/Button";
import EmployeeModal from "./components/EmployeeModal";
import EmployeesBreadcrumbs from "./components/EmployeesBreadcrumbs";
import { MemoryRouter } from "react-router-dom";

interface EmployeesProps {
  useEmployeeMutations?: typeof useEmployeeMutationsDefault;
}

export function EmployeePageLoadingLayout(): JSX.Element {
  return (
    <Box>
      <Box
        position="sticky"
        top="0"
        background="gray.10"
        padding="40px"
        paddingBottom="1em"
        zIndex="10"
      >
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
      </Box>
      <Box mt="48px">
        <EmployeeCardSkeleton />
      </Box>
    </Box>
  );
}

export default function Employees({
  useEmployeeMutations = useEmployeeMutationsDefault,
}: EmployeesProps): JSX.Element {
  const { createEmployee, updateEmployee, destroyEmployee } =
    useEmployeeMutations();

  const [employeeModal, setEmployeeModal] = useState<boolean>(false);

  const addNewEmployee = async (data: Omit<Employee, "id">) => {
    await createEmployee(data);
  };
  return (
    <MemoryRouter>
      <Box>
        {employeeModal && (
          <EmployeeModal
            isOpen={employeeModal}
            onClose={() => setEmployeeModal(false)}
            onSave={addNewEmployee}
          />
        )}

        <Box
          position="sticky"
          top="0"
          background="gray.10"
          padding="40px"
          paddingBottom="0"
          zIndex="10"
        >
          <EmployeesBreadcrumbs />

          <Flex
            width="full"
            fontFamily="Arial, Helvetica, sans-serif"
            display="flex"
            justifyContent="space-between"
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
        </Box>

        <EmployeeTable
          mt="32px"
          updateEmployee={updateEmployee}
          destroyEmployee={destroyEmployee}
        />
      </Box>
    </MemoryRouter>
  );
}
