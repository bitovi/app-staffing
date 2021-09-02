import React, { useState } from "react";
import { Project, useEmployees } from "../../../../services/api";
import styles from "./ProjectDetail.module.scss";

export default function Projects({
  onCancel,
  onSave,
  project = { id: "111", name: "Client Name", roles: [] },
}: {
  onCancel: () => void;
  onSave: (project: Project) => void;
  project?: Project;
}): JSX.Element {
  const [projectData, setProjectData] = useState<Project>(project);
  const [isAddingRole, setIsAddingRole] = useState(false);

  const { data: employees } = useEmployees();

  const { name, roles } = projectData;

  const handleAddRoleButtonClicked = () => setIsAddingRole(true);

  const handleFieldUpdate = ({
    currentTarget,
  }: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = currentTarget;

    setProjectData((projectData) => ({ ...projectData, [name]: value }));
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.projectName}
        name="name"
        onChange={handleFieldUpdate}
        value={name}
      />
      <button className={styles.button} onClick={handleAddRoleButtonClicked}>
        + Add Role
      </button>
      <div className={styles.projectDetail}>
        {roles.length == 0 && !isAddingRole ? (
          'No roles are currently a part of this project. Select "Add Role" to create one.'
        ) : (
          <div className={styles.roleContainer}>
            <select>
              {employees?.map(({ name, id }) => (
                <option value={name} key={id}>
                  {name}
                </option>
              ))}
            </select>
            <div className={styles.dateContainer}>
              <label>
                Start Date:
                <input value="gg" />
              </label>
              <label>
                End Date:
                <input value="gg" />
              </label>
            </div>
            <div>
              Role:
              <select>
                <option>gg</option>
              </select>
              <div className={styles.roleGrid}></div>
            </div>
            <button onClick={handleAddRoleButtonClicked}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
}
