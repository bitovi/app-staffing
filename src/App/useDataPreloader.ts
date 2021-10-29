import { useEffect } from "react";

import { employeeStoreManager } from "../services/api/employees/mocks";
import { projectStoreManager } from "../services/api/projects/mocks";
import { skillStoreManager } from "../services/api/skills/mocks";

export default function useDataPreloader(): void {
  useEffect(() => {
    employeeStoreManager.load();
    projectStoreManager.load();
    skillStoreManager.load();
  }, []);
}
