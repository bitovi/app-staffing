import type { Schema } from "../../schemas/schemas";
import * as schemas from "../../schemas/schemas";

type Primitive = string | boolean | number;

interface Attributes {
  [field: string]: Primitive;
}

interface JsonApiIncluded {
  type: string;
  id: string;
  attributes: Attributes;
}

interface JsonApiRecord {
  type: string;
  id: string;
  attributes: Attributes;
  relationships?: {
    [key: string]: {
      data: { type: string; id: string }[];
    };
  };
}

interface JsonApiResponse {
  data: JsonApiRecord[];
  included?: JsonApiIncluded[];
  jsonapi: { version: string };
  links: { [key: string]: string };
}

interface FlatIncluded {
  [key: string]: {
    [id: string]: { [field: string]: Primitive };
  };
}

export interface FlatData {
  id: string | number;
  [field: string]:
    | Primitive
    | null
    | {
        [field: string]: Primitive;
      }[];
}

/**
 * return schema.displayField for a schema where schemaKey matches
 * schema.jsonApiield
 */
export function getDisplayValueKeyForSchema(schemaKey: string): string {
  const schemaEntries = Object.values(schemas);

  for (let i = 0; i < schemaEntries.length; i++) {
    if (schemaEntries[i].jsonApiField === schemaKey) {
      return schemaEntries[i].displayField;
    }
  }

  return "";
}

/**
 * convert included from:
 * { included: [
 *  { type: 'skills', id: 'skill-id-1', attributes: { name: 'Skill 1' } },
 *  { type: 'skills', id: 'skill-id-2', attributes: { name: 'Skill 2' } },
 *  { type: 'projects', id: 'project-id-1', attributes: { name: 'Project 1' } },
 * ] }
 * to:
 * {
 *  skills: {
 *    'skill-id-1': { name: 'Skill 1' },
 *    'skill-id-2': { name: 'Skill 2' },
 *  },
 *  projects: {
 *    'projects-id-1': { name: 'Project 1' }
 *  }
 * }
 */
function getFlattenedIncluded(included?: JsonApiIncluded[]): FlatIncluded {
  if (!included) return {};

  return included.reduce(
    (acc: FlatIncluded, next) => ({
      ...acc,
      [next.type]: {
        ...acc[next.type],
        [next.id]: next.attributes,
      },
    }),
    {},
  );
}

/**
 * convert data.data from:
 * { id: '', type: '', attributes: {...}, relationships: { skills: [{}]} }
 * to:
 * { id, ...attributes, skills: []}
 */
function getFlatData(data: JsonApiResponse): FlatData[] {
  const flatIncluded = getFlattenedIncluded(data?.included);

  return data.data.map((record: JsonApiRecord) => {
    const flatRecord: FlatData = {
      ...record.attributes,
      id: record.id,
    };

    const relationships = Object.entries(record.relationships || {});

    for (let i = 0; i < relationships.length; i++) {
      const [key, relationship] = relationships[i];
      const displayValueKey = getDisplayValueKeyForSchema(key);

      flatRecord[key] = relationship.data.map((related) => ({
        ...flatIncluded[key][related.id],
        id: related.id,
        label: flatIncluded[key][related.id][displayValueKey],
      }));
    }

    return flatRecord;
  });
}

export function fetchData(schema: Schema) {
  let url = `${window.env.API_BASE_URL}/${schema.name.toLowerCase()}s`;
  const includes = schema.hasMany
    ?.map((relationship) => relationship.target.toLowerCase())
    .join("&");

  if (includes) {
    url = `${url}?include=${includes}`;
  }

  const promise = fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      return getFlatData(res);
    });

  return wrapPromise(promise);
}

function wrapPromise(promise: Promise<FlatData[]>) {
  let status = "pending";
  let response: FlatData[];

  const suspender = promise.then(
    (res) => {
      status = "success";
      response = res;
    },
    (err) => {
      status = "error";
      response = err;
    },
  );

  const read = () => {
    switch (status) {
      case "pending":
        throw suspender;
      case "error":
        throw response;
      default:
        return response;
    }
  };

  return { read };
}
