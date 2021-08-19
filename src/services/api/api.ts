export interface CardData {
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

export async function getData(id?: string): Promise<CardData[]> {
  const response = await fetch(`/v1?id=${id}`);
  const { data } = await response.json();
  return data;
}
