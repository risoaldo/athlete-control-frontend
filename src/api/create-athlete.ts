import { api } from "@/lib/axios";

interface School {
  id: string;
}

interface Modality {
  id: number;
}

export interface AthleteBody {
  name: string;
  locality: string;
  birthDate: string;
  contact: string;
  street: string;
  modalities: Modality[];
  school: School; 
}


export async function createAthlete(params: AthleteBody) {
  await api.post("/athlete", params);
}
