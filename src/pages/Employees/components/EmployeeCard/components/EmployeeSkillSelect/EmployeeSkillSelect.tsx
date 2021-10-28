import { useState } from "react";
import Select from "../../../../../../components/Select";
import { Skill } from "../../../../../../services/api";

interface EmployeeSkillSelectProps {
  selectedSkills: Skill[];
  allSkills: Skill[];
  onAddSkill: (skill: Skill) => void;
}

export const EmployeeSkillSelect = ({
  selectedSkills,
  allSkills,
  onAddSkill,
}: EmployeeSkillSelectProps): JSX.Element => {
  // This value is being used to re-render react-select
  // not actually to keep track of the value
  const [skillValue, setSkillValue] = useState<Skill>();

  const availableSkills = allSkills
    .filter(
      (skill) =>
        !selectedSkills.some((activeSkill) => activeSkill.name === skill.name),
    )
    .map((skill) => ({ label: skill.name, value: skill }));

  const handleAddSkill = (skill: Skill) => {
    setSkillValue(skill);
    onAddSkill(skill);
  };

  console.log("allSkills", allSkills);

  return (
    <Select<Skill>
      // This key forces a re-render when the value changes
      // this clears out the selected value when an option is chosen
      key={`react-select__${skillValue}`}
      label="Add skills"
      name="addSkills"
      value={skillValue}
      disabled={!availableSkills.length}
      placeholder={availableSkills.length ? "Select a Skill" : "No options"}
      onChange={handleAddSkill}
      options={availableSkills}
    />
  );
};
