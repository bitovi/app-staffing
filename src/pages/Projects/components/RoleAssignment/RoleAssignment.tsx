import type { Assignment } from "../../../../services/api";

import Select from "../../../../components/Select";

import styles from "./RoleAssignment.module.scss";

interface RoleAssignmentProps {
  assignment: Assignment;
}

export default function RoleAssignment({
  assignment,
}: RoleAssignmentProps): JSX.Element {
  // const employees = useEmployees();

  // const updateEmployee = (newName: string) => {
  //   const newEmployee = employees?.find(({ name }) => name === newName);

  //   if (!newEmployee) {
  //     // @Todo: Handle error
  //     return;
  //   }
  // };

  return (
    <div className={styles.assignedEmployeeContainer}>
      <Select
        className={styles.employee}
        label=""
        name="assignedEmployee"
        value={assignment.employee.name}
        disabled // Todo look into after fixtures are in place
        // onChange={(value) => updateEmployee(value || "")}
        onChange={console.log}
        options={[]}
      />
      <label className={styles.date}>
        Start Date:
        <input
          type="date"
          defaultValue={assignment?.startDate?.toString()}
          onChange={console.log}
        />
      </label>
      <label className={styles.date}>
        End Date:
        <input
          type="date"
          defaultValue={assignment?.endDate?.toString()}
          onChange={console.log}
        />
      </label>
    </div>
  );
}