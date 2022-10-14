import { useState } from "react";

export interface sortData {
  iteratee: string;
  order: "desc" | "asc" | boolean;
}

export interface sortProps {
  sortData: sortData;
  updateSortData: (field: string) => void;
}

export function useSort(): sortProps {
  const [sortData, setSortData] = useState<sortData>({
    iteratee: "name",
    order: "desc",
  });

  function updateSortData(field: string): void {
    if (!sortData || sortData.iteratee !== field) {
      // if no current sort data or new sort option, set to clicked column
      setSortData({ iteratee: field, order: "desc" });
    } else if (sortData.iteratee === field) {
      // if sort data is the same field as clicked column,
      // switch to descending order,
      // remove if already descending order
      if (sortData.order === "desc") {
        setSortData((sortData) => ({
          iteratee: sortData.iteratee,
          order: "asc",
        }));
      } else {
        setSortData({ iteratee: "", order: false });
      }
    }
  }

  return { sortData, updateSortData };
}
