import JsonApiSerializer from "json-api-serializer";

export type SerializerTypes =
  | "Assignment"
  | "Employee"
  | "Project"
  | "Role"
  | "Skill";

const serializer = new JsonApiSerializer({
  convertCase: "snake_case",
  unconvertCase: "camelCase",
});

serializer.register("Assignment", {
  id: "id",
  relationships: {
    employee: {
      type: "Employee",
    },
    role: {
      type: "Role",
    },
  },
});

serializer.register("Employee", {
  id: "id",
  relationships: {
    assignments: {
      type: "Assignment",
    },
    skills: {
      type: "Skill",
    },
  },
});

serializer.register("Project", {
  id: "id",
  relationships: {
    roles: {
      type: "Role",
    },
  },
});

serializer.register("Role", {
  id: "id",
  relationships: {
    assignments: {
      type: "Assignment",
    },
    project: {
      type: "Project",
    },
    skills: {
      type: "Skill",
    },
  },
});

serializer.register("Skill", {
  id: "id",
});

export default serializer;
