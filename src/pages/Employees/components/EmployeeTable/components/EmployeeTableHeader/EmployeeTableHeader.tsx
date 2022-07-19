import { chakra, Th, Tr } from "@chakra-ui/react";

const StickyHeader = chakra(Th, {
  baseStyle: {
    position: "sticky",
    top: "15em",
    background: "gray.10",
    zIndex: "10",
  },
});

export default function EmployeeTableHeader(): JSX.Element {
  return (
    <>
      <Tr>
        <StickyHeader color="gray.800" textStyle="table.title">
          EMPLOYEE NAME
        </StickyHeader>
        <StickyHeader color="gray.800" textStyle="table.title">
          CURRENT PROJECT
        </StickyHeader>
        <StickyHeader color="gray.800" textStyle="table.title">
          START DATE
        </StickyHeader>
        <StickyHeader color="gray.800" textStyle="table.title">
          END DATE
        </StickyHeader>
        <StickyHeader color="gray.800" textStyle="table.title">
          SKILLS
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
    </>
  );
}
