import {
  AllJSONResults,
  AnyJsonObject,
} from "../../mocks/baseMocks/interfaces";
import { fetcher } from "../shared";

export default async function hydrateObject<T>(
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  object: any,
  relationships: string[],
): Promise<T> {
  const hydratedObject = { ...object };
  for (const key in hydratedObject.data) {
    // search the keys within the object, for every match we find
    // inside of our included relationships array,
    // we know we need to fetch the data to hydrate that relationship
    // information
    const relationship = relationships.find((r) => r === key);
    if (relationship) {
      // for now, for each matching result, fetch all data from that endpoint
      const results: AllJSONResults = await fetcher(
        "GET",
        // all endpoints are not JSON API formatted yet, so the "undefined"
        // measure here is to prevent breaking. If everything was formatted
        // the fetcher would automatically deserialize the GET all results
        "undefined",
        `${process.env.REACT_APP_API_BASE_URL}/${relationship}`,
      );
      hydratedObject.data[key] = hydratedObject.data[key]
        .map((id: string) => {
          return results?.data.find(
            (result: AnyJsonObject) => result.id === id,
          );
        })
        .map((foundResult: AnyJsonObject) => {
          // were the endpoints all JSON API formatted, fetcher would have
          // already deserialized them to their frontend shape already
          return { id: foundResult.id, ...foundResult.attributes };
        });
    }
  }
  return hydratedObject;
}
