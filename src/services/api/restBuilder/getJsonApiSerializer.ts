import JsonApiSerializer from "json-api-serializer";

export type SerializerTypes =
  | "projects"
  | "employees"
  | "skills"
  | "roles"
  // undefined a temporary measure to prevent pages that haven't
  // finished converting their endpoints to JSON API from breaking
  // inside of the JSONAPISerializer
  | "undefined";

const getJsonApiSerializer = (): JsonApiSerializer => {
  const Serializer = new JsonApiSerializer({
    convertCase: "snake_case",
    unconvertCase: "camelCase",
  });
  Serializer.register("skills", {
    id: "id",
  });
  Serializer.register("employees", {
    id: "id",
    relationships: {
      skills: {
        type: "skills",
      },
    },
  });
  Serializer.register("projects", {
    id: "id",
  });
  Serializer.register("roles", {
    id: "id",
  });
  return Serializer;
};

export default getJsonApiSerializer;
