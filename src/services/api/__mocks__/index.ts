export interface Employee {
  id: number;
  name: string;
}

export async function getData(): Promise<Employee[]> {
  return [
    { id: 1, name: "car" },
    { id: 2, name: "cam" },
    { id: 3, name: "caz" },
  ];
}
