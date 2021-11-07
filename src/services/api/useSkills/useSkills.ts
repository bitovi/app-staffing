import type { Skill, JSONAPISkill } from "../skills";
import type { ResponseStatus } from "../shared";

import useRest from "../useRest/useRestV2";
import { JSONAPI } from "../baseMocks/interfaces";

const skillsDataFormatter = (
  data: JSONAPI<JSONAPISkill[], undefined> | undefined,
): Skill[] => {
  if (data) {
    const { data: skills } = data;
    skills.map((skill) => {
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
