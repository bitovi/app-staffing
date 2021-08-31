import { Project } from "../../../../services/api";
import styles from "./NewProject.module.scss";

export default function Projects({
  onCancel,
  onSave,
}: {
  onCancel: () => void;
  onSave: (project: Project) => void;
}): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.flexBetween}>
        <button className={styles.button} onClick={onCancel}>
          &lt; Cancel
        </button>
      </div>

      <div className={styles.projectDetail}>placeholder</div>
    </div>
  );
}
