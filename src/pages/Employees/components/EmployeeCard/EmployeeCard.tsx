import { Flex, Grid, GridItem, Text, Wrap } from "@chakra-ui/layout";
import React from "react";
import { Tag, TagCloseButton } from "../../../../components/Tag";
import useAutoSaveForm from "../../../../hooks/useAutoSaveForm";
import type { Employee, SkillName } from "../../../../services/api";
import { skillList } from "../../../../services/api";
import { EmployeeSkillSelect } from "./components/EmployeeSkillSelect";
import styles from "./EmployeeCard.module.scss";

interface IProps {
  employee: Employee;
  onSave: (employee: Employee) => void;
}

export default function EmployeeCard({
  employee,
  onSave,
}: IProps): JSX.Element {
  const [formData, setFormData] = useAutoSaveForm<Employee>({
    initialFormData: employee,
    onSave,
  });

  const onAddSkill = (skillName: SkillName) => {
    setFormData({
      ...formData,
      skills: [...formData.skills, { name: skillName }],
    });
  };

  const onRemoveSkill = (skillName: string) => {
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
    >
      <GridItem>
        <Flex justifyContent={{ lg: "center" }} alignItems={{ lg: "center" }}>
          <input
            name="name"
            aria-label="employee-name"
            className={styles.name}
            value={formData.name}
            onChange={updateField}
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
                onClick={() => onRemoveSkill(name)}
                data-testid="remove-skill"
              />
            </Tag>
          ))}
        </Wrap>
      </GridItem>
      <GridItem>
        <EmployeeSkillSelect
          selectedSkills={formData.skills}
          allSkills={[...skillList]}
          onAddSkill={onAddSkill}
        />
      </GridItem>
    </Grid>
  );
}
