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

export async function getData(id?: string): Promise<Employee[]> {
  const response = await fetch(`/v1?id=${id}`);
  const { data } = await response.json();
  return data;
}
