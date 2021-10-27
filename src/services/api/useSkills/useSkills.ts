import type { Skill } from "../skills";
import type { ResponseStatus } from "../common";

import useRest from "../useRest";

interface SkillsActions {
  skills?: Skill[];
  reset: () => void;
}

export default function useSkills(): ResponseStatus & SkillsActions {
  const {
    data: skills,
    error,
    isLoading,
    reset,
  } = useRest<Skill>("/api/v1/skills");

  return {
    skills,
    isLoading,
    error,
    reset,
  };
}
