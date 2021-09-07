import type { Project } from "../../../../services/api";

import React from "react";

import ProjectDate from "../ProjectDate";

import styles from "./ProjectDescription.module.scss";

export default function ProjectDescription({
  project,
  onEdit,
}: {
  project: Project;
  onEdit: (project: Project) => void;
}): JSX.Element {
  const updateMainField = ({
    currentTarget,
  }: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // @TODO add debounce
    const { name, value } = currentTarget;

    onEdit({ ...project, [name]: value });
  };

  const createConfidenceUpdater =
    (dateName: "startDate" | "endDate") =>
    ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = target;

      onEdit({
        ...project,
        [dateName]: {
          ...project[dateName],
          confidence: value,
        },
      });
    };

  const createDateUpdater =
    (dateName: "startDate" | "endDate") =>
    ({ currentTarget }: React.FormEvent<HTMLInputElement>) => {
      const { value } = currentTarget;

      onEdit({
        ...project,
        [dateName]: {
          ...project[dateName],
          date: value,
        },
      });
    };

  return (
    <div className={styles.projectDescription}>
      <input
        className={styles.sectionLabel}
        name="name"
        onChange={updateMainField}
        value={project.name}
      />
      <div className={styles.dateEstimateContainer}>
        <ProjectDate
          title="Start Date"
          estimatedDate={project.startDate}
          onConfidenceSelect={createConfidenceUpdater("startDate")}
          onDateChange={createDateUpdater("startDate")}
        />
        <ProjectDate
          title="End Date"
          estimatedDate={project.endDate}
          onConfidenceSelect={createConfidenceUpdater("endDate")}
          onDateChange={createDateUpdater("endDate")}
        />
      </div>
      <div>
        <p className={styles.sectionLabel}>Description:</p>
        <textarea
          name="description"
          value={project.description}
          onChange={updateMainField}
        ></textarea>
      </div>
    </div>
  );
}
