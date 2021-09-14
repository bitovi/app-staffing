import {
  AssignedEmployee,
  Employee,
  useEmployees,
} from "../../../../services/api";

import styles from "./AssignedEmployeeDetails.module.scss";

export default function AssignedEmployeeDetails({
  assignedEmployee,
  changeEmployee,
  onChange,
  possibleOtherEmployees,
}: {
  assignedEmployee: AssignedEmployee;
  possibleOtherEmployees: Employee[];
  changeEmployee: (
    previousEmployeeId: string,
    newAssignedEmployee: AssignedEmployee,
  ) => void;
  onChange: (assignedEmployee: AssignedEmployee) => void;
}): JSX.Element {
  const { employees } = useEmployees();

  const updateEmployee = (newName: string) => {
    const newEmployee = employees?.find(({ name }) => name === newName);

    if (!newEmployee) {
      // @Todo: Handle error
      return;
    }

    changeEmployee(assignedEmployee.id, {
      ...assignedEmployee,
      ...newEmployee,
    });
  };

  return (
    <div className={styles.assignedEmployeecontainer}>
      {employees && (
        <select
          defaultValue={assignedEmployee.name}
          onChange={({ target }) => updateEmployee(target.value)}
        >
          {possibleOtherEmployees.map(({ id, name }) => (
            <option value={name} key={id}>
              {name}
            </option>
          ))}
        </select>
      )}
      <label>
        Start Date:
        <input
          type="date"
          defaultValue={assignedEmployee.assignmentStartDate}
          onChange={({ target }) =>
            onChange({ ...assignedEmployee, assignmentStartDate: target.value })
          }
        />
      </label>
      <label>
        End Date:
        <input
          type="date"
          defaultValue={assignedEmployee.assignmnetEndDate}
          onChange={({ target }) =>
            onChange({ ...assignedEmployee, assignmnetEndDate: target.value })
          }
        />
      </label>
    </div>
  );
}
