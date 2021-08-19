export interface Datum {
  id: number;
  name: string;
}

export async function getData(): Promise<Datum[]> {
  const response = await fetch("/v1");
  const { data } = await response.json();
  return data;
}
