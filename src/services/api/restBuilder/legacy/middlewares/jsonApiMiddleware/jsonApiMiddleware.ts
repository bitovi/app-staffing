import type { JSONAPIDocument } from "json-api-serializer";

import serializer, { SerializerTypes } from "../../../getJsonApiSerializer";

// utilizes the json-api-serializer library to deserializer incoming
// response JSON API formatted response objects from the server

const jsonApiMiddleware = (
  type: SerializerTypes,
  response: JSONAPIDocument,
): [any, string[]] => {
  const relationshipFields: string[] = [];
  // if this is a POST or PUT method and the response data is a single object
  // store the name of its relationship fields in an array
  // we will then hydrate these fields with their data in the following function within fetcher();
  if (typeof response.data === "object" && response.data !== null) {
    for (const key in response.data.relationships) {
      if (!relationshipFields.includes(key)) relationshipFields.push(key);
    }
  }

  const deserializedData = serializer.deserialize(type, response ?? {});

  return [
    Object.assign(
      {},
      {
        data: deserializedData,
      },
    ),
    relationshipFields,
  ];
};

export default jsonApiMiddleware;
