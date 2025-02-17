import { Badge } from "@/components/ui/badge";
import {
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell, 
  TableRow,
} from "@/components/ui/table";

export function AthleteDetail() {
  return (
    <DialogContent>
      <DialogTitle>Nome do atleta</DialogTitle>

      <div className="flex flex-col gap-2">
        <span className="font-semibold text-muted-foreground">
          Modalidades do atleta
        </span>
        <div className="flex flex-wrap gap-2">
          <Badge>Futebol dde campo</Badge>
          <Badge>Futsal</Badge>
          <Badge>Jiu-jitsu</Badge>
          <Badge>Beach Tennis</Badge>
        </div>
      </div>

      <div className="space-y-6">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">
                Status no sistema
              </TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="font-medium text-muted-foreground">
                    Ativo
                  </span>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Idade</TableCell>
              <TableCell className="flex justify-end">
                28 anos
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Contato</TableCell>
              <TableCell className="flex justify-end">
                (77) 99999-9999
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Data de cadastro</TableCell>
              <TableCell className="flex justify-end">
                10/10/2000
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">
                Escolinha
              </TableCell>
              <TableCell className="flex justify-end">Junior dapadaria</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </DialogContent>
  );
}
