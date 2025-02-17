import { api } from "@/lib/axios";

export interface modalityProps {
  id: string;
  modalityName: string;
}

type modalityResponse = modalityProps[];

export async function getModalitys() {
  const result = await api.get<modalityResponse>("/modality");

  return result.data;
}
