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
import { useSort } from "../../../../services/helpers/useSort/useSort";

interface EmployeeTableWrapperProps extends BoxProps {
  updateEmployee: (id: string, data: Partial<Employee>) => Promise<void>;
  destroyEmployee: (id: string) => Promise<void>;
  showActiveEmployees: boolean;
  showInactiveEmployees: boolean;
  filters?: string[];
  useEmployees?: typeof useEmployeesDefault;
}

export default function EmployeeTableWrapper({
  updateEmployee,
  destroyEmployee,
  showActiveEmployees,
  showInactiveEmployees,
  filters,
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
          filters={filters}
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
  filters?: string[];
  useEmployees: typeof useEmployeesDefault;
}

function EmployeeTable({
  showActiveEmployees,
  showInactiveEmployees,
  updateEmployee,
  destroyEmployee,
  filters,
  useEmployees = useEmployeesDefault,
}: EmployeeTableProps) {
  const { sortData, updateSortData } = useSort();

  const employeesFetched = useEmployees({
    include: ["skills", "assignments.role.project"],
  });

  const employees = useMemo(() => {
    return orderBy(
      employeesFetched
        ?.filter(
          (emp) =>
            (showInactiveEmployees &&
              emp.endDate != null &&
              emp.endDate < new Date()) ||
            (showActiveEmployees &&
              (emp.endDate == null || emp.endDate > new Date())),
        )
        ?.filter((emp) => {
          // filterBar filters come in already lower case and apply to name, current project, and/or skills
          // emp.name,
          // emp.assignments?.[0]?.role?.project.name,
          // emp.skills[].name
          if (!filters || !filters.length) {
            return true;
          }
          // every filter needs to match at least once for the row to be included
          return filters.every((filter) => {
            if (emp.name.toLocaleLowerCase().indexOf(filter) > -1) {
              return true;
            }
            const projName = (
              emp.assignments?.[0]?.role?.project.name || ""
            ).toLocaleLowerCase();
            if (projName.indexOf(filter) > -1) {
              return true;
            }
            if (
              emp.skills.some(
                (s) => s.name.toLocaleLowerCase().indexOf(filter) > -1,
              )
            ) {
              return true;
            }
            return false;
          });
        }),
      [sortData.iteratee],
      [sortData.order],
    );
  }, [
    employeesFetched,
    showActiveEmployees,
    showInactiveEmployees,
    sortData,
    filters,
  ]);

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
          <EmployeeTableHeader
            changeSort={updateSortData}
            sortData={sortData}
          />
        </Thead>
        <Tbody>
          {employees.map((employee, index) => (
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
  );
}
