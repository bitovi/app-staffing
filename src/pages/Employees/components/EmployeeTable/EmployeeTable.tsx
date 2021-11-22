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
import type { Employee } from "../../../../services/api";
import EmployeeCard from "../EmployeeCard";
import { Dispatch, useState, useCallback } from "react";
import ConfirmationModal from "../../../../components/ConfirmationModal";

interface IEmployeeTable extends BoxProps {
  employees: Employee[] | undefined;
  deleteEmployee: (employeeId: string) => Promise<void>;
  onEdit: (id: string, employee: Employee) => void;
}

export default function EmployeeTable({
  employees,
  deleteEmployee,
  onEdit,
  ...props
}: IEmployeeTable): JSX.Element {
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(
    null,
  );

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

  const generateRows = useCallback(() => {
    return employees?.map(
      (employee, index): JSX.Element => (
        <EmployeeTableRow
          setEmployeeToDelete={setEmployeeToDelete}
          key={employee.id}
          employee={employee}
        >
          {employees.length - 1 !== index && <Tr height={4}></Tr>}
        </EmployeeTableRow>
      ),
    );
  }, [employees]);

  const closeModal = () => {
    setEmployeeToDelete(null);
  };

  return (
    <>
      <ConfirmationModal
        isOpen={employeeToDelete ? true : false}
        onClose={() => closeModal()}
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
                <Tbody>{generateRows()}</Tbody>
              </Table>
            </Box>
          </>
        )}
      </Box>
    </>
  );
}

export const EmployeeTableRow = ({
  employee,
  children,
  setEmployeeToDelete,
}: {
  employee: Employee;
  children: JSX.Element | boolean;
  setEmployeeToDelete: Dispatch<Employee | null>;
}): JSX.Element => {
  return (
    <>
      <EmployeeCard
        setEmployeeToDelete={setEmployeeToDelete}
        employee={employee}
      />
      {children}
    </>
  );
};
