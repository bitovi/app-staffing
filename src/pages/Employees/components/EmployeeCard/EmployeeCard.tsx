import { Flex, Grid, GridItem, Text, Wrap } from "@chakra-ui/layout";
import { isEqual } from "lodash";
import React, { useEffect, useState } from "react";
import { Select } from "../../../../components/Select";
import { Tag, TagCloseButton } from "../../../../components/Tag";
import usePrevious from "../../../../hooks/usePrevious";
import type { Employee, SkillName } from "../../../../services/api";
import { skillList } from "../../../../services/api";
import styles from "./EmployeeCard.module.scss";
import { useDebounce } from "react-use";

export default function EmployeeCard<EmployeeType extends Employee>({
  employee,
  onSave,
}: {
  employee: EmployeeType;
  onSave: (employee: EmployeeType) => void;
}): JSX.Element {
  const [formData, setFormData] = useState<EmployeeType>(employee);
  const [, setHasFocus] = useState<boolean>(false);
  const handleFocus = () => setHasFocus(true);
  const handleBlur = () => setHasFocus(false);

  const prevFormData = usePrevious(formData);

  useDebounce(
    () => {
      if (prevFormData && !isEqual(formData, prevFormData)) {
        onSave(formData);
      }
    },
    500,
    [formData, prevFormData, onSave],
  );

  useEffect(() => {
    setFormData(employee);
  }, [employee]);

  const handleAddSkill = (skillName: SkillName) => {
    setFormData({
      ...formData,
      skills: [...formData.skills, { name: skillName }],
    });
  };

  const handleRemoveSkill = (skillName: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((x) => x.name != skillName),
    });
  };

  const updateField = (evt: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = evt.currentTarget;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Grid
      alignItems="center"
      templateColumns={{
        base: "1fr",
        md: "repeat(2, 1fr)",
        lg: "repeat(4, 1fr)",
      }}
      gap={4}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <GridItem>
        <Flex justifyContent={{ lg: "center" }} alignItems={{ lg: "center" }}>
          <input
            name="name"
            className={styles.name}
            value={formData.name}
            onChange={updateField}
            data-testid="name"
          />
        </Flex>
      </GridItem>

      <GridItem>
        <Flex
          flexDirection={{ base: "row", lg: "column" }}
          justifyContent="space-between"
        >
          <Text
            fontSize="sm"
            as="label"
            mt={{ base: 0, lg: 2 }}
            mr={{ base: 2, lg: 0 }}
          >
            Start Date
            <input
              name="startDate"
              value={formData.startDate}
              onChange={updateField}
            />
          </Text>
          <Text fontSize="sm" as="label">
            End Date
            <input
              name="endDate"
              value={formData.endDate}
              onChange={updateField}
            />
          </Text>
        </Flex>
      </GridItem>
      <GridItem>
        <Wrap as="ul" data-testid="display-skills" shouldWrapChildren>
          {formData.skills.map(({ name }) => (
            <Tag variant="primary" key={name}>
              {name}
              <TagCloseButton
                onClick={() => handleRemoveSkill(name)}
                data-testid="remove-skill"
              />
            </Tag>
          ))}
        </Wrap>
      </GridItem>
      <GridItem>
        <Select
          label="Add skills"
          name="addSkills"
          value=" "
          onChange={handleAddSkill}
          onFocus={handleFocus} // react-select will prevent the event from bubbling if this isn't set
          options={skillList
            .filter(
              (skill) =>
                !formData.skills.some(
                  (activeSkill) => activeSkill.name === skill,
                ),
            )
            .map((skill) => ({ label: skill, value: skill }))}
        />
      </GridItem>
    </Grid>
  );
}
