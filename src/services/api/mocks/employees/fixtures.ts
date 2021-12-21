import faker from "faker";

interface JSONEmployee {
  id: string;
  attributes: {
    name: string;
    start_date: Date;
    end_date: Date;
  };
  relationships: {
    skills: {
      data: Array<{ type: "skills"; id: string }>;
    };
  };
}

faker.seed(0);

let employeeId = 0;

export function makeEmployee(): JSONEmployee {
  return {
    id: `${++employeeId}`,
    attributes: {
      name: faker.name.findName(),
      start_date: faker.date.past(),
      end_date: faker.date.future(),
    },
    relationships: {
      skills: {
        data: [],
      },
    },
  };
}

export const employees: JSONEmployee[] = [
  makeEmployee(),
  makeEmployee(),
  makeEmployee(),
  makeEmployee(),
  makeEmployee(),
];
