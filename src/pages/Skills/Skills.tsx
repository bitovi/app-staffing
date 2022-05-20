import { Suspense } from "react";
import {
  useSkillMutations as useSkillMutationsDefault,
  useSkills as useSkillsDefault,
} from "../../services/api";
import SkillsHeader from "./components/SkillsHeader";
import SkillsTable from "./components/SkillsTable";
import { SkillsTableSkeleton } from "./components/SkillsTable/SkillsTable";

interface SkillsProps {
  useSkills: typeof useSkillsDefault;
  useSkillMutations: typeof useSkillMutationsDefault;
}

export function SkillsPageLoadingLayout(): JSX.Element {
  return (
    <>
      <SkillsHeader isLoading />
      <SkillsTableSkeleton />
    </>
  );
}

export function Skills({
  useSkills,
  useSkillMutations,
}: SkillsProps): JSX.Element {
  const skills = useSkills({ sort: "name" });
  const { createSkill, updateSkill, destroySkill } = useSkillMutations();

  return (
    <>
      <SkillsHeader createSkill={createSkill} />
      <SkillsTable
        skills={skills}
        updateSkill={updateSkill}
        destroySkill={destroySkill}
      />
    </>
  );
}

export default function SkillsWrapper(): JSX.Element {
  return (
    <Suspense fallback={<SkillsPageLoadingLayout />}>
      <Skills
        useSkills={useSkillsDefault}
        useSkillMutations={useSkillMutationsDefault}
      />
    </Suspense>
  );
}