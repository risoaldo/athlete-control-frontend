import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import { MultiSelect } from "@/components/ui/multi-select";
import { toast } from "sonner";
import { getModalitys } from "@/api/get-modalitys";
import { updateAthlete } from "@/api/update-athlete";
import type { athleteProps } from "@/api/get-athletes";

interface FormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  athlete: athleteProps;
}

export function FormUpdatedAthlete({ setOpen, open, athlete }: FormProps) {
  const [formData, setFormData] = useState({
    name: "",
    street: "",
    locality: "null",
    birthDate: "",
    contact: "",
    modalities: [] as string[], // Agora usa IDs das modalidades
  });
  const [selectedModalities, setSelectedModalities] = useState<string[]>(
    athlete.modalities.map((m) => String(m.id)),
  );

  // Busca modalidades ao abrir o modal
  const { data: modalitysList = [] } = useQuery({
    queryKey: ["modalitys"],
    queryFn: getModalitys,
    enabled: open,
  });

  const queryClient = useQueryClient();

  const { mutateAsync: updateAthleteFn } = useMutation({
    mutationFn: updateAthlete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["athletes"] });
    },
  });

  // Atualiza os dados quando `athlete` muda
  useEffect(() => {
    if (athlete) {
      setFormData({
        name: athlete.name || "",
        street: athlete.street || "",
        locality: athlete.locality || "null",
        birthDate: athlete.birthDate || "",
        contact: athlete.contact || "",
        modalities: athlete.modalities.map((modality) => String(modality.id)),
      });
    }
  }, [athlete]);

  // Atualiza os campos dinamicamente
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  // Formata a data de nascimento
  const handleBirthDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, "");
    if (input.length > 8) input = input.slice(0, 8);
    const formattedValue = input
      .replace(/^(\d{2})(\d)/, "$1/$2")
      .replace(/^(\d{2}\/\d{2})(\d)/, "$1/$2");

    setFormData((prev) => ({
      ...prev,
      birthDate: formattedValue,
    }));
  };

  // Salvar alterações
  const handleSave = async () => {
    const formDataFormated = {
      ...formData,
      id: athlete.id,
      modalities: selectedModalities.map((m) => {
        return {
          id: +m,
        };
      }),
    };
    try {
      await updateAthleteFn(formDataFormated);
      setOpen(false);
      toast.success("Alterado com sucesso!");
    } catch (error) {
      toast.error("Falha ao editar atleta!");
    }
  };

  return (
    <DialogContent>
      <DialogTitle>Editar atleta</DialogTitle>

      <div className="flex flex-col gap-2">
        <div className="grid w-full items-center gap-4">
          {/* Nome */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Nome do atleta</Label>
            <Input
              id="name"
              placeholder="Nome do atleta"
              value={formData.name}
              onChange={(e) => handleInputChange(e, "name")}
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            {/* <MultiSelect
              options={modalitysList.map((modality) => ({
                value: modality.id.toString(), // IDs como string para compatibilidade
                label: modality.modalityName,
              }))}
              onValueChange={handleModalityChange}
              value={selectedModalities}
              placeholder="Selecione a(s) modalidade(s)"
              variant="inverted"
            /> */}

            <MultiSelect
              options={modalitysList.map((modality) => ({
                value: modality.id.toString(), // IDs como string para compatibilidade
                label: modality.modalityName,
              }))}
              onValueChange={setSelectedModalities}
              defaultValue={selectedModalities}
              placeholder="Select frameworks"
              variant="inverted"
              animation={2}
              maxCount={3}
            />
          </div>

          {/* Localidade */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="locality">Localidade</Label>
            <Select
              value={formData.locality}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, locality: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="null">Selecione</SelectItem>
                <SelectItem value="LIMA CAMPOS">Lima Campos</SelectItem>
                <SelectItem value="PERIMETRO ZONA 1">
                  Perímetro Zona 1
                </SelectItem>
                <SelectItem value="PERIMETRO ZONA 2">
                  Perímetro Zona 2
                </SelectItem>
                <SelectItem value="SEDE RURAL 1">Sede Rural 1</SelectItem>
                <SelectItem value="SEDE RURAL 2">Sede Rural 2</SelectItem>
                <SelectItem value="ICOZINHO">Icozinho</SelectItem>
                <SelectItem value="SAO VICENTE">São Vicente</SelectItem>
                <SelectItem value="PEDRINHAS 1">Pedrinhas 1</SelectItem>
                <SelectItem value="PEDRINHAS 2">Pedrinhas 2</SelectItem>
                <SelectItem value="CRUZEIRINHO">Cruzeirinho</SelectItem>
                <SelectItem value="BAIRRO DOS ALTOS">
                  Bairro dos Altos
                </SelectItem>
                <SelectItem value="BNH">BNH</SelectItem>
                <SelectItem value="CIDADE NOVA">Cidade Nova</SelectItem>
                <SelectItem value="JOSEFA CAMPOS">Josefa Campos</SelectItem>
                <SelectItem value="CENTRO">Centro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Nome da rua */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="street">Nome da rua</Label>
            <Input
              id="street"
              placeholder="Nome da rua"
              value={formData.street}
              onChange={(e) => handleInputChange(e, "street")}
            />
          </div>

          {/* Data de nascimento e contato */}
          <div className="flex flex-row items-center justify-between gap-2">
            <div className="flex-1 flex-col space-y-1.5">
              <Label htmlFor="birthDate">Data de nascimento</Label>
              <Input
                id="birthDate"
                placeholder="00/00/0000"
                value={formData.birthDate}
                onChange={handleBirthDateInput}
              />
            </div>

            <div className="flex-1 flex-col space-y-1.5">
              <Label htmlFor="contact">Contato</Label>
              <Input
                id="contact"
                placeholder="(88) 88888-8888"
                value={formData.contact}
                onChange={(e) => handleInputChange(e, "contact")}
              />
            </div>
          </div>

          {/* Botão de salvar */}
          <div className="flex flex-col space-y-1.5">
            <Button
              type="button"
              variant="success"
              size="lg"
              onClick={handleSave}
            >
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
