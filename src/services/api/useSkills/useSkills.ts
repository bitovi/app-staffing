import type { Skill, JSONSkill } from "../skills";
import type { ResponseStatus } from "../shared";

import useRest from "../restBuilder/useRestV2";

export default function useSkills(): ResponseStatus & {
  skills: Skill[] | undefined;
} {
  const {
    data: skills,
    error,
    isLoading,
  } = useRest<Skill, JSONSkill>("/api/v1/skills", "skills");

  return {
    skills: skills,
    error,
    isLoading,
  };
}
