import Select from "../../../../components/Select";
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
  const employees = useEmployees();

  const updateEmployee = (newName: string) => {
    const newEmployee = employees?.find(({ name }) => name === newName);

    if (!newEmployee) {
      // @Todo: Handle error
      return;
    }

    changeEmployee(assignedEmployee.employee.id, {
      ...assignedEmployee,
      ...newEmployee,
    });
  };

  return (
    <div className={styles.assignedEmployeeContainer}>
      {employees && (
        <Select
          className={styles.employee}
          label=""
          name="assignedEmployee"
          value={assignedEmployee.employee.name}
          onChange={(value) => updateEmployee(value || "")}
          options={possibleOtherEmployees.map(({ name }) => ({
            label: name,
            value: name,
          }))}
        />
      )}
      <label className={styles.date}>
        Start Date:
        <input
          type="date"
          defaultValue={assignedEmployee.startDate?.toString()}
          onChange={(e) =>
            onChange({
              ...assignedEmployee,
              startDate: new Date(e.target.value),
            })
          }
        />
      </label>
      <label className={styles.date}>
        End Date:
        <input
          type="date"
          defaultValue={assignedEmployee.endDate?.toString()}
          onChange={(e) =>
            onChange({ ...assignedEmployee, endDate: new Date(e.target.value) })
          }
        />
      </label>
    </div>
  );
}
