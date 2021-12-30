import assignmentStoreManager, { assignmentMocks } from "./assignments/mocks";
import employeeStoreManager, { employeeMocks } from "./employees/mocks";
import projectStoreManager, { projectMocks } from "./projects/mocks";
import roleStoreManager, { roleMocks } from "./roles/mocks";
import skillStoreManager, { skillMocks } from "./skills/mocks";

export default [
  ...assignmentMocks,
  ...employeeMocks,
  ...projectMocks,
  ...roleMocks,
  ...skillMocks,
];

export async function loadFixtures(): Promise<void> {
  await Promise.all([
    assignmentStoreManager.load(),
    employeeStoreManager.load(),
    projectStoreManager.load(),
    roleStoreManager.load(),
    skillStoreManager.load(),
  ]);
}

export async function clearFixtures(): Promise<void> {
  await Promise.all([
    assignmentStoreManager.clear(),
    employeeStoreManager.clear(),
    projectStoreManager.clear(),
    roleStoreManager.clear(),
    skillStoreManager.clear(),
  ]);
}
