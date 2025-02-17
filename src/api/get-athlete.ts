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

type athleteResponse = AthleteBody;

export async function getAthlete(id: string) {
  const result = await api.get<athleteResponse>(`/athlete/${id}`);

  return result.data;
}
