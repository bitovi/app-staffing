import type { Employee } from "..";
import type { APICreate } from "../shared";

import { useState, useCallback } from "react";

export default function useAddEmployee(): APICreate<string, Employee> {
  const [data, setData] = useState<string | undefined>();
  const [error, setError] = useState<Error | undefined>();

  const addEmployee = useCallback(async (employee: Employee) => {
    try {
      const r = await fetch("/v1", {
        method: "POST",
        body: JSON.stringify(employee),
      });
      const { data: responseData } = await r.json();

      setData(responseData);
    } catch (err) {
      setError(err);
    }
  }, []);

  return {
    data,
    error,
    isLoading: !data && !error,
    create: addEmployee,
  };
}
