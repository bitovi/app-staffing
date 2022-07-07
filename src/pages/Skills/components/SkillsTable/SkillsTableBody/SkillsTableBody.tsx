import { Tbody, Tr } from "@chakra-ui/react";
import { Skill } from "../../../../../services/api";
import SkillCard from "./SkillCard/SkillCard";

const SkillsTableBody = ({ skills }: { skills: Skill[] }): JSX.Element => {
  return (
    <Tbody>
      {skills.map((skill, index) => (
        <SkillTableRow
          key={skill.id}
          skill={skill}
          lastChild={skills.length - 1 === index}
        />
      ))}
    </Tbody>
  );
};

function SkillTableRow({
  skill,
  lastChild = false,
}: {
  skill: Skill;
  lastChild: boolean;
}): JSX.Element {
  return (
    <>
      <SkillCard skill={skill} />
      {/* add space between rows */}
      {!lastChild && <Tr height={4} />}
    </>
  );
}

export default SkillsTableBody;
