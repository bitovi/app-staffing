import type { CanLocalStore } from "can-local-store";
import type { BaseResource } from "./baseMocks/requestCreator";

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

export const stores: Record<string, CanLocalStore<BaseResource>> = {
  assignments: assignmentStoreManager.store,
  employees: employeeStoreManager.store,
  projects: projectStoreManager.store,
  roles: roleStoreManager.store,
  skills: skillStoreManager.store,
};

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
