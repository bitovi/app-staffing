import { useState, Dispatch, SetStateAction, Suspense, useMemo } from "react";
import {
  Box,
  BoxProps,
  Flex,
  FormControl,
  FormLabel,
  Switch,
  Table,
  Tbody,
  Text,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/image";
import isEmpty from "lodash/isEmpty";
import {
  Employee,
  useEmployees as useEmployeesDefault,
} from "../../../../services/api";
import EmployeeCard, { EmployeeCardSkeleton } from "../EmployeeCard";
import ConfirmationModal from "../../../../components/ConfirmationModal";
import EmployeeModal from "../EmployeeModal";
import orderBy from "lodash/orderBy";
import EmployeeTableHeader from "./components/EmployeeTableHeader/EmployeeTableHeader";

interface EmployeeTableProps extends BoxProps {
  updateEmployee: (id: string, data: Employee) => Promise<void>;
  destroyEmployee: (employeeId: string) => Promise<void>;
  useEmployees?: typeof useEmployeesDefault;
}

export default function EmployeeTable({
  updateEmployee,
  destroyEmployee,
  useEmployees = useEmployeesDefault,
  ...props
}: EmployeeTableProps): JSX.Element {
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(
    null,
  );
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null);

  const submitUpdateEmployee = async (employeeToUpdate: Employee) => {
    if (employeeToEdit) {
      const id = employeeToEdit.id;
      await updateEmployee(id, employeeToUpdate);
    }
  };

  const [showInactiveEmployees, setShowInactiveEmployees] = useState(false);

  return (
    <>
      <TeamMemberSwitch
        onChange={(e) => setShowInactiveEmployees(e.target.checked)}
        isChecked={showInactiveEmployees}
      />
      <Suspense fallback={<EmployeeCardSkeleton />}>
        <DeleteConfirmationModal
          key={employeeToDelete ? employeeToDelete.id : undefined}
          employee={employeeToDelete}
          setEmployee={setEmployeeToDelete}
          destroyEmployee={destroyEmployee}
        />
        <EmployeeModal
          isOpen={!isEmpty(employeeToEdit)}
          onClose={() => setEmployeeToEdit(null)}
          onSave={(employee) => submitUpdateEmployee(employee as Employee)}
          employee={employeeToEdit ? employeeToEdit : undefined}
        />
        <Box {...props}>
          <EmployeeTableView
            setEmployeeToEdit={setEmployeeToEdit}
            setEmployeeToDelete={setEmployeeToDelete}
            showInactiveEmployees={showInactiveEmployees}
            useEmployees={useEmployees}
          />
        </Box>
      </Suspense>
    </>
  );
}

function TeamMemberSwitch({
  onChange,
  isChecked,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isChecked: boolean;
}): JSX.Element {
  return (
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
        isChecked={isChecked}
        onChange={onChange}
      />
    </FormControl>
  );
}

interface EmployeeTableViewProps {
  showInactiveEmployees: boolean;
  setEmployeeToDelete: Dispatch<SetStateAction<Employee | null>>;
  setEmployeeToEdit: Dispatch<SetStateAction<Employee | null>>;
  useEmployees: typeof useEmployeesDefault;
}

function EmployeeTableView({
  showInactiveEmployees,
  setEmployeeToDelete,
  setEmployeeToEdit,
  useEmployees,
}: EmployeeTableViewProps) {
  const employeesFetched = useEmployees({ include: "skills", sort: "name" });

  const employees = useMemo(
    () =>
      employeesFetched.filter((emp) =>
        showInactiveEmployees
          ? true
          : emp.endDate == null || emp.endDate > new Date(),
      ),
    [employeesFetched, showInactiveEmployees],
  );

  const lastEmployeeIndex = Array.isArray(employees)
    ? employees.length - 1
    : -1;

  if (employees.length === 0) {
    return <NoResults />;
  }

  return (
    <Box paddingInline="40px" marginBottom="40px">
      <Table>
        <Thead py={4}>
          <EmployeeTableHeader />
        </Thead>
        <Tbody>
          {orderBy(employees, [(employee) => employee.name.toLowerCase()]).map(
            (employee, index) => (
              <EmployeeTableRow
                key={employee.id}
                handleEditEmployee={setEmployeeToEdit}
                handleDeleteEmployee={setEmployeeToDelete}
                employee={employee}
                lastChild={lastEmployeeIndex === index}
              />
            ),
          )}
        </Tbody>
      </Table>
    </Box>
  );
}

function NoResults() {
  return (
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
  );
}

function EmployeeTableRow({
  employee,
  handleEditEmployee,
  handleDeleteEmployee,
  lastChild = false,
}: {
  employee: Employee;
  handleEditEmployee: Dispatch<SetStateAction<Employee | null>>;
  handleDeleteEmployee: Dispatch<SetStateAction<Employee | null>>;
  lastChild: boolean;
}) {
  return (
    <>
      <EmployeeCard
        employee={employee}
        handleEditEmployee={handleEditEmployee}
        handleDeleteEmployee={handleDeleteEmployee}
      />
      {/* add space between rows */}
      {!lastChild && <Tr height={4} />}
    </>
  );
}

function DeleteConfirmationModal({
  employee,
  setEmployee,
  destroyEmployee,
}: {
  employee: Employee | null;
  setEmployee: (employee: Employee | null) => void;
  destroyEmployee: (employeeId: string) => Promise<void>;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isOpen = employee != null;

  const onClose = () => {
    setEmployee(null);
  };

  const onConfirm = async () => {
    if (!employee) return;

    setIsLoading(true);

    try {
      await destroyEmployee(employee.id);
      setIsLoading(false);
      setEmployee(null);
    } catch (error) {
      setIsLoading(false);
      setError((error as Error).message);
    }
  };

  return (
    <ConfirmationModal
      isOpen={isOpen}
      error={error || undefined}
      isLoading={isLoading}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Delete Team Member"
      closeText="Cancel"
      confirmText="Delete Team Member"
      variant="modalConfirm"
      loadingText="Deleting Team Member ..."
      modalSize="lg"
      message={
        employee
          ? `You are about to remove ${employee.name}. This can't be undone.`
          : ""
      }
    />
  );
}
