import type { Project } from "../../../../services/api";

import styles from "./ProjectCard.module.scss";

const ProjectCard = ({
  project: {
    role,
    startDate,
    endDate,
    startConfidence,
    endConfidence,
    assignedEmployees,
  },
}: {
  project: Project;
}): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.flexBetween}>
        <div>ROLE: {role}</div>
        <div className={styles.dateGrid}>
          <label>
            Start Date
            <input value={startDate} />
          </label>

          <label>
            End Date
            <input value={endDate} />
          </label>

          <label>
            Confidence
            <input value={startConfidence} />
          </label>
          <label>
            Confidence
            <input value={endConfidence} />
          </label>
        </div>
      </div>
      <div>
        <div>AssignedEmployees</div>
        {assignedEmployees.map((employee) => (
          <div className={styles.flexBetween} key={employee.id}>
            <select>
              <option>Example</option>
            </select>
            <div className={styles.inputContainer}>
              <label>
                Start Date
                <input value={employee.projectStartDate} />
              </label>

              <label>
                End Date
                <input value={employee.projectEndDate} />
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
