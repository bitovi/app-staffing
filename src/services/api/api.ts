export interface Employee {
  id: string;
  avatar: string;
  name: string;
  title: string;
  startDate: string;
  endDate: string;
  skills: Skill[];
  available: boolean;
}

export interface Skill {
  name: string;
}

export async function getData(id?: string): Promise<Employee[]> {
  const response = await fetch(`/v1?id=${id}`);
  const { data } = await response.json();
  return data;
}
