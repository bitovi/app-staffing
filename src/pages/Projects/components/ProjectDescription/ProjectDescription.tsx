import React from "react";
import type { Project } from "../../../../services/api";

import styles from "./ProjectDescription.module.scss";

export default function ProjectDescription({
  project,
  onEdit,
}: {
  project: Project;
  onEdit: (project: Project) => void;
}): JSX.Element {
  const updateField = ({
    currentTarget,
  }: React.FormEvent<HTMLInputElement>) => {
    // @TODO add debounce
    const { name, value } = currentTarget;

    onEdit({ ...project, [name]: value });
  };

  return (
    <div className={styles.projectDescription}>
      <input
        className={styles.sectionLabel}
        name="name"
        onChange={updateField}
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
