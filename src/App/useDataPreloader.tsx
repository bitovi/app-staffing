import { useEffect } from "react";

import { employeeStoreManager } from "@staffing/services/api/employees/mocks";
import { projectStoreManager } from "@staffing/services/api/projects/mocks";

export default function useDataPreloader(): void {
  useEffect(() => {
    employeeStoreManager.load();
    projectStoreManager.load();
  }, []);
}
