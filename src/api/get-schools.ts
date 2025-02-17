import { api } from "@/lib/axios";

//interface GetAthletesQuery {
  //pageIndex?: number | null;
//}

export interface schoolProp {
  id: string;
  owner: string;
  foundationDate: string;
  contact: string;
  locality: string;
  createdAt: string;
}

type schoolResponse = schoolProp[];

export async function getSchools() {
  const result = await api.get<schoolResponse>("/school");

  return result.data;
}
