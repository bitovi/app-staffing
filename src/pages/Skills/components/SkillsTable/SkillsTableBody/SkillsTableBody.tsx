import { Tbody, Tr } from "@chakra-ui/react";
import { Skill } from "../../../../../services/api";
import SkillCard from "./SkillCard/SkillCard";

const SkillsTableBody = ({ skills, editSkill }: { skills: Skill[], editSkill: (data: Skill) => void}): JSX.Element => {
  return (
    <Tbody>
      {skills.map((skill, index) => (
        <SkillTableRow
          key={skill.id}
          skill={skill}
          lastChild={skills.length - 1 === index}
          editSkill={editSkill}
        />
      ))}
    </Tbody>
  );
};

function SkillTableRow({
  skill,
  editSkill,
  lastChild = false,
}: {
  skill: Skill;
  editSkill: (data: Skill) => void;
  lastChild: boolean;
}): JSX.Element {
  return (
    <>
      <SkillCard skill={skill} editSkill={editSkill} />
      {/* add space between rows */}
      {!lastChild && <Tr height={4} />}
    </>
  );
}

export default SkillsTableBody;
