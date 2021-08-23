import { useEffect, useState } from "react";
import { Employee, getData } from "../../services/api";
type Response = {
  employees?: Employee[];
};

export function useEmployees(): Response {
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
