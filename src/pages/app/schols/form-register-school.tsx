import { Button } from "@/components/ui/button";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function FormRegisterSchool() {
  return (
    <DialogContent>
      <DialogTitle>Cadastrar atleta</DialogTitle>

      <div className="flex flex-col gap-2">
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nome da escolinha</Label>
              <Input id="name" placeholder="Nome do atleta" />
            </div>

            <div className="flex-1 flex-col space-y-1.5">
                <Label htmlFor="name_admin">Nome do responsável</Label>
                <Input id="name_admin" placeholder="Responsável" />
              </div>


            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Localidade</Label>
              <Select defaultValue="null">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="null">Selecione</SelectItem>
                  <SelectItem value="Centrto">Centrto</SelectItem>
                  <SelectItem value="Sitio agua branca">
                    Sitio agua branca
                  </SelectItem>
                  <SelectItem value="Lima Campos">Lima Campos</SelectItem>
                  <SelectItem value="Canto">Canto</SelectItem>
                  <SelectItem value="Cascudo">Cascudo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-row items-center justify-between gap-2">
              <div className="flex-1 flex-col space-y-1.5">
                <Label htmlFor="foundation-date">Data de  fundação</Label>
                <Input id="foundation-date" placeholder="00/00/0000" />
              </div>

              <div className="flex-1 flex-col space-y-1.5">
                <Label htmlFor="name">Contato</Label>
                <Input id="contact" placeholder="(88) 88888-8888" />
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Button type="submit" variant="success" size="lg">
                Salvar
              </Button>
            </div>
          </div>
        </form>
      </div>
    </DialogContent>
  );
}
