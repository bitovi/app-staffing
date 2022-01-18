import {
  Project,
  Role,
  useSkills as useSkillsDefault,
} from "../../../../services/api";
import RoleDetails from "../RoleDetails";
import Button from "../../../../components/Button";
import RoleModal from "../RoleModal";
import { useState } from "react";

import styles from "./RoleList.module.scss";

export default function RoleList({
  project,
  createRole,
  updateRole,
  destroyRole,
}: {
  project: Project;
  createRole: (data: Partial<Omit<Role, "id">>) => Promise<string | undefined>;
  updateRole: (id: string, project: Role) => Promise<void>;
  destroyRole: (id: string) => Promise<void>;
}): JSX.Element {
  const [roleModal, setRoleModal] = useState<boolean>(false);
  const skills = useSkillsDefault();

const addNewRole = async (data: Omit<Role, "id">) => {
  await createRole(data);
}

  return (
    <>
      <Button onClick={() => setRoleModal(true)}>Add Role</Button>
      <div className={styles.skillFilter}>
        {[].map((s) => (
          <p key={s}>{s}</p>
        ))}
      </div>
      {project?.roles?.map((role) => (
        <RoleDetails
          key={role.id}
          role={role}
          updateRole={updateRole}
          destroyRole={destroyRole}
        />
      ))}

      <RoleModal
        isOpen={roleModal}
        onClose={() => setRoleModal(false)}
        skills={skills}
        project={project}
        onSave={addNewRole}
      />
    </>
  );
}
