import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AthleteTableRow } from "./athlete-table-row";
import { AthleteTableFilter } from "./athlete-table-filter";
import { Pagination } from "@/components/pagination";
import { useQuery } from "@tanstack/react-query";
import { getAthletes } from "@/api/get-athletes";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

export function Athletes() {
  const [searchParams, _] = useSearchParams();

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get("page") ?? "1");

  const { data: athletes } = useQuery({
    queryKey: ["athletes"],
    queryFn: () => getAthletes({ pageIndex }),
  });

  console.log(athletes);
  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">
          Listagem dos atletas
        </h1>
      </div>
      <div className="space-y-2.5">
        <AthleteTableFilter />

        <div className="bordeer rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[64px]">Detalhe</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Localidadde</TableHead>
                <TableHead>Data de Nascimento</TableHead>
                <TableHead className="w-[64px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {athletes &&
                athletes.content.map((athlete) => {
                  return <AthleteTableRow key={athlete.id} athlete={athlete} />;
                })}
            </TableBody>
          </Table>
        </div>
        <Pagination
          pageIndex={0}
          perPage={ 8}
          totalCount={athletes?.totalElements ? athletes?.totalElements : 0}
        />
      </div>
    </>
  );
}
