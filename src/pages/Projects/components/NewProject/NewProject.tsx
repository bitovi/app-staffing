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
    <div className={styles.flexBetween}>
      <button className={styles.addButton} onClick={onCancel}>
        Cancel
      </button>
    </div>
  );
}
