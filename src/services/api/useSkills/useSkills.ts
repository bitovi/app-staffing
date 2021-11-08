import type { Skill, JSONAPISkill } from "../skills";
import type { ResponseStatus } from "../shared";
import { JSONAPI } from "../baseMocks/interfaces";

import useRest from "../useRest/useRestV2";

const skillsDataFormatter = (
  data: JSONAPI<JSONAPISkill[], undefined> | undefined,
): Skill[] => {
  if (data) {
    const { data: skills } = data;

    return skills.map((skill) => {
      return {
        id: skill.id,
        name: skill?.attributes?.name,
      };
    });
  }
  return [];
};

export default function useSkills(): ResponseStatus & {
  skills: Skill[] | [];
} {
  const {
    data: skills,
    error,
    isLoading,
  } = useRest<JSONAPI<JSONAPISkill[], undefined>>("/api/v1/skills");

  return {
    skills: skillsDataFormatter(skills),
    error,
    isLoading,
  };
}
