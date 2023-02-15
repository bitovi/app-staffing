import React, { useState } from "react";
import { Button } from "@mui/material";
import { Button as ChakraButton } from "@chakra-ui/react";
import isEmpty from "lodash/isEmpty";

import { Employee as EmployeeSchema } from "../../schemas/schemas";
import ScaffoldListPage from "../../components/ScaffoldListPage";
import {
  ScaffoldExtraColumn,
  ScaffoldFieldColumn,
} from "../../components/ScaffoldColumns";
import { Employee, useEmployeeMutations } from "../../../services/api";
import DeleteConfirmationModal from "../../../pages/Employees/components/EmployeeDeleteConfirmationModal";
import EmployeeModal from "../../../pages/Employees/components/EmployeeModal";
import type { ValueComponent } from "../../components/ScaffoldListPage";
import styles from "./Employees.module.css";

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
      <ScaffoldListPage
        schema={EmployeeSchema}
        valueComponents={{
          skills: CustomSkillField,
        }}
        renderActions={() => (
          <CreateEmployee onClick={() => setShowEmployeeModal(true)} />
        )}
      >
        <ScaffoldFieldColumn field="name" label="Name" />
        <ScaffoldFieldColumn field="start_date" label="Start Date" />
        <ScaffoldFieldColumn field="end_date" label="End Date" />
        <ScaffoldFieldColumn
          field="skills"
          label="Skills"
          ValueComponent={CustomSkillField}
        />
        <ScaffoldExtraColumn
          label="Actions"
          renderValue={({ value }) => (
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
};

export default EmployeesListPage;

const ActionButtons: React.FC<{
  value: any;
  setEmployeeToEdit: React.Dispatch<React.SetStateAction<Employee | null>>;
  setEmployeeToDelete: React.Dispatch<React.SetStateAction<Employee | null>>;
}> = ({ value, setEmployeeToEdit, setEmployeeToDelete }) => {
  console.log("value", value);
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

const CustomSkillField: ValueComponent = ({ value }) => {
  return (
    <div>
      {Array.isArray(value) &&
        value.map((val) => (
          <span key={val.label} className={styles.customSkillField}>
            {val.label}
          </span>
        ))}
    </div>
  );
};
