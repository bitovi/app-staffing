import JsonApiSerializer from "json-api-serializer";

export type SerializerTypes =
  | "assignments"
  | "employees"
  | "projects"
  | "roles"
  | "skills";

const serializer = new JsonApiSerializer({
  convertCase: "snake_case",
  unconvertCase: "camelCase",
});

const assignment = {
  id: "id",
  relationships: {
    employee: {
      type: "employees",
    },
    role: {
      type: "roles",
    },
  },
};
serializer.register("assignments", assignment);
serializer.register("Assignment", assignment);

const employee = {
  id: "id",
  relationships: {
    assignments: {
      type: "assignments",
    },
    skills: {
      type: "skills",
    },
  },
};
serializer.register("employees", employee);
serializer.register("Employee", employee);

const project = {
  id: "id",
  relationships: {
    roles: {
      type: "roles",
    },
  },
};
serializer.register("projects", project);
serializer.register("Project", project);

const role = {
  id: "id",
  relationships: {
    assignments: {
      type: "assignments",
    },
    project: {
      type: "projects",
    },
    skills: {
      type: "skills",
    },
  },
};
serializer.register("roles", role);
serializer.register("Role", role);

const skill = {
  id: "id",
};
serializer.register("skills", skill);
serializer.register("Skill", skill);

export default serializer;
