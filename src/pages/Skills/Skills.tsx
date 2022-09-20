import { Suspense, useEffect, useState } from "react";
import {
  Skill,
  useSkillMutations as useSkillMutationsDefault,
  useSkills as useSkillsDefault,
} from "../../services/api";
import SkillsHeader from "./components/SkillsHeader";
import SkillsTable from "./components/SkillsTable";
import SkillModal from "./components/SkillModal";
import { SkillsTableSkeleton } from "./components/SkillsTable/SkillsTable";
import FilterBar from "../FilterBar";

interface SkillsProps {
  useSkills?: typeof useSkillsDefault;
  useSkillMutations?: typeof useSkillMutationsDefault;
}

export default function Skills({
  useSkills = useSkillsDefault,
  useSkillMutations = useSkillMutationsDefault,
}: SkillsProps): JSX.Element {
  useEffect(() => {
    document.title = "Skills - Staffing App";
  }, []);

  const [filters, setFilters] = useState<string[]>([]);
  const { createSkill, updateSkill, destroySkill } = useSkillMutations();
  const [skillModal, setSkillModal] = useState<boolean>(false);
  const [skillToEdit, setSkillToEdit] = useState<Skill | null>(null);

  const addNewSkill = async (data: Omit<Skill, "id">) => {
    await createSkill(data);
  };
  const saveEditSkill = async (data: Omit<Skill, "id">) => {
    await updateSkill(skillToEdit?.id || "", data);
  };
  return (
    <>
      {skillModal && (
        <SkillModal
          isOpen={skillModal}
          onClose={() => {
            setSkillToEdit(null);
            setSkillModal(false);
          }}
          onSave={skillToEdit ? saveEditSkill : addNewSkill}
          skill={skillToEdit ? skillToEdit : undefined}
        />
      )}
      <SkillsHeader createSkill={() => setSkillModal(true)} />
      <FilterBar
        onFilterChange={(arr: string[]) => setFilters(arr)}
        placeholder="Search by skill name"
      ></FilterBar>
      <Suspense fallback={<SkillsTableSkeleton />}>
        <SkillsTable
          useSkills={useSkills}
          editSkill={(skill) => {
            setSkillToEdit(skill);
            setSkillModal(true);
          }}
          destroySkill={destroySkill}
          filters={filters}
        />
      </Suspense>
    </>
  );
}
