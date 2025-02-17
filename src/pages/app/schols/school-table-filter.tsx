import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, X } from "lucide-react";
import { FormRegisterSchool } from "./form-register-school";

export function SchoolTableFilter() {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, "");
    if (input.length > 8) input = input.slice(0, 8);

    // Aplica o formato 00/00/0000
    const formattedValue = input
      .replace(/^(\d{2})(\d)/, "$1/$2")
      .replace(/^(\d{2}\/\d{2})(\d)/, "$1/$2");

    e.target.value = formattedValue;
  };

  return (
    <div className="flex items-center justify-between">
      <form className="flex items-center gap-2">
        <span className="text-sm font-semibold"> Filtros:</span>
        <Input
          className="h-8 w-[320px]"
          placeholder="Nome do atleta ou localidade"
        />
        <Input
          className="h-8 w-[200px]"
          placeholder="00/00/0000"
          onChange={handleInput}
        />

        <Select defaultValue="all">
          <SelectTrigger className="h-8 w-[320px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="Centrto">Centrto</SelectItem>
            <SelectItem value="Sitio agua branca">Sitio agua branca</SelectItem>
            <SelectItem value="Lima Campos">Lima Campos</SelectItem>
            <SelectItem value="Canto">Canto</SelectItem>
            <SelectItem value="Cascudo">Cascudo</SelectItem>
          </SelectContent>
        </Select>

        <Button type="submit" variant="secondary" size="xs">
          <Search className="mr-2 h-4 w-4" />
          Filtrar resultados
        </Button>

        <Button type="button" variant="outline" size="xs">
          <X className="mr-2 h-4 w-4" />
          Remover filtros
        </Button>
      </form>

      <Dialog>
        <DialogTrigger asChild>
          <Button type="button" variant="success" size="xs">
            <Plus className="mr-2 h-4 w-4" color="#fff" />
            Adicionar escolinha
          </Button>
        </DialogTrigger>
        <FormRegisterSchool />
      </Dialog>
    </div>
  );
}
