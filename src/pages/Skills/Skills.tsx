import { Suspense } from "react";
import {
  useSkillMutations as useSkillMutationsDefault,
  useSkills as useSkillsDefault,
} from "../../services/api";
import SkillsHeader from "./components/SkillsHeader";
import SkillsTable from "./components/SkillsTable";
import { SkillsTableSkeleton } from "./components/SkillsTable/SkillsTable";

interface SkillsProps {
  useSkills?: typeof useSkillsDefault;
  useSkillMutations?: typeof useSkillMutationsDefault;
}

export default function Skills({
  useSkills = useSkillsDefault,
  useSkillMutations = useSkillMutationsDefault,
}: SkillsProps): JSX.Element {
  const { createSkill, updateSkill, destroySkill } = useSkillMutations();

  return (
    <>
      <SkillsHeader createSkill={createSkill} />
      <Suspense fallback={<SkillsTableSkeleton />}>
        <SkillsTable
          useSkills={useSkills}
          updateSkill={updateSkill}
          destroySkill={destroySkill}
        />
      </Suspense>
    </>
  );
}
