import type { Skill, JSONAPISkill } from "../skills";
import type { ResponseStatus } from "../shared";

import useRest from "../useRest/useRestV2";
import { JSONAPI } from "../baseMocks/interfaces";

const skillsDataFormatter = ({
  data: skills,
}: { data: JSONAPISkill[] } | any): Skill[] | undefined =>
  skills?.map((skill: JSONAPISkill): Skill[] | any => {
    const {
      id,
      attributes: { name },
    } = skill;
    return {
      id,
      name,
    };
  });

export default function useSkills(): ResponseStatus & {
  skills: Skill[] | undefined;
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
