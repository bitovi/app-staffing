import { Assignment, useEmployees } from "../../../../services/api";

import Select from "../../../../components/Select";

import styles from "./RoleAssignment.module.scss";

export default function RoleAssignment({
  assignment,
}: {
  assignment: Assignment;
}): JSX.Element {
  const employees = useEmployees();

  const updateEmployee = (newName: string) => {
    const newEmployee = employees?.find(({ name }) => name === newName);

    if (!newEmployee) {
      // @Todo: Handle error
      return;
    }
  };

  return (
    <div className={styles.assignedEmployeeContainer}>
      {employees && (
        <Select
          className={styles.employee}
          label=""
          name="assignedEmployee"
          value={assignment.employee.name}
          onChange={(value) => updateEmployee(value || "")}
          options={[]}
        />
      )}
      <label className={styles.date}>
        Start Date:
        <input
          type="date"
          defaultValue={assignment?.startDate?.toString()}
          onChange={
            (e) => null
            // onChange({
            //   ...assignedEmployee,
            //   startDate: new Date(e.target.value),
            // })
          }
        />
      </label>
      <label className={styles.date}>
        End Date:
        <input
          type="date"
          defaultValue={assignment?.endDate?.toString()}
          onChange={
            (e) => null
            // onChange({ ...assignedEmployee, endDate: new Date(e.target.value) })
          }
        />
      </label>
    </div>
  );
}
