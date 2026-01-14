import { PlusIcon } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";

export interface TableFrameProps {
  isOutline?: boolean;
  modalTrue: () => void;
  subTitle: boolean;
  isWrite: boolean;
  showFi?: boolean;
  margin?: string;
  title: string;
}

function TableFrame({
  modalTrue,
  isWrite,
  isOutline = false,
  title,
  margin = "mb-4 mt-[24px]",
}: TableFrameProps) {
  return (
    <div className=" w-full max-w-full overflow-auto setting-data-table">
      <div className={cn("flex items-start justify-between", margin)}>
        <h2 className="font-bold  text-primary-500 text:xl sm:text-2xl">
          {title}
        </h2>
        {isWrite && (
          <Button
            variant="outline"
            className={cn(
              "font-normal rounded-[12px]   gap-2 text-sm ",
              isOutline &&
                " border-primary-500 bg-white border duration-500 text-primary-500 hover:bg-primary-500"
            )}
            onClick={modalTrue}
          >
            <PlusIcon className="size-4" />
            <span className="hidden text-[16px] sm:inline-block">Add New</span>
          </Button>
        )}
      </div>
    </div>
  );
}

export default TableFrame;
