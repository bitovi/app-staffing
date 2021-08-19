export interface Datum {
  id: number;
  name: string;
}

export async function getData(): Promise<Datum[]> {
  return [
    { id: 1, name: "car" },
    { id: 2, name: "cam" },
    { id: 3, name: "caz" },
  ];
}
