import type { Project } from "../../../../services/api";

import styles from "./ProjectDetail.module.scss";

export default function Projects({
  onCancel,
  onSave,
  project,
}: {
  onCancel: () => void;
  onSave: (project: Project) => void;
  project?: Project;
}): JSX.Element {
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={onCancel}>
        &lt; Cancel
      </button>

      <div className={styles.projectDetail}>
        {project ? "TODO: edit project form" : "TODO: new project form"}
      </div>
    </div>
  );
}
