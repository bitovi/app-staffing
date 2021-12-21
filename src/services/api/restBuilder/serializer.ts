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

serializer.register("assignments", {
  id: "id",
  relationships: {
    employee: {
      type: "employees",
    },
    role: {
      type: "roles",
    },
  },
});

serializer.register("employees", {
  id: "id",
  relationships: {
    assignments: {
      type: "assignments",
    },
    skills: {
      type: "skills",
    },
  },
});

serializer.register("projects", {
  id: "id",
  relationships: {
    roles: {
      type: "roles",
    },
  },
});

serializer.register("roles", {
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
});

serializer.register("skills", {
  id: "id",
});

export default serializer;
