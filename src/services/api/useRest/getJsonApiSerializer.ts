import JsonApiSerializer from "json-api-serializer";

export type SerializerTypes = "projects" | "employees";

const getJsonApiSerializer = (): JsonApiSerializer => {
  const Serializer = new JsonApiSerializer();
  Serializer.register("projects", {
    id: "id",
  });
  Serializer.register("employees", {
    id: "id",
  });
  return Serializer;
};

export default getJsonApiSerializer;
