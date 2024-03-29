import { useEffect, useState } from "react";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import {
  Employee,
  useEmployeeMutations as useEmployeeMutationsDefault,
  useEmployees as useEmployeesDefault,
} from "../../services/api";
import EmployeeTableWrapper from "./components/EmployeeTable";
import { EmployeeCardSkeleton } from "./components/EmployeeCard/EmployeeCard";
import Button from "../../components/Button";
import EmployeeModal from "./components/EmployeeModal";
import EmployeesBreadcrumbs from "./components/EmployeesBreadcrumbs";
import { Tabs, TabList, Tab } from "@chakra-ui/react";
import FilterBar from "../FilterBar";

interface EmployeesProps {
  useEmployeeMutations?: typeof useEmployeeMutationsDefault;
  useEmployees?: typeof useEmployeesDefault;
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
  useEmployees = useEmployeesDefault,
}: EmployeesProps): JSX.Element {
  useEffect(() => {
    document.title = "Team Members - Staffing App";
  }, []);

  const { createEmployee, updateEmployee, destroyEmployee } =
    useEmployeeMutations();

  const [employeeModal, setEmployeeModal] = useState<boolean>(false);
  const [showActiveEmployees, setShowActiveEmployees] = useState(true);
  const [showInactiveEmployees, setShowInactiveEmployees] = useState(false);
  const [filters, setFilters] = useState<string[]>([]);

  const tabIndex =
    showActiveEmployees && showInactiveEmployees
      ? 2
      : showInactiveEmployees
      ? 1
      : 0;

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
        <TeamMemberTabs
          onChange={({
            active,
            inactive,
          }: {
            active: boolean;
            inactive: boolean;
          }) => {
            setShowActiveEmployees(active);
            setShowInactiveEmployees(inactive);
          }}
          defaultIndex={tabIndex}
        />
      </Box>
      <FilterBar
        onFilterChange={(arr: string[]) => setFilters(arr)}
        placeholder="Search by name, skills, or current project"
      ></FilterBar>
      <EmployeeTableWrapper
        mt="32px"
        updateEmployee={updateEmployee}
        destroyEmployee={destroyEmployee}
        showActiveEmployees={showActiveEmployees}
        showInactiveEmployees={showInactiveEmployees}
        useEmployees={useEmployees}
        filters={filters}
      />
    </Box>
  );
}

function TeamMemberTabs({
  onChange,
  defaultIndex = 0,
}: {
  onChange: (e: { active: boolean; inactive: boolean }) => void;
  defaultIndex?: number;
}): JSX.Element {
  const onTabChange = (index: number) => {
    switch (index) {
      case 0:
        onChange({ active: true, inactive: false });
        break;
      case 1:
        onChange({ active: false, inactive: true });
        break;
      case 2:
        onChange({ active: true, inactive: true });
        break;
    }
  };

  return (
    <Tabs
      size="lg"
      variant="line"
      defaultIndex={defaultIndex}
      onChange={onTabChange}
      mt="5px"
    >
      <TabList>
        <Tab>Active</Tab>
        <Tab>Inactive</Tab>
        <Tab>Both</Tab>
      </TabList>
    </Tabs>
  );
}
