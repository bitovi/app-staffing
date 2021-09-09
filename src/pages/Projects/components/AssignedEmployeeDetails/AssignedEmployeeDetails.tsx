import { AssignedEmployee, useEmployees } from "../../../../services/api";

import styles from "./AssignedEmployeeDetails.module.scss";

export default function AssignedEmployeeDetails({
  assignedEmployee,
  onChange,
}: {
  assignedEmployee: AssignedEmployee;
  onChange: (assignedEmployee: AssignedEmployee) => void;
}): JSX.Element {
  const { data: employees } = useEmployees();

  return (
    <div className={styles.assignedEmployeecontainer}>
      <select defaultValue={assignedEmployee.name}>
        {employees?.map((e) => (
          <option value={e.name} key={e.id}>
            {e.name}
          </option>
        ))}
      </select>
      <label>
        Start Date:
        {/* 2014-02-09 */}
        <input
          type="date"
          defaultValue={assignedEmployee.startDate}
          onChange={({ target }) =>
            onChange({ ...assignedEmployee, startDate: target.value })
          }
        />
      </label>
      <label>
        End Date:
        <input
          type="date"
          defaultValue={assignedEmployee.endDate}
          onChange={({ target }) =>
            onChange({ ...assignedEmployee, endDate: target.value })
          }
        />
      </label>
    </div>
  );
}
