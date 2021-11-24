import { fetcher } from "../shared";

const basePath = "/api/v1";

export default async function hydrateObject(
  object: any,
  relationships: string[],
): Promise<any> {
  const hydratedObject = { ...object };
  for (const key in hydratedObject.data) {
    const relationship = relationships.find((r) => r === key);
    if (relationship) {
      const results: any = await fetcher(
        "GET",
        "undefined",
        `${basePath}/${relationship}`,
      );
      hydratedObject.data[key] = hydratedObject.data[key]
        .map((id: string) => {
          return results?.data.find((result: any) => result.id === id);
        })
        .map((foundResult: any) => {
          return { id: foundResult.id, ...foundResult.attributes };
        });
    }
  }
  return hydratedObject;
}
