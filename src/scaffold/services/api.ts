import type { Schema } from "../schemas";
import * as schemas from "../schemas";

function plural(str: string) {
  return `${str.toLowerCase()}s`;
}

/**
 * Loop through all imported schemas to find one that matches the singular/
 * plural version of the key. If there is a match then try to find an attribute
 * that is marked as "unique" so that this value can be used when converting
 * json:api response to table rows.
 */
function getUniqueFieldFromUnknownSchema(key: string): string {
  const schemaKey = `${key.charAt(0).toUpperCase()}${key.slice(1)}`;
  const singularSchemaKey = schemaKey.substring(0, schemaKey.length - 1);
  const schemaEntries = Object.entries(schemas);

  for (let i = 0; i < schemaEntries.length; i++) {
    const [key, value] = schemaEntries[i];

    if (key === schemaKey || key === singularSchemaKey) {
      const attributes = Object.entries(value.attributes);

      for (let j = 0; j < attributes.length; j++) {
        const [key, value]: any[] = attributes[j];

        if (value?.unique) {
          return key;
        }
      }
    }
  }

  // @todo return generic likely unique field?
  return "name";
}

function getFlatData(data: any): { [key: string]: any }[] {
  const flattened: { [key: string]: any }[] = [];
  const normalizedIncluded: { [key: string]: any } = {};

  // flatten the included array from {}[] to {type: {id: {value}}}
  // for quicker access when processing records
  if (data.hasOwnProperty("included")) {
    data.included.forEach((included: any) => {
      normalizedIncluded[included.type] = {
        ...normalizedIncluded[included.type],
        [included.id]: included.attributes,
      };
    });
  }

  console.log("normalizedIncluded", normalizedIncluded);

  data.data.forEach((row: any) => {
    const flatRow: { [key: string]: any } = {
      ...row.attributes,
      id: row.id,
    };

    // get the included data for the relationship
    if (row.hasOwnProperty("relationships")) {
      Object.entries(row.relationships).forEach(([key, value]: any[]) => {
        /**
         * if key == "skills" then this needs to be mapped to the "Skill"
         * schema, loop through attributes to find "unique" string which
         * then should be displayed in the table for this relationship.
         */
        const uniqueKey = getUniqueFieldFromUnknownSchema(key);

        if (Array.isArray(value.data)) {
          // console.log("value.data", value.data, normalizedIncluded[key]);
          flatRow[key] = value.data.map((val: any) => ({
            // [uniqueKey]: normalizedIncluded[key][val.id][uniqueKey],
            ...normalizedIncluded[key][val.id],
            id: val.id,
            label: normalizedIncluded[key][val.id][uniqueKey],
          }));
          console.log(flatRow[key]);
          // flatRow[key] = value.data
          //   .map((val: any) => normalizedIncluded[key][val.id][uniqueKey])
          //   .join(",");
        } else {
          flatRow[key] = normalizedIncluded[key][value.data.id][uniqueKey];
        }
      });
    }

    flattened.push(flatRow);
  });

  return flattened;
}

export async function getData(schema: Schema) {
  // employees?include=skills%2Cassignments.role.project
  const url = `${window.env.API_BASE_URL}/${plural(
    schema.name,
  )}?include=skills`; // @todo how to extract includes from schema?
  const response = await fetch(url);
  const data = await response.json();
  console.log("data", data);
  const flat = getFlatData(data);
  console.log("flat", flat);
  return flat;
}
