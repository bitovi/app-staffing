import type { Project } from "../../../../services/api";

import { Button } from "../../../../components/Layout/components/Button";

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
      <Button onClick={onCancel}>&lt; Cancel</Button>

      <div className={styles.projectDetail}>
        {project ? "TODO: edit project form" : "TODO: new project form"}
      </div>
    </div>
  );
}
