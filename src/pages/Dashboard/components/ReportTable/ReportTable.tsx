import { Flex } from "@chakra-ui/layout";
import { Table, TableContainer } from "@chakra-ui/react";

import {
  useProjection,
  useTimeline,
  SkillRole,
} from "../../../../services/projection";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";
import { Role, Skill, useRoles, useSkills } from "../../../../services/api";
import cloneDeep from "lodash/cloneDeep";

interface ReportTableProps {
  date?: Date;
}

export function ReportTable({
  date = new Date(),
}: ReportTableProps): JSX.Element {
  const availableSkills = useSkills({
    include: [
      "employees.skills",
      "employees.assignments.role.skills",
      "employees.assignments.role.project",
    ],
  });

  const { timeline } = useTimeline(date);

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
      <TableContainer>
        <Table size="sm" sx={{ tableLayout: "fixed" }}>
          <TableHeader
            timeline={timeline}
            columnLabel={"DEPARTMENT"}
          ></TableHeader>

          {skillsWithProjection.map(({ skill, projections }) => (
            <TableRow key={skill.id} skill={skill} projections={projections} />
          ))}
        </Table>
      </TableContainer>
    </Flex>
  );
}

export default ReportTable;

function addRolesToSkills(skills: Skill[], roles: Role[]) {
  const skillRoles: SkillRole[] = cloneDeep(skills);
  for (const skill of skillRoles) {
    for (const role of roles) {
      if (role.skills?.length > 0 && role.skills[0].id === skill.id) {
        if (!skill.roles) {
          skill.roles = [];
        }
        skill.roles.push(role);
      }
    }
  }
  return skillRoles;
}
