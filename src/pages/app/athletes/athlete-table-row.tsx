import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { Pencil, Search, Trash } from "lucide-react";
import { AthleteDetail } from "./athlete-detail";
import type { athleteProps } from "@/api/get-athletes";
import React from "react";
import { FormUpdatedAthlete } from "./form-updated-athlete";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAthlete } from "@/api/delete-athlete";
import { toast } from "sonner";

interface athleteRowProps {
  athlete: athleteProps;
}
export function AthleteTableRow({ athlete }: athleteRowProps) {
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);

  const queryClient = useQueryClient();

  const { mutateAsync: deleteAthleteFn } = useMutation({
    mutationFn: deleteAthlete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["athletes"] });
    },
  });

  const handleDelete = React.useCallback(async () => {
    try {
      await deleteAthleteFn(athlete.id);
      toast.success("Deletao com sucesso!");
    } catch (error) {
      toast.error("Falha em deletar atleta!");
    }
  }, [deleteAthleteFn, athlete.id]);

  return (
    <TableRow>
      <TableCell>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
            </Button>
          </DialogTrigger>
          <AthleteDetail athlete={athlete} />
        </Dialog>
      </TableCell>
      <TableCell className="text-muted-foreground">{athlete.name}</TableCell>
      <TableCell className="text-muted-foreground">
        {athlete.locality}
      </TableCell>

      <TableCell className="text-muted-foreground">
        {athlete.birthDate}
      </TableCell>
      <TableCell className="flex items-center gap-2">
        <Dialog open={openEdit} onOpenChange={setOpenEdit}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Pencil className="h-3 w-3" />
            </Button>
          </DialogTrigger>
          <FormUpdatedAthlete
            setOpen={setOpenEdit}
            open={openEdit}
            athlete={athlete}
          />
        </Dialog>

        <Button onClick={handleDelete} variant="outline" size="xs">
          <Trash className="h-3 w-3" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
