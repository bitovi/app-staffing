import React, { useState } from "react";
import { Button, createTheme, ThemeProvider } from "@mui/material";
import { Button as ChakraButton } from "@chakra-ui/react";
import isEmpty from "lodash/isEmpty";

import { Employee as EmployeeSchema } from "../schemas";
import { ScaffoldListPage } from "./ScaffoldListPage";
import { ScaffoldExtraColumn, ScaffoldFieldColumn } from "./ScaffoldColumns";
import { Employee, useEmployeeMutations } from "../../services/api";
import DeleteConfirmationModal from "../../pages/Employees/components/EmployeeDeleteConfirmationModal/DeleteConfirmationModal";
import EmployeeModal from "../../pages/Employees/components/EmployeeModal";

const ActionButtons: React.FC<{
  value: any;
  setEmployeeToEdit: React.Dispatch<React.SetStateAction<Employee | null>>;
  setEmployeeToDelete: React.Dispatch<React.SetStateAction<Employee | null>>;
}> = ({ value, setEmployeeToEdit, setEmployeeToDelete }) => {
  return (
    <>
      <Button variant="text" onClick={() => setEmployeeToEdit(value)}>
        Edit
      </Button>
      <Button variant="text" onClick={() => setEmployeeToDelete(value)}>
        Delete
      </Button>
    </>
  );
};

const CreateEmployee: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => {
  return (
    <ChakraButton size="lg" variant="primary" onClick={onClick}>
      Add Team Member
    </ChakraButton>
  );
};

const EmployeesListPage: React.FC = () => {
  const { createEmployee, updateEmployee, destroyEmployee } =
    useEmployeeMutations();

  const [showEmployeeModal, setShowEmployeeModal] = useState<boolean>(false);
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(
    null,
  );

  const submitUpdateEmployee = async (employeeToUpdate: Employee) => {
    if (employeeToEdit) {
      const id = employeeToEdit.id;
      await updateEmployee(id, employeeToUpdate);
    }
  };

  const addNewEmployee = async (data: Omit<Employee, "id">) => {
    await createEmployee(data);
  };

  return (
    <>
      <DeleteConfirmationModal
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
      <EmployeeModal
        isOpen={showEmployeeModal}
        onClose={() => setShowEmployeeModal(false)}
        onSave={addNewEmployee}
      />
      <ScaffoldListPage schema={EmployeeSchema}>
        <ScaffoldFieldColumn label="ID" field="id" />
        <ScaffoldFieldColumn label="Name" field="name" />
        <ScaffoldFieldColumn label="Start" field="start_date" />
        <ScaffoldFieldColumn label="End" field="end_date" />
        <ScaffoldFieldColumn label="Skills" field="skills" />
        <ScaffoldExtraColumn
          label="Actions"
          ValueComponent={({ value }) => (
            <ActionButtons
              value={value}
              setEmployeeToDelete={setEmployeeToDelete}
              setEmployeeToEdit={setEmployeeToEdit}
            />
          )}
        />
      </ScaffoldListPage>
    </>
  );
  // return (
  //   <>
  //     <DeleteConfirmationModal
  //       employee={employeeToDelete}
  //       setEmployee={setEmployeeToDelete}
  //       destroyEmployee={destroyEmployee}
  //     />
  //     <EmployeeModal
  //       isOpen={!isEmpty(employeeToEdit)}
  //       onClose={() => setEmployeeToEdit(null)}
  //       onSave={(employee) => submitUpdateEmployee(employee as Employee)}
  //       employee={employeeToEdit ? employeeToEdit : undefined}
  //     />
  //     <EmployeeModal
  //       isOpen={showEmployeeModal}
  //       onClose={() => setShowEmployeeModal(false)}
  //       onSave={addNewEmployee}
  //     />
  //     <ScaffoldListPage
  //       schema={EmployeeSchema}
  //       ActionComponents={() => (
  //         <CreateEmployee onClick={() => setShowEmployeeModal(true)} />
  //       )}
  //     >
  //       <ScaffoldExtraColumn
  //         label="Actions"
  //         ValueComponent={({ value }) => (
  //           <ActionButtons
  //             value={value}
  //             setEmployeeToDelete={setEmployeeToDelete}
  //             setEmployeeToEdit={setEmployeeToEdit}
  //           />
  //         )}
  //       />
  //     </ScaffoldListPage>
  //   </>
  // );
};

export default EmployeesListPage;
