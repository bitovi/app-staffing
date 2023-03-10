import { useState } from "react";
import { Button, IconButton } from "@mui/material";

import SkillModal from "../../../pages/Skills/components/SkillModal";
import { Skill as SkillSchema } from "../../schemas/schemas";
import { useSkillMutations } from "../../../services/api";
import { EditIcon } from "../../../pages/assets";

import ScaffoldListPage from "../../components/ScaffoldListPage";
import MuiProvider from "../../presentation/mui/MuiProvider";
import { getMany } from "../../services/api/api";
import {
  ScaffoldAttributeDisplay,
  ScaffoldExtraDisplay,
} from "../../components/ScaffoldDisplays";

import type { Skill } from "../../../services/api";

const resource = getMany(SkillSchema);

const SkillsListPage: React.FC = () => {
  const { createSkill, updateSkill } = useSkillMutations();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [skillToEdit, setSkillToEdit] = useState<Skill | null>(null);

  const addNewSkill = async (data: Omit<Skill, "id">) => {
    await createSkill(data);
  };

  const saveEditSkill = async (data: Omit<Skill, "id">) => {
    await updateSkill(skillToEdit?.id || "", data);
  };

  return (
    <>
      <SkillModal
        isOpen={isModalOpen}
        onClose={() => {
          setSkillToEdit(null);
          setIsModalOpen(false);
        }}
        onSave={skillToEdit ? saveEditSkill : addNewSkill}
        skill={skillToEdit || undefined}
      />
      <MuiProvider>
        <ScaffoldListPage
          schema={SkillSchema}
          renderActions={() => (
            <CreateSkill onClick={() => setIsModalOpen(true)} />
          )}
          useData={() => resource.read()}
        >
          <ScaffoldAttributeDisplay label="Skill Name" attribute="name" />
          <ScaffoldExtraDisplay
            label="Actions"
            render={({ record }) => (
              <ActionButtons
                // @todo temporary until schema/resources are strongly typed
                value={record as unknown as Skill}
                editSkill={(skill) => {
                  setSkillToEdit(skill);
                  setIsModalOpen(true);
                }}
              />
            )}
          />
        </ScaffoldListPage>
      </MuiProvider>
    </>
  );
};

export default SkillsListPage;

const ActionButtons: React.FC<{
  // @todo this is type Skill, will be fixed with components as hooks refactor
  value: Skill;
  editSkill: (skill: Skill) => void;
}> = ({ value, editSkill }) => {
  return (
    <IconButton
      aria-label="Edit Skill"
      size="small"
      onClick={() => editSkill(value)}
    >
      <EditIcon fill="currentColor" />
    </IconButton>
  );
};

const CreateSkill: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <Button variant="contained" onClick={onClick}>
      Add Skill
    </Button>
  );
};
