import type { athleteProps } from "@/api/get-athletes";
import { Badge } from "@/components/ui/badge";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

interface athleteRowProps {
  athlete: athleteProps;
}

const calcularIdade = (dataNascimento: string): number => {
  const [dia, mes, ano] = dataNascimento.split("/").map(Number);
  const nascimento = new Date(ano, mes - 1, dia); // Mês começa do zero
  const hoje = new Date();

  let idade = hoje.getFullYear() - nascimento.getFullYear();

  // Verifica se já fez aniversário no ano atual
  const aindaNaoFezAniversario =
    hoje.getMonth() < nascimento.getMonth() ||
    (hoje.getMonth() === nascimento.getMonth() &&
      hoje.getDate() < nascimento.getDate());

  if (aindaNaoFezAniversario) {
    idade--;
  }

  return idade;
};

const formatarData = (dataISO: string): string => {
  const data = new Date(dataISO);

  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0"); // Mês começa do zero
  const ano = data.getFullYear();
  const horas = String(data.getHours()).padStart(2, "0");
  const minutos = String(data.getMinutes()).padStart(2, "0");

  return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
};

export function AthleteDetail({ athlete }: athleteRowProps) {
  return (
    <DialogContent>
      <DialogTitle>{athlete.name}</DialogTitle>

      <div className="flex flex-col gap-2">
        <span className="font-semibold text-muted-foreground">
          Modalidades do atleta
        </span>
        <div className="flex flex-wrap gap-2">
          {athlete.modalities.map((m) => (
            <Badge key={m.id}>{m.modalityName}</Badge>
          ))}
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
                {calcularIdade(athlete.birthDate)} anos
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Contato</TableCell>
              <TableCell className="flex justify-end">
                {athlete.contact}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Rua</TableCell>
              <TableCell className="flex justify-end">
                {athlete.street}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">
                Data de cadastro
              </TableCell>
              <TableCell className="flex justify-end">
                {athlete.createdAt
                  ? formatarData(athlete.createdAt)
                  : "Não informado"}
              </TableCell>
            </TableRow>
            {athlete.school && (
              <TableRow>
                <TableCell className="text-muted-foreground">
                  Escolinha
                </TableCell>
                <TableCell className="flex justify-end">
                  {athlete.school.id}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </DialogContent>
  );
}
