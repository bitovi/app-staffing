import type { Employee, Project } from "../../../../services/api";

import React, { useState } from "react";

import { useEmployees, skillList } from "../../../../services/api";

import styles from "./ProjectDetail.module.scss";
import ProjectDescription from "../ProjectDescription";

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
  const [isAddingRole, setIsAddingRole] = useState(false);

  const [selectedEmployee, setSelectedEmployee] = useState<Employee>();

  const { data: employees } = useEmployees();

  const { roles } = projectData;

  const handleAddRoleButtonClicked = () => setIsAddingRole(true);

  const handleEmployeeSelected = ({
    target: { value },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEmployee(employees?.find(({ id }) => id === value));
  };

  const handleRoleSelected = ({
    target: { value },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    // const roleToAddTo;
    // const roleToUpdate: Role = roles.find(
    //   ({ employee }) => employee?.id == selectedEmployee?.id,
    // ) || {
    //   employee: selectedEmployee,
    //   skills: [],
    // };
    // roleToUpdate.skills = [...roleToUpdate.skills, { name: value }];
    // eslint-disable-next-line no-console
    console.log(selectedEmployee);
  };

  // const handleFieldUpdate = ({
  //   currentTarget,
  // }: React.FormEvent<HTMLInputElement>) => {
  //   const { name, value } = currentTarget;

  //   setProjectData((projectData) => ({ ...projectData, [name]: value }));
  // };

  return (
    <div className={styles.container}>
      <ProjectDescription project={projectData} />
      <button className={styles.button} onClick={handleAddRoleButtonClicked}>
        + Add Role
      </button>
      <div className={styles.projectDetail}>
        {roles.length == 0 && !isAddingRole ? (
          'No roles are currently a part of this project. Select "Add Role" to create one.'
        ) : (
          <div className={styles.roleContainer}>
            <select onChange={handleEmployeeSelected}>
              {employees?.map(({ name, id }) => (
                <option value={id} key={id}>
                  {name}
                </option>
              ))}
            </select>
            <div className={styles.dateContainer}>
              <label>
                Start Date:
                <input value="01/01/2000" />
              </label>
              <label>
                End Date:
                <input value="01/01/2001" />
              </label>
            </div>
            <div>
              <div>Role:</div>
              <select onChange={handleRoleSelected}>
                {skillList.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
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
