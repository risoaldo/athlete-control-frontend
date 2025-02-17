import { api } from "@/lib/axios";

interface School {
  id: string;
}

interface Modality {
  id: number;
}

export interface AthleteBody {
  id: string;
  name: string;
  locality: string;
  birthDate: string;
  contact: string;
  street: string;
  modalities: Modality[];
  school?: School; 
}


export async function updateAthlete(params: any) {
  await api.put("/athlete", params);
}
