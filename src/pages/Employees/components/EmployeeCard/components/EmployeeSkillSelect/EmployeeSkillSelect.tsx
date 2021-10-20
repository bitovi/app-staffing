import { useState } from "react";
import Select from "@staffing/components/Select";
import { Skill, SkillName } from "@staffing/services/api";

interface EmployeeSkillSelectProps {
  selectedSkills: Skill[];
  allSkills: SkillName[];
  onAddSkill: (skill: SkillName) => void;
}

export const EmployeeSkillSelect = ({
  selectedSkills,
  allSkills,
  onAddSkill,
}: EmployeeSkillSelectProps): JSX.Element => {
  // This value is being used to re-render react-select
  // not actually to keep track of the value
  const [skillValue, setSkillValue] = useState<string>();

  const availableSkills = allSkills
    .filter(
      (skill) =>
        !selectedSkills.some((activeSkill) => activeSkill.name === skill),
    )
    .map((skill) => ({ label: skill, value: skill }));

  const handleAddSkill = (skillName: SkillName) => {
    setSkillValue(skillName);
    onAddSkill(skillName);
  };

  return (
    <Select
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
