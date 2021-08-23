import type { Employee } from "../../services/api";

import { useEffect, useState } from "react";
import { getData } from "../../services/api";

export function useEmployees(): {
  employees?: Employee[];
} {
  const [data, setData] = useState<Employee[]>();
  const [shouldSetData, setShouldSetData] = useState(true);

  useEffect(() => {
    const getEmployees = async () => {
      const employees = await getData();
      if (shouldSetData) {
        setData(employees);
      }
    };

    getEmployees();

    return () => {
      setShouldSetData(false);
    };
  }, [shouldSetData]);

  return {
    employees: data,
  };
}
