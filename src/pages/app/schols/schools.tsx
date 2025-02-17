import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SchoolTableRow } from "./school-table-row";
import { SchoolTableFilter } from "./school-table-filter";
import { Pagination } from "@/components/pagination";
import { useQuery } from "@tanstack/react-query";
import { getSchools } from "@/api/get-schools";

export function Schools() {
  const { data: schoolsFn } = useQuery({
    queryKey: ["schools"],
    queryFn: getSchools,
  });

  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">
          Listagem de escolinhas
        </h1>
      </div>
      <div className="space-y-2.5">
        <SchoolTableFilter />

        <div className="bordeer rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[64px]">Detalhe</TableHead>
                <TableHead>Responsável pela escolinha</TableHead>
                <TableHead>Localidadde</TableHead>
                <TableHead>Quantidade de atletas</TableHead>
                <TableHead className="w-[64px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schoolsFn &&
                schoolsFn.map((sc) => <SchoolTableRow key={sc.id} school={sc} />)}
            </TableBody>
          </Table>
        </div>
        <Pagination pageIndex={0} perPage={8} totalCount={200} />
      </div>
    </>
  );
}
