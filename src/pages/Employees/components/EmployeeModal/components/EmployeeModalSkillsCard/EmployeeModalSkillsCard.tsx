import { useEffect } from "react";

import { Checkbox, Flex, SimpleGrid } from "@chakra-ui/react";
import { Controller, Control } from "react-hook-form";
import {
  Skill,
  useSkills as useSkillsDefault,
} from "../../../../../../services/api";
import { EmployeeFormData } from "../../EmployeeModal";

interface EmployeeModalSkillsCardProps {
  control: Control<EmployeeFormData>;
  useSkills?: typeof useSkillsDefault;
  setSkills: (skills: Skill[]) => void;
  skills: Skill[];
}

export default function EmployeeModalSkillsCard({
  control,
  useSkills = useSkillsDefault,
  setSkills,
  skills,
}: EmployeeModalSkillsCardProps) {
  const skillsFetched = useSkills();

  useEffect(() => {
    if (!skills.length && skillsFetched.length) {
      setSkills(skillsFetched);
    }
  }, [skillsFetched?.length, skills?.length, setSkills, skillsFetched]);

  return (
    <Flex mt={4} flexGrow={1}>
      <SimpleGrid columns={2} spacingX={24} spacingY={4}>
        {skills?.map((skill) => (
          <Controller
            key={skill.id}
            control={control}
            name={`skills.${skill.id}`}
            render={({ field: { onChange, onBlur, value } }) => {
              return (
                <Checkbox
                  value={skill.id}
                  onChange={onChange}
                  onBlur={onBlur}
                  isChecked={Boolean(value)}
                  textStyle="modal.checkboxLabel"
                >
                  {skill.name}
                </Checkbox>
              );
            }}
          />
        ))}
      </SimpleGrid>
    </Flex>
  );
}
