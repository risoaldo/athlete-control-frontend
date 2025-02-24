import { api } from "@/lib/axios";

interface GetAthletesQuery {
  pageIndex?: number | null;
}

interface School {
  id: string;
}

interface Modality {
  id: number;
  modalityName?: string;
}

export interface athleteProps {
  id: string;
  name: string;
  locality: string;
  birthDate: string;
  contact: string;
  street?: string;
  modalities: Modality[];
  school?: School;
  createdAt?: string;
}

type athleteResponse = {
  content: athleteProps[];
  totalElements: number;
  size: number;
};

export async function getAthletes({ pageIndex }: GetAthletesQuery) {
  const result = await api.get<athleteResponse>("/athlete", {
    params: { pageIndex },
  });

  return result.data;
}
