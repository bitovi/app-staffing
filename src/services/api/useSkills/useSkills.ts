import type { Skill, JSONAPISkill } from "../skills";
import type { ResponseStatus } from "../shared";

import useRest from "../useRest/useRestV2";

export default function useSkills(): ResponseStatus & {
  skills: Skill[] | [];
} {
  const {
    data: skills,
    error,
    isLoading,
  } = useRest<Skill, JSONAPISkill>("/api/v1/skills", "skills");

  return {
    skills: skills as unknown as Skill[],
    error,
    isLoading,
  };
}
