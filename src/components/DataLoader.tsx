import { useEffect } from "react";

import { employeeStoreManager } from "../services/api/employees/mocks";
import { projectStoreManager } from "../services/api/projects/mocks";

export default function LoadData(): null {
  useEffect(() => {
    (async function () {
      if (!(await employeeStoreManager.dataIsLoaded())) {
        await employeeStoreManager.loadResources();
      }

      if (!(await projectStoreManager.dataIsLoaded())) {
        await projectStoreManager.loadResources();
      }
    })();
  }, []);

  return null;
}
