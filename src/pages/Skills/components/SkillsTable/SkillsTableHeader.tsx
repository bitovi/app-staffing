import { chakra, Th, Thead, Tr } from "@chakra-ui/react";

const StickyHeader = chakra(Th, {
  baseStyle: {
    position: "sticky",
    top: "11em",
    background: "gray.10",
    zIndex: "10",
  },
});

export default function SkillsTableHeader(): JSX.Element {
  return (
    <Thead py={4}>
      <Tr>
        <StickyHeader color="gray.800" textStyle="table.title">
          SKILL NAME
        </StickyHeader>
        <StickyHeader
          py={4}
          pr={12}
          color="gray.800"
          textStyle="table.title"
          isNumeric
        >
          ACTIONS
        </StickyHeader>
      </Tr>
    </Thead>
  );
}
