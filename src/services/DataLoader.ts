import { useEffect } from "react";

import { employeeStoreManager } from "./api/employees/mocks";
import { projectStoreManager } from "./api/projects/mocks";
import { skillStoreManager } from "./api/skills/mocks";

export default function useLoadMocks(): null {
  useEffect(() => {
    (async function () {
      if (!(await employeeStoreManager.dataIsLoaded())) {
        await employeeStoreManager.loadResources();
      }

      if (!(await projectStoreManager.dataIsLoaded())) {
        await projectStoreManager.loadResources();
      }

      if (!(await skillStoreManager.dataIsLoaded())) {
        await skillStoreManager.loadResources();
      }
    })();
  }, []);

  return null;
}
