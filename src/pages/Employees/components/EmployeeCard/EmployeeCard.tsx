import { Flex, Grid, GridItem, Text, Wrap } from "@chakra-ui/layout";
import { Tag, TagCloseButton } from "../../../../components/Tag";
import useAutoSaveForm from "../../../../hooks/useAutoSaveForm";
import type { Employee, SkillName } from "../../../../services/api";
import { skillList } from "../../../../services/api";
import { EmployeeSkillSelect } from "./components/EmployeeSkillSelect";
import styles from "./EmployeeCard.module.scss";
import { DatePicker } from "../../../../components/DatePicker";
import { Skeleton } from "@chakra-ui/skeleton";

interface EmployeeCardProps {
  employee: Employee;
  onSave: (employee: Employee) => void;
}

export default function EmployeeCard({
  employee,
  onSave,
}: EmployeeCardProps): JSX.Element {
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

  const onDateFieldUpdate = (fieldName: string) => (dateValue: Date) => {
    setFormData({ ...formData, [fieldName]: dateValue });
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
            <DatePicker
              data-testid="start-date"
              name="startDate"
              label="start date"
              selectedDate={formData.startDate}
              onChange={onDateFieldUpdate("startDate")}
            />
          </Text>
          <Text fontSize="sm" as="label">
            End Date
            <DatePicker
              data-testid="end-date"
              name="endDate"
              label="end date"
              selectedDate={formData.endDate}
              onChange={onDateFieldUpdate("endDate")}
            />
          </Text>
        </Flex>
      </GridItem>
      <GridItem>
        <Wrap shouldWrapChildren>
          {formData.skills.map(({ name }) => (
            <Tag variant="primary" key={name}>
              {name}
              <TagCloseButton onClick={() => onRemoveSkill(name)} />
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

export function EmployeeCardSkeleton(): JSX.Element {
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
        <Skeleton height="130px"></Skeleton>
      </GridItem>
      <GridItem>
        <Skeleton height="130px"></Skeleton>
      </GridItem>
      <GridItem>
        <Skeleton height="130px"></Skeleton>
      </GridItem>
      <GridItem>
        <Skeleton height="130px"></Skeleton>
      </GridItem>
    </Grid>
  );
}
