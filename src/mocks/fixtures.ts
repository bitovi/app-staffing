import type {
  Assignment,
  Employee,
  Project,
  Role,
  Skill,
} from "../services/api";

import { assignments as jsonAssignments } from "./assignments/fixtures";
import { employees as jsonEmployees } from "./employees/fixtures";
import { projects as jsonProjects } from "./projects/fixtures";
import { roles as jsonRoles } from "./roles/fixtures";
import { skills as jsonSkills } from "./skills/fixtures";

import serializer from "../services/api/restBuilder/serializer";

export type { JSONAssignment } from "./assignments/fixtures";
export type { JSONEmployee } from "./employees/fixtures";
export type { JSONProject } from "./projects/fixtures";
export type { JSONRole } from "./roles/fixtures";
export type { JSONSkill } from "./skills/fixtures";

const included = [
  ...jsonAssignments,
  ...jsonEmployees,
  ...jsonProjects,
  ...jsonRoles,
  ...jsonSkills,
];

export const assignments = serializer.deserialize("assignments", {
  data: jsonAssignments,
  included,
}) as Assignment[];

export const employees = serializer.deserialize("employees", {
  data: jsonEmployees,
  included,
}) as Employee[];

export const projects = serializer.deserialize("projects", {
  data: jsonProjects,
  included,
}) as Project[];

export const roles = serializer.deserialize("roles", {
  data: jsonRoles,
  included,
}) as Role[];

export const skills = serializer.deserialize("skills", {
  data: jsonSkills,
  included,
}) as Skill[];
