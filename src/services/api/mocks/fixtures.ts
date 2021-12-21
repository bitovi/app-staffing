// import { assignmentStoreManager } from "./assignments/mocks";
import { employeeStoreManager } from "./employees/mocks";
import { projectStoreManager } from "./projects/mocks";
// import { roleStoreManager } from "./roles/mocks";
import { skillStoreManager } from "./skills/mocks";

import { employeeSkillsStoreManager } from "./employee_skills/mocks";
// import { roleSkillsStoreManager } from "./role_skills/mocks";

export async function loadFixtures(): Promise<void> {
  await Promise.all([
    // assignmentStoreManager.load(),
    employeeStoreManager.load(),
    projectStoreManager.load(),
    // roleStoreManager.load(),
    skillStoreManager.load(),

    employeeSkillsStoreManager.load(),
    // roleSkillsStoreManager.load(),
  ]);
}

export async function clearFixtures(): Promise<void> {
  await Promise.all([
    // assignmentStoreManager.clear(),
    employeeStoreManager.clear(),
    projectStoreManager.clear(),
    // roleStoreManager.clear(),
    skillStoreManager.clear(),

    employeeSkillsStoreManager.clear(),
    // roleSkillsStoreManager.clear(),
  ]);
}
