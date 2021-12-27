import type { Skill, JSONSkill } from "../skills";
import type { ResponseStatus } from "../shared";

import useRest from "../restBuilder/useRestV2";

const API_BASE_URL = window.env.API_BASE_URL;

export default function useSkills(): ResponseStatus & {
  skills: Skill[] | undefined;
} {
  const {
    data: skills,
    error,
    isLoading,
  } = useRest<Skill, JSONSkill>(`${API_BASE_URL}/skills`, "skills");

  return {
    skills: skills,
    error,
    isLoading,
  };
}
