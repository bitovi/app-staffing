import type { Skill, JSONSkill } from "../mocks/skills";
import type { ResponseStatus } from "../restBuilder/shared";

import useRest from "../restBuilder/legacy/useRestV2";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

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
