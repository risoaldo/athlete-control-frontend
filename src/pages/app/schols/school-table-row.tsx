import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { Pencil, Search, Trash } from "lucide-react";
import { AthleteDetail } from "./athlete-detail";
import type { schoolProp } from "@/api/get-schools";

interface schoolProps {
  school: schoolProp;
}

export function SchoolTableRow({ school }: schoolProps) {
  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
            </Button>
          </DialogTrigger>
          <AthleteDetail />
        </Dialog>
      </TableCell>
      <TableCell className="text-muted-foreground">{school.owner}</TableCell>
      <TableCell className="text-muted-foreground">{school.locality}</TableCell>

      <TableCell className="text-muted-foreground">103</TableCell>
      <TableCell className="flex items-center gap-2">
        <Button variant="outline" size="xs">
          <Pencil className="h-3 w-3" />
        </Button>
        <Button variant="outline" size="xs">
          <Trash className="h-3 w-3" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
