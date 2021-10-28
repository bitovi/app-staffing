import type { Skill } from "../skills";
import type { ResponseStatus } from "../shared";

import useRest from "../useRest";

export default function useSkills(): ResponseStatus & { skills?: Skill[] } {
  const { data: skills, error, isLoading } = useRest<Skill>("/api/v1/skills");

  return {
    skills,
    error,
    isLoading,
  };
}
