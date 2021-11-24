import getJsonApiSerializer, {
  SerializerTypes,
} from "../../getJsonApiSerializer";

// utilizes the json-api-serializer library to deserializer incoming
// response JSON API formatted response objects from the server
// This middleware is consumed inside the fetcher method to allow us
// to shape our SWR caches in the shape of frontend data

const jsonApiMiddleware = (
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  response: any,
  type: SerializerTypes,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
): any => {
  const deserializedData = getJsonApiSerializer().deserialize(
    type,
    response ?? {},
  );
  return Object.assign(
    {},
    {
      data: deserializedData,
    },
  );
};

export default jsonApiMiddleware;
