export interface Datum {
  id: 1;
  name: "bar";
}

export async function getData(): Promise<Datum[]> {
  const response = await fetch("/v1");
  const { data } = await response.json();
  return data;
}
