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
    const { name, value } = currentTarget;

    onEdit({ ...project, [name]: value });
  };

  return (
    <div className={styles.projectDescription}>
      <input
        className={styles.sectionLabel}
        name="name"
        onBlur={updateMainField}
        defaultValue={project.name}
      />
      <div className={styles.dateEstimateContainer}>
        <ProjectDate
          title="Start Date"
          estimatedDate={project.startDate}
          onChange={(startDate) => {
            onEdit({ ...project, startDate });
          }}
        />
        <ProjectDate
          title="End Date"
          estimatedDate={project.endDate}
          onChange={(endDate) => {
            onEdit({ ...project, endDate });
          }}
        />
      </div>
      <div>
        <p className={styles.sectionLabel}>Description:</p>
        <textarea
          name="description"
          defaultValue={project.description}
          onBlur={updateMainField}
        ></textarea>
      </div>
    </div>
  );
}
