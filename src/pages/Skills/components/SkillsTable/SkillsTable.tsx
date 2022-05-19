import { Box, Skeleton, Table, Tbody, Td, Tr } from "@chakra-ui/react";
import { Skill } from "../../../../services/api";
import SkillsTableHeader from "./SkillsTableHeader";

interface SkillsTableProps {
  skills?: Skill[];
  updateSkill: (id: string, data: Skill) => Promise<void>;
  destroySkill: (skillId: string) => Promise<void>;
}

export default function SkillsTable({
  skills,
  updateSkill,
  destroySkill,
}: SkillsTableProps): JSX.Element {
  return (
    <Box px="40px" my="40px">
      <Table>
        <SkillsTableHeader />
      </Table>
    </Box>
  );
}

export function SkillsTableSkeleton(): JSX.Element {
  return (
    <Box px="40px" my="40px">
      <Table>
        <SkillsTableHeader />
        <Tbody>
          {[1, 2, 3, 4].map((row) => {
            return <SkeletonRow key={row} />;
          })}
        </Tbody>
      </Table>
    </Box>
  );
}

const SkeletonRow = () => (
  <>
    <Tr p="16px" alignItems="center" backgroundColor="#DCDCDC" height="55px">
      <Td>
        <Skeleton
          startColor="#C4C4C4"
          endColor="#C4C4C4"
          height="16px"
          width="99px"
        />
      </Td>
      <Td display="flex" justifyContent="end">
        <Skeleton
          startColor="#C4C4C4"
          endColor="#C4C4C4"
          height="16px"
          width="99px"
        />
      </Td>
    </Tr>
    <Tr height={4}></Tr>
  </>
);
