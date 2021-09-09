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
  const { data: employees } = useEmployees();

  const updateEmployee = (newName: string) => {
    const newEmployee = employees?.find(({ name }) => name === newName);

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
          {possibleOtherEmployees.map((e) => (
            <option value={e.name} key={e.id + Math.random()}>
              {e.name}
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
