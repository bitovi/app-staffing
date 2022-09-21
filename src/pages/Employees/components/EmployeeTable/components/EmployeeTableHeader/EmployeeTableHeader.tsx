import { chakra, Th, Tr, Text } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { sortData } from "../../../../../../services/helpers/useSort/useSort";

const StickyHeader = chakra(Th, {
  baseStyle: {
    position: "sticky",
    top: "15em",
    background: "gray.10",
    zIndex: "10",
  },
});

export default function EmployeeTableHeader({
  changeSort,
  sortData,
}: {
  changeSort: (sortData: string) => void;
  sortData?: sortData;
}): JSX.Element {
  const columnHeaders = [
    { displayName: "NAME", queryName: "name", sortable: true },
    { displayName: "CURRENT PROJECT", queryName: "", sortable: false },
    { displayName: "START DATE", queryName: "startDate", sortable: true },
    { displayName: "END DATE", queryName: "endDate", sortable: true },
    { displayName: "SKILLS", queryName: "", sortable: false },
    { displayName: "ACTIONS", queryName: "", sortable: false },
  ];

  return (
    <>
      <Tr>
        {columnHeaders.map((column) => (
          <StickyHeader
            key={JSON.stringify(column)}
            color="gray.800"
            textStyle="table.title"
          >
            {column.sortable ? (
              <Text
                cursor="pointer"
                onClick={() => changeSort(column.queryName)}
                display="flex"
                alignItems="center"
              >
                {column.displayName}
                {sortData?.iteratee === column.queryName &&
                  (sortData?.order === "asc" ? (
                    <ChevronDownIcon
                      w="20px"
                      h="20px"
                      ml="5px"
                      data-testid="sort-icon-asc"
                    ></ChevronDownIcon>
                  ) : (
                    <ChevronUpIcon
                      w="20px"
                      h="20px"
                      ml="5px"
                      data-testid="sort-icon-desc"
                    ></ChevronUpIcon>
                  ))}
              </Text>
            ) : (
              <Text>{column.displayName}</Text>
            )}
          </StickyHeader>
        ))}
      </Tr>
    </>
  );
}
