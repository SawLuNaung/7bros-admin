import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

import { Button } from "../ui/button";

export interface CellActionProps {
  language: string;
  handleEdit: (row: any) => void;
  handleDelete: (row: any) => void;
  isDetails?: boolean;
  isEdit?: boolean;
  isDelete?: boolean;
  row: any;
  setSingleCodeGenerator: (row: any) => void;
}

function CellAction({
  setSingleCodeGenerator,
  handleDelete,
  isDelete = true,
  isDetails,
  isEdit = true,
  handleEdit,
  row,
}: CellActionProps) {
  return (
    <div
      className={`flex justify-center items-center  w-full 
      }`}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild className={` hover:`}>
          <Button
            variant="outline"
            className="h-8  bg-primary-600 hover:bg-primary-500 w-[1.75rem] rounded-[7px] p-0"
          >
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4 rotate-90" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {isEdit && (
            <DropdownMenuItem onClick={() => handleEdit(row)}>
              Edit
            </DropdownMenuItem>
          )}
          {isDetails && (
            <DropdownMenuItem onClick={() => handleEdit(row)}>
              Details
            </DropdownMenuItem>
          )}
          {isDelete && (
            <DropdownMenuItem
              onClick={() => {
                handleDelete(row);
                setSingleCodeGenerator(row);
              }}
            >
              Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default CellAction;
