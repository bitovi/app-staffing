import JsonApiSerializer from "json-api-serializer";

export type SerializerTypes = "projects" | "employees" | "skills" | "roles";

const getJsonApiSerializer = (): JsonApiSerializer => {
  const Serializer = new JsonApiSerializer();
  Serializer.register("skills", {
    id: "id",
  });
  Serializer.register("employees", {
    id: "id",
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
