import { Suspense, useMemo, useState } from "react";
import { Box, BoxProps, Table, Tbody, Thead } from "@chakra-ui/react";
import {
  Employee,
  useEmployees as useEmployeesDefault,
} from "../../../../services/api";
import { EmployeeCardSkeleton } from "../EmployeeCard";
import orderBy from "lodash/orderBy";
import EmployeeTableHeader from "./components/EmployeeTableHeader";
import { EmployeeTableNoResults } from "./components/EmployeeTableNoResults";
import EmployeeTableRow from "./components/EmployeeTableRow";
import { isEmpty } from "lodash";
import EmployeeModal from "../EmployeeModal";
import DeleteConfirmationModal from "../EmployeeDeleteConfirmationModal";

interface EmployeeTableWrapperProps extends BoxProps {
  updateEmployee: (id: string, data: Partial<Employee>) => Promise<void>;
  destroyEmployee: (id: string) => Promise<void>;
  showActiveEmployees: boolean;
  showInactiveEmployees: boolean;
  useEmployees?: typeof useEmployeesDefault;
}

export default function EmployeeTableWrapper({
  updateEmployee,
  destroyEmployee,
  showActiveEmployees,
  showInactiveEmployees,
  useEmployees = useEmployeesDefault,
  ...props
}: EmployeeTableWrapperProps): JSX.Element {
  return (
    <Suspense fallback={<EmployeeCardSkeleton />}>
      <Box {...props}>
        <EmployeeTable
          updateEmployee={updateEmployee}
          destroyEmployee={destroyEmployee}
          showActiveEmployees={showActiveEmployees}
          showInactiveEmployees={showInactiveEmployees}
          useEmployees={useEmployees}
        />
      </Box>
    </Suspense>
  );
}

interface EmployeeTableProps {
  showActiveEmployees: boolean;
  showInactiveEmployees: boolean;
  updateEmployee: (id: string, data: Partial<Employee>) => Promise<void>;
  destroyEmployee: (id: string) => Promise<void>;
  useEmployees: typeof useEmployeesDefault;
}

function EmployeeTable({
  showActiveEmployees,
  showInactiveEmployees,
  updateEmployee,
  destroyEmployee,
  useEmployees = useEmployeesDefault,
}: EmployeeTableProps) {
  const employeesFetched = useEmployees({ include: "skills", sort: "name" });

  const employees = useMemo(
    () =>
      employeesFetched?.filter(
        (emp) =>
          (showInactiveEmployees &&
            emp.endDate != null &&
            emp.endDate < new Date()) ||
          (showActiveEmployees &&
            (emp.endDate == null || emp.endDate > new Date())),
      ),
    [employeesFetched, showActiveEmployees, showInactiveEmployees],
  );

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

  if (employees.length === 0) {
    return <EmployeeTableNoResults />;
  }

  return (
    <Box paddingInline="40px" marginBottom="40px">
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
