export interface Employee {
  id: string;
  avatar: string;
  name: string;
  title: string;
  startDate: string;
  endDate: string;
  skills: {
    name: string;
  }[];
  available: boolean;
}

export async function getData(foo?: string): Promise<Employee[]> {
  const response = await fetch(`/v1?foo=${foo}`);
  const { data } = await response.json();
  return data;
}
