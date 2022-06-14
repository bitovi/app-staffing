import { Suspense, useState, useMemo } from "react";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Switch, FormLabel, FormControl } from "@chakra-ui/react";
import omit from "lodash/omit";
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
  const skillsWithEmployees = useSkills({
    include: [
      "employees.skills",
      "employees.assignments.role.skills",
      "employees.assignments.role.project",
    ],
  });
  const skills = skillsWithEmployees.map((skill) => omit(skill, ["employees"]));

  const [showInactiveEmployees, setShowInactiveEmployees] = useState(false);
  const activeEmployees = useMemo(
    () =>
      employees.filter((emp) =>
        showInactiveEmployees
          ? emp.endDate != null && emp.endDate <= new Date()
          : emp.endDate == null || emp.endDate > new Date(),
      ),
    [employees, showInactiveEmployees],
  );

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

        <FormControl
          display="flex"
          alignItems="center"
          justifyContent="end"
          marginTop="2em"
        >
          <FormLabel htmlFor="showInactiveEmployees" mb="0">
            Show inactive team members
          </FormLabel>
          <Switch
            id="showInactiveEmployees"
            isChecked={showInactiveEmployees}
            onChange={({ target }) => setShowInactiveEmployees(target.checked)}
          />
        </FormControl>
      </Box>

      <EmployeeTable
        mt="32px"
        updateEmployee={updateEmployee}
        destroyEmployee={destroyEmployee}
        employees={activeEmployees}
        skills={skills}
      />
    </Box>
  );
}
