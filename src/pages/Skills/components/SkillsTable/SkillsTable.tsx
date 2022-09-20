import {
  Box,
  Flex,
  Skeleton,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/image";
import { Skill } from "../../../../services/api";
import SkillsTableHeader from "./SkillsTableHeader/SkillsTableHeader";
import SkillsTableBody from "./SkillsTableBody/SkillsTableBody";
import { ListQuery } from "../../../../services/api/restBuilder";

interface SkillsTableProps {
  useSkills: (query?: ListQuery<Skill>) => Skill[];
  editSkill: (data: Skill) => void;
  destroySkill: (skillId: string) => Promise<void>;
  filters?: string[];
}

export default function SkillsTable({
  useSkills,
  editSkill,
  destroySkill,
  filters,
}: SkillsTableProps): JSX.Element {
  const skills = useSkills({ sort: "name" });

  const filteredSkills = (Array.isArray(skills) ? skills : [])
    .filter((skill) => {
      if (!filters || !filters.length) {
        return true;
      }
      return filters.every(
        (filter) =>
          skill.name.toLocaleLowerCase().indexOf(filter) > -1,
      );
    });

  return (
    <>
      {filteredSkills.length === 0 && (
        <Flex
          width="100%"
          height="70%"
          alignItems="center"
          justifyContent="center"
        >
          <Flex flexDirection="column" alignItems="center">
            <Image
              height="100px"
              width="100px"
              src="assets/images/folderWithFile.png"
              alt="Folder With File"
            />
            <Text fontWeight="bold" fontSize="16px" lineHeight="24px">
              There are currently no skills.
            </Text>
          </Flex>
        </Flex>
      )}
      {filteredSkills.length > 0 && (
        <Box px="40px" my="40px">
          <Table>
            <SkillsTableHeader />

            <SkillsTableBody skills={filteredSkills} editSkill={editSkill} />
          </Table>
        </Box>
      )}
    </>
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
    <Tr
      p="16px"
      alignItems="center"
      backgroundColor="#DCDCDC"
      height="55px"
      data-testid="skeleton-row"
    >
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
