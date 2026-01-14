import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import Loader from "./Loader";

export interface ModalControlBtnsProps {
  isLoading: boolean;
  search?: boolean;
  editMode: boolean | undefined;
  toggle: () => void;
  setSameCheck?: (value: boolean) => void;
  size?:   "lg" | "sm";
  width?: string;
}

const ModalConfirmBtns = ({
  isLoading,
  editMode,
  toggle,
  search = false,
  setSameCheck,
  size = "sm",
  width = "w-[100px]",
}: ModalControlBtnsProps) => {
  return (
    <div className="w-full flex py-2 mt-2  justify-center sm:justify-end gap-2">
      <Button
        onClick={() => setSameCheck && setSameCheck(false)}
        type="submit"
        size={size}
        variant="outline"
        className={cn(`${isLoading && "opacity-50"} font-normal `, width)}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader />
        ) : search ? (
          "Search"
        ) : editMode ? (
          "Update"
        ) : (
          "Save"
        )}
      </Button>
      <Button
        type="button"
        onClick={toggle}
        size={size}
        variant="outline"
        disabled={isLoading}
        className={cn(` w-[100px] ${isLoading && "opacity-50"}`, width)}
      >
        {search ? "Reset" : "Cancel"}
      </Button>
    </div>
  );
};

export default ModalConfirmBtns;
