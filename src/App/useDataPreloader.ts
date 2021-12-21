import { useEffect } from "react";

import { employeeStoreManager } from "../services/api/mocks/employees/mocks";
import { projectStoreManager } from "../services/api/mocks/projects/mocks";
import { skillStoreManager } from "../services/api/mocks/skills/mocks";
import { employeeSkillsStoreManager } from "../services/api/mocks/employee_skills/mocks";

export default function useDataPreloader(): void {
  useEffect(() => {
    employeeStoreManager.load();
    projectStoreManager.load();
    skillStoreManager.load();
    employeeSkillsStoreManager.load();
  }, []);
}
