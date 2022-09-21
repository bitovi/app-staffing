import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { chakra, Th, Thead, Tr } from "@chakra-ui/react";
import { sortData } from "../../../../../services/helpers/useSort/useSort";

const StickyHeader = chakra(Th, {
  baseStyle: {
    position: "sticky",
    top: "11em",
    background: "gray.10",
    zIndex: "10",
  },
});

export default function SkillsTableHeader({
  changeSort,
  sortData,
}: {
  changeSort?: (sortData: string) => void;
  sortData?: sortData;
}): JSX.Element {
  return (
    <Thead py={4}>
      <Tr>
        <StickyHeader
          color="gray.800"
          textStyle="table.title"
          cursor="pointer"
          onClick={() => changeSort && changeSort("name")}
        >
          SKILL NAME
          {sortData?.iteratee === "name" &&
            (sortData?.order === "asc" ? (
              <ChevronDownIcon
                w="20px"
                h="20px"
                ml="5px"
                data-testid="sort-icon-desc"
              ></ChevronDownIcon>
            ) : (
              <ChevronUpIcon
                w="20px"
                h="20px"
                ml="5px"
                data-testid="sort-icon-asc"
              ></ChevronUpIcon>
            ))}
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
