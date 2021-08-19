export interface Employee {
  id: number;
  name: string;
}

export async function getData(foo?: string): Promise<Employee[]> {
  const response = await fetch(`/v1?foo=${foo}`);
  const { data } = await response.json();
  return data;
}
