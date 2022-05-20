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
import SkillsTableHeader from "./SkillsTableHeader";
import SkillCard from "../SkillCard/SkillCard";

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
    <>
      {Array.isArray(skills) && skills.length === 0 && (
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
      {Array.isArray(skills) && skills.length > 0 && (
        <Box px="40px" my="40px">
          <Table>
            <SkillsTableHeader />

            <Tbody>
              {skills.map((skill, index) => (
                <SkillTableRow
                  key={skill.id}
                  skill={skill}
                  lastChild={skills.length - 1 === index}
                />
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </>
  );
}

function SkillTableRow({
  skill,
  lastChild = false,
}: {
  skill: Skill;
  lastChild: boolean;
}) {
  return (
    <>
      <SkillCard skill={skill} />
      {/* add space between rows */}
      {!lastChild && <Tr height={4} />}
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
