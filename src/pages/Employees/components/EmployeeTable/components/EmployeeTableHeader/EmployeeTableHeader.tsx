import { chakra, Th, Tr, Text } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";


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
  changeSort: (sortData: string) => void,
  sortData?: string,
}): JSX.Element {

  const columnHeaders = [
    { displayName: "EMPLOYEE NAME", queryName: "name", sortable: true },
    { displayName: "CURRENT PROJECT", queryName: "", sortable: false },
    { displayName: "START DATE", queryName: "start_date", sortable: true },
    { displayName: "END DATE", queryName: "end_date", sortable: true },
    { displayName: "SKILLS", queryName: "", sortable: false },
    { displayName: "ACTIONS", queryName: "", sortable: false },
  ];


  return (
    <>
      <Tr>
        {columnHeaders.map(column => (
          <StickyHeader key={JSON.stringify(column)} color="gray.800" textStyle="table.title">
            { column.sortable ? 
              <Text cursor="pointer" onClick={() => changeSort(column.queryName)} display="flex">
                {column.displayName}
                {sortData?.includes(column.queryName) 
                  && (sortData?.includes("-") 
                  ? <ChevronDownIcon data-testid="sort-icon-desc"></ChevronDownIcon>
                  : <ChevronUpIcon data-testid="sort-icon-asc"></ChevronUpIcon>)
                }
              </Text>
              :
              <Text>{column.displayName}</Text>
            }
          </StickyHeader>
        ))}
      </Tr>
    </>
  );
}
