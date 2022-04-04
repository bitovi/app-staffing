import { Flex } from "@chakra-ui/layout";
import { VStack } from "@chakra-ui/react";

import {
  useProjection,
  useTimeline,
  SkillRole,
} from "../../../../services/projection";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";
import { Role, Skill, useRoles, useSkills } from "../../../../services/api";
import { cloneDeep } from "lodash";

interface ReportTableProps {
  date?: Date;
}

export function ReportTable({
  date = new Date(),
}: ReportTableProps): JSX.Element {
  const availableSkills = useSkills({ include: ["employees"] });

  const { timeline } = useTimeline();

  const dashboardStart = timeline[0]?.startDate;
  const dashboardEnd = timeline[timeline.length - 1]?.endDate;

  const roles = useRoles({
    include: ["assignments", "project", "skills"],
    filter: {
      ...(dashboardEnd && { startDate: { $lt: dashboardEnd } }),
      ...(dashboardStart && { endDate: { $gt: dashboardStart } }),
      endDate: { $eq: undefined },
    },
  });

  const skillsWithRoles: SkillRole[] = addRolesToSkills(availableSkills, roles);

  const { skillsWithProjection } = useProjection(date, skillsWithRoles);

  return (
    <Flex flexDirection="column">
      <TableHeader timeline={timeline} columnLabel={"DEPARTMENT"}></TableHeader>

      <VStack spacing={4} align="stretch" maxHeight="73vh" overflowY="auto">
        {skillsWithProjection.map(({ skill, projections }) => (
          <TableRow key={skill.id} skill={skill} projections={projections} />
        ))}
      </VStack>
    </Flex>
  );
}

export default ReportTable;

function addRolesToSkills(skills: Skill[], roles: Role[]) {
  const skillRoles: SkillRole[] = cloneDeep(skills);
  for (const skill of skillRoles) {
    for (const role of roles) {
      if (role.skills?.[0].id === skill.id) {
        if (!skill.roles) {
          skill.roles = [];
        }
        skill.roles.push(role);
      }
    }
  }
  return skillRoles;
}
