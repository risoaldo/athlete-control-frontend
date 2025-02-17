import React from "react";
import { createAthlete } from "@/api/create-athlete";
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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { getModalitys } from "@/api/get-modalitys";

const createAthleteForm = z.object({
  name: z.string(),
  locality: z.string().nonempty(),
  birthDate: z.string().nonempty(),
  contact: z.string().nonempty(),
  street: z.string().nonempty(),
  modalities: z.array(z.object({ id: z.number() })),
  school: z.object({ id: z.string() }),
});

type CreateAthleteForm = z.infer<typeof createAthleteForm>;
interface FormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}
export function FormRegisterAthlete({ setOpen, open }: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    control,
    reset,
  } = useForm<CreateAthleteForm>();
  const queryClient = useQueryClient();

  const { mutateAsync: athlete } = useMutation({
    mutationFn: createAthlete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["athletes"] });
    },
  });

  const { data: modalitysList } = useQuery({
    queryKey: ["modalitys"],
    queryFn: getModalitys,
    enabled: open,
  });

  const handleCreate = React.useCallback(async (data: CreateAthleteForm) => {
    try {
      const formattedModalities = data.modalities.map((id) => ({
        id: Number(id),
      }));
      const formattedData = {
        ...data,
        modalities: formattedModalities,
      };
      console.log(formattedData);
      await athlete(formattedData);

      reset({
        name: "",
        locality: "null",
        birthDate: "",
        contact: "",
        modalities: [],
      });

      setOpen(false);
      toast.success("Sucesso");
    } catch (error) {
      toast.error("Deu ruim");
    }
  }, []);

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
    <DialogContent>
      <DialogTitle>Cadastrar atleta</DialogTitle>

      <div className="flex flex-col gap-2">
        <form onSubmit={handleSubmit(handleCreate)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nome do atleta</Label>
              <Input
                id="name"
                placeholder="Nome do atleta"
                {...register("name")}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="street">Nome do atleta</Label>
              <Input
                id="street"
                placeholder="Nome da rua"
                {...register("street")}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Controller
                name="modalities"
                control={control}
                render={({ field: { onChange, disabled } }) => {
                  return (
                    <ToggleGroup
                      type="multiple"
                      variant="default"
                      onValueChange={onChange}
                      disabled={disabled}
                    >
                      {modalitysList &&
                        modalitysList.length > 0 &&
                        modalitysList.map(({ modalityName, id }) => (
                          <ToggleGroupItem
                            key={id}
                            value={id}
                            aria-label="Toggle bold"
                          >
                            {modalityName}
                          </ToggleGroupItem>
                        ))}
                    </ToggleGroup>
                  );
                }}
              ></Controller>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Localidade</Label>

              <Controller
                name="locality"
                control={control}
                render={({ field: { name, onChange, value, disabled } }) => {
                  return (
                    <Select
                      defaultValue="null"
                      name={name}
                      onValueChange={onChange}
                      value={value}
                      disabled={disabled}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="null">Selecione</SelectItem>
                        <SelectItem value="LIMA CAMPOS">Lima campos</SelectItem>
                        <SelectItem value="PERIMETRO ZONA 1">
                          Perimetro zona 1
                        </SelectItem>
                        <SelectItem value="PERIMETRO ZONA 2">
                          Perimetro zona 2
                        </SelectItem>
                        <SelectItem value="SEDE RURAL 1">
                          Sede rural 1
                        </SelectItem>
                        <SelectItem value="SEDE RURAL 2">
                          Sede rural 2
                        </SelectItem>
                        <SelectItem value="ICOZINHO">Icozinho</SelectItem>
                        <SelectItem value="SAO VICENTE">São Vicente</SelectItem>
                        <SelectItem value="PEDRINHAS 1">Pedrinhas 1</SelectItem>
                        <SelectItem value="PEDRINHAS 2">Pedrinhas 2</SelectItem>
                        <SelectItem value="CRUZEIRINHO">Cruzeirinho</SelectItem>
                        <SelectItem value="BAIRRO DOS ALTOS">
                          Bairro dos altos
                        </SelectItem>
                        <SelectItem value="BNH">BNH</SelectItem>
                        <SelectItem value="CIDADE NOVA">Cidade Nova</SelectItem>
                        <SelectItem value="JOSEFA CAMPOS">
                          Josefa Campos
                        </SelectItem>
                        <SelectItem value="CENTRO">Centro</SelectItem>
                      </SelectContent>
                    </Select>
                  );
                }}
              ></Controller>
            </div>

            <div className="flex flex-row items-center justify-between gap-2">
              <div className="flex-1 flex-col space-y-1.5">
                <Label htmlFor="name">Data de nascimento</Label>
                <Input
                  id="birthday"
                  placeholder="00/00/0000"
                  {...register("birthDate")}
                  onChange={handleInput}
                />
              </div>

              <div className="flex-1 flex-col space-y-1.5">
                <Label htmlFor="name">Contato</Label>
                <Input
                  id="contact"
                  placeholder="(88) 88888-8888"
                  {...register("contact")}
                />
              </div>
            </div>

            {/* <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Participa de alguma escolinha</Label>
              <Select defaultValue="null">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="null">Selecione</SelectItem>
                  <SelectItem value="nao">Não</SelectItem>
                  <SelectItem value="Centrto">Chigo moto</SelectItem>
                  <SelectItem value="Sitio agua branca">Rejano</SelectItem>
                  <SelectItem value="Lima Campos">Junior da padaria</SelectItem>
                  <SelectItem value="Canto">Fla junior</SelectItem>
                  <SelectItem value="Cascudo">Outra</SelectItem>
                </SelectContent>
              </Select>
            </div> */}
            <div className="flex flex-col space-y-1.5">
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="success"
                size="lg"
              >
                Salvar
              </Button>
            </div>
          </div>
        </form>
      </div>
    </DialogContent>
  );
}
