import type { Project } from "../../../../services/api";

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
