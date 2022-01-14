import type { Project } from "../../../../services/api";
import { Textarea } from "@chakra-ui/react";
import styles from "./ProjectDescription.module.scss";

export default function ProjectDescription({
  project,
  onEdit,
}: {
  project: Project;
  onEdit: (id: string, project: Partial<Project>) => void;
}): JSX.Element {
  const updateMainField = ({
    currentTarget,
  }: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = currentTarget;

    onEdit(project.id, { [name]: value });
  };

  return (
    <div className={styles.projectDescription}>
      <Textarea
        name="description"
        defaultValue={project.description}
        onBlur={updateMainField}
      />
    </div>
  );
}
