import { useState, Dispatch, SetStateAction } from "react";
import {
  Box,
  BoxProps,
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/image";
import { isEmpty } from "lodash";
import type { Employee, Skill } from "../../../../services/api";
import EmployeeCard from "../EmployeeCard";
import ConfirmationModal from "../../../../components/ConfirmationModal";
import EmployeeModal from "../EmployeeModal";
import { EmployeeJSON } from "../../../../services/api/employees/interfaces";

interface IEmployeeTable extends BoxProps {
  employees: Employee[] | undefined;
  skills?: Skill[];
  updateEmployee: ({
    data,
    id,
  }: {
    data: Omit<EmployeeJSON, "id">;
    id?: string;
  }) => Promise<void>;
  deleteEmployee: (employeeId: string) => Promise<void>;
}

export default function EmployeeTable({
  employees,
  updateEmployee,
  deleteEmployee,
  skills,
  ...props
}: IEmployeeTable): JSX.Element {
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(
    null,
  );
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null);

  const removeEmployee = async () => {
    if (employeeToDelete) {
      try {
        await deleteEmployee(employeeToDelete.id);
        setEmployeeToDelete(null);
      } catch (e) {
        //ERROR HANDLING
      }
    }
  };

  const lastEmployeeIndex = Array.isArray(employees)
    ? employees.length - 1
    : -1;

  return (
    <>
      <ConfirmationModal
        isOpen={!isEmpty(employeeToDelete)}
        onClose={() => {
          setEmployeeToDelete(null);
        }}
        onConfirm={removeEmployee}
        title="Delete Team Member"
        message={`You are about to remove ${
          employeeToDelete ? employeeToDelete.name : "no one"
        }. This can't be undone.`}
        closeText="Cancel"
        confirmText="Delete Team Member"
        confirmButtonVariant="modalConfirm"
        modalSize="lg"
      />
      <EmployeeModal
        isOpen={!isEmpty(employeeToEdit)}
        onClose={() => setEmployeeToEdit(null)}
        onSave={updateEmployee}
        skills={skills}
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
            <Box maxHeight="80vh" overflowY="auto">
              <Table>
                <Thead
                  py={4}
                  position="sticky"
                  top="0"
                  zIndex="sticky"
                  bg="gray.10"
                >
                  <Tr>
                    <Th color="gray.800" textStyle="table.title">
                      EMPLOYEE NAME
                    </Th>
                    <Th color="gray.800" textStyle="table.title">
                      START DATE
                    </Th>
                    <Th color="gray.800" textStyle="table.title">
                      END DATE
                    </Th>
                    <Th color="gray.800" textStyle="table.title">
                      ROLES
                    </Th>
                    <Th
                      py={4}
                      pr={12}
                      color="gray.800"
                      textStyle="table.title"
                      isNumeric
                    >
                      ACTIONS
                    </Th>
                  </Tr>
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
