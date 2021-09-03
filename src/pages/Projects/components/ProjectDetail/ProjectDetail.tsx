import type { Project } from "../../../../services/api";

import { useState } from "react";

import styles from "./ProjectDetail.module.scss";
import ProjectDescription from "../ProjectDescription";
import RoleList from "../RoleList";

export default function Projects({
  onCancel,
  onSave,
  project = {
    id: "111",
    startDate: {
      date: "00/00/0000",
      confidence: "50%",
    },
    endDate: {
      date: "00/00/0000",
      confidence: "50%",
    },
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    name: "Client Name",
    roles: [],
  },
}: {
  onCancel: () => void;
  onSave: (project: Project) => void;
  project?: Project;
}): JSX.Element {
  const [projectData] = useState<Project>(project);

  return (
    <div className={styles.container}>
      <ProjectDescription project={projectData} />
      <RoleList roles={projectData.roles} />
    </div>
  );
}
