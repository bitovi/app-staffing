import JsonApiSerializer from "json-api-serializer";

export type SerializerTypes = "projects" | "employees" | "skills" | "roles";

const serializer = new JsonApiSerializer({
  convertCase: "snake_case",
  unconvertCase: "camelCase",
});

// TODO: Finish these (1-n relationships)
// TODO: Import from modlet?

serializer.register("assignments", {
  id: "id",
});

serializer.register("employees", {
  id: "id",
  relationships: {
    skills: {
      type: "skills",
    },
  },
});

serializer.register("projects", {
  id: "id",
});

serializer.register("roles", {
  id: "id",
  relationships: {
    skills: {
      type: "skills",
    },
  },
});

serializer.register("skills", {
  id: "id",
});

export default serializer;
