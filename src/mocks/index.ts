import type { CanLocalStore } from "can-local-store";
import type { BaseResource } from "./baseMocks/requestCreator";
export type { JSONAssignment } from "./assignments/fixtures";
export type { JSONEmployee } from "./employees/fixtures";
export type { JSONProject } from "./projects/fixtures";
export type { JSONRole } from "./roles/fixtures";
export type { JSONSkill } from "./skills/fixtures";

import assignmentStoreManager, { assignmentMocks } from "./assignments/mocks";
import employeeStoreManager, { employeeMocks } from "./employees/mocks";
import projectStoreManager, { projectMocks } from "./projects/mocks";
import roleStoreManager, { roleMocks } from "./roles/mocks";
import skillStoreManager, { skillMocks } from "./skills/mocks";

export * from "./fixtures";

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
