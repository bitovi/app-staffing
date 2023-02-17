import { useState } from "react";
import { IconButton } from "@mui/material";
import { Button as ChakraButton } from "@chakra-ui/react";

import SkillModal from "../../../pages/Skills/components/SkillModal";
import { Skill as SkillSchema } from "../../schemas/schemas";
import { useSkillMutations } from "../../../services/api";
import { EditIcon } from "../../../pages/assets";
import type { Skill } from "../../../services/api";

import {
  ScaffoldExtraColumn,
  ScaffoldFieldColumn,
} from "../../components/ScaffoldColumns";
import ScaffoldListPage from "../../components/ScaffoldListPage";

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
      <ScaffoldListPage
        schema={SkillSchema}
        renderActions={() => (
          <CreateSkill onClick={() => setIsModalOpen(true)} />
        )}
      >
        <ScaffoldFieldColumn label="Skill Name" field="name" />
        <ScaffoldExtraColumn
          label="Actions"
          renderValue={({ value }) => (
            <ActionButtons
              value={value}
              editSkill={(skill) => {
                setSkillToEdit(skill);
                setIsModalOpen(true);
              }}
            />
          )}
        />
      </ScaffoldListPage>
    </>
  );
};

export default SkillsListPage;

const ActionButtons: React.FC<{
  // @todo this is type Skill, will be fixed with design layer refactor
  value: any;
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
    <ChakraButton size="lg" variant="primary" onClick={onClick}>
      Add Skill
    </ChakraButton>
  );
};
