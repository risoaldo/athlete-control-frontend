import { api } from "@/lib/axios";

export async function deleteAthlete(id: string) {
  await api.delete(`/athlete/${id}`);

}
