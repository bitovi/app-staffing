import { Flex, IconButton, Td, Text, Tr } from "@chakra-ui/react";
import { Skill } from "../../../../../../services/api";
import { EditIcon, TrashIcon } from "../../../../../assets";

interface SkillCardProps {
  skill: Skill;
  editSkill: (data: Skill) => void;
}

export default function SkillCard({ skill, editSkill }: SkillCardProps): JSX.Element {
  return (
    <>
      <Tr
        p="16px"
        alignItems="center"
        backgroundColor="white"
        boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
      >
        <Td>
          <Text
            color="gray.600"
            fontWeight="600"
            fontSize="16px"
            lineHeight="20px"
            letterSpacing="0.25px"
          >
            {skill.name}
          </Text>
        </Td>

        <Td>
          <Flex justifyContent="end" justifySelf="end">
            <IconButton
              variant="editAction"
              aria-label="Edit Skill"
              fontSize="20px"
              icon={<EditIcon fill="currentColor" />}
              onClick={() => { editSkill(skill) }}
            />
            <IconButton
              ml="8px"
              variant="deleteAction"
              aria-label="Delete Skill"
              fontSize="20px"
              icon={<TrashIcon fill="currentColor" />}
            />
          </Flex>
        </Td>
      </Tr>
    </>
  );
}
