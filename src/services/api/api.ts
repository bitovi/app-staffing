export interface Datum {
  id: number;
  name: string;
}

export async function getData(id?: string): Promise<Datum[]> {
  const response = await fetch(`/v1?id=${id}`);
  const { data } = await response.json();
  return data;
}
