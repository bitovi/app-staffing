import { Project } from "../../../../services/api";

import styles from "./ProjectDescription.module.scss";

export default function ProjectDescription({ project }: { project: Project }) {
  return (
    <div className={styles.projectDescription}>
      <input
        className={styles.sectionLabel}
        name="name"
        disabled
        value={project.name}
      />
      <div className={styles.dateEstimateContainer}>
        <div className={styles.dateContainer}>
          <label>
            Start Date:
            <input value={project.startDate.date} />
          </label>
          <label>
            Confidence:
            <select>
              {Array.from(Array(21).keys()).map((n) => (
                <option
                  selected={`${n * 5}%` === project.startDate.confidence}
                  value={n * 5}
                  key={n}
                >{`${n * 5}%`}</option>
              ))}
            </select>
          </label>
        </div>
        <div className={styles.dateContainer}>
          <label>
            End Date:
            <input value={project.endDate.date} />
          </label>
          <label>
            Confidence:
            <select>
              {Array.from(Array(21).keys()).map((n) => (
                <option
                  selected={`${n * 5}%` === project.startDate.confidence}
                  value={n * 5}
                  key={n}
                >{`${n * 5}%`}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div>
        <p className={styles.sectionLabel}>Description:</p>
        {project.description}
      </div>
    </div>
  );
}
