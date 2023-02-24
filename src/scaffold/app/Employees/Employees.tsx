import { useState } from "react";
import { Button, IconButton } from "@mui/material";
import isEmpty from "lodash/isEmpty";

import MuiProvider from "../../design/mui/MuiProvider";
import ScaffoldListPage from "../../components/ScaffoldListPage";
import {
  ScaffoldExtraDisplay,
  ScaffoldAttributeDisplay,
} from "../../components/ScaffoldColumns";
import type { ValueComponent } from "../../design/interfaces";
import { fetchData } from "../../services/api/api";

import { Employee as EmployeeSchema } from "../../schemas/schemas";
import { Employee, useEmployeeMutations } from "../../../services/api";
import DeleteConfirmationModal from "../../../pages/Employees/components/EmployeeDeleteConfirmationModal";
import EmployeeModal from "../../../pages/Employees/components/EmployeeModal";
import styles from "./Employees.module.css";
import { EditIcon, TrashIcon } from "../../../pages/assets";

const resource = fetchData(EmployeeSchema);

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
      <MuiProvider>
        <ScaffoldListPage
          schema={EmployeeSchema}
          valueComponents={{
            skills: CustomSkillField,
          }}
          renderActions={() => (
            <CreateEmployee onClick={() => setShowEmployeeModal(true)} />
          )}
          useData={() => resource.read()}
        >
          <ScaffoldAttributeDisplay attribute="name" label="Name" />
          <ScaffoldAttributeDisplay attribute="start_date" label="Start Date" />
          <ScaffoldAttributeDisplay attribute="end_date" label="End Date" />
          <ScaffoldAttributeDisplay
            attribute="skills"
            label="Skills"
            ValueComponent={CustomSkillField}
          />
          <ScaffoldExtraDisplay
            label="Actions"
            render={({ record }) => (
              <ActionButtons
                // @todo temporary until schema/resources are strongly typed
                value={record as unknown as Employee}
                setEmployeeToDelete={setEmployeeToDelete}
                setEmployeeToEdit={setEmployeeToEdit}
              />
            )}
          />
        </ScaffoldListPage>
      </MuiProvider>
    </>
  );
};

export default EmployeesListPage;

const ActionButtons: React.FC<{
  // @todo this is type Employee, will be fixed with components as hooks refactor
  value: Employee;
  setEmployeeToEdit: React.Dispatch<React.SetStateAction<Employee | null>>;
  setEmployeeToDelete: React.Dispatch<React.SetStateAction<Employee | null>>;
}> = ({ value, setEmployeeToEdit, setEmployeeToDelete }) => {
  return (
    <>
      <IconButton
        aria-label="Edit Employee"
        size="small"
        onClick={() => setEmployeeToEdit(value)}
      >
        <EditIcon fill="currentColor" />
      </IconButton>
      <IconButton
        aria-label="Delete Employee"
        size="small"
        onClick={() => setEmployeeToDelete(value)}
      >
        <TrashIcon fill="currentColor" />
      </IconButton>
    </>
  );
};

const CreateEmployee: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => {
  return (
    <Button variant="contained" onClick={onClick}>
      Add Team Member
    </Button>
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
