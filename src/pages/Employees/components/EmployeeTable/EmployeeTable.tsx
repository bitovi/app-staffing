import { useState, Dispatch, SetStateAction } from "react";
import {
  Box,
  BoxProps,
  Flex,
  Table,
  Tbody,
  Text,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/image";
import isEmpty from "lodash/isEmpty";
import type { Employee } from "../../../../services/api";
import EmployeeCard from "../EmployeeCard";
import ConfirmationModal from "../../../../components/ConfirmationModal";
import EmployeeModal from "../EmployeeModal";
import orderBy from "lodash/orderBy";
import EmployeeTableHeader from "./components/EmployeeTableHeader/EmployeeTableHeader";

interface EmployeeTableProps extends BoxProps {
  employees: Employee[] | undefined;
  updateEmployee: (id: string, data: Employee) => Promise<void>;
  destroyEmployee: (employeeId: string) => Promise<void>;
}

export default function EmployeeTable({
  employees,
  updateEmployee,
  destroyEmployee,
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

  const lastEmployeeIndex = Array.isArray(employees)
    ? employees.length - 1
    : -1;

  return (
    <>
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
            <Box paddingInline="40px" marginBottom="40px">
              <Table>
                <Thead py={4}>
                  <EmployeeTableHeader />
                </Thead>
                <Tbody>
                  {orderBy(employees, [
                    (employee) => employee.name.toLowerCase(),
                  ]).map((employee, index) => (
                    <EmployeeTableRow
                      key={employee.id}
                      handleEditEmployee={setEmployeeToEdit}
                      handleDeleteEmployee={setEmployeeToDelete}
                      employee={employee}
                      lastChild={lastEmployeeIndex === index}
                    />
                  ))}
                </Tbody>
              </Table>
            </Box>
          </>
        )}
      </Box>
    </>
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
