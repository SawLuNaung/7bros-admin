import React, { FC, ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
} from "../ui/alert-dialog";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { Button } from "../ui/button";
import Loader from "./Loader";
import { Dispatch, SetStateAction } from "react";
import { TrashIcon } from "lucide-react";

export interface UseBooleanOutput {
  value: boolean;
  setValue: Dispatch<SetStateAction<boolean>>;
  setTrue: () => void;
  setFalse: () => void;
  toggle: () => void;
}

export interface AlertModalProps
  extends React.ComponentProps<typeof AlertDialogPrimitive.Root>,
    Omit<Partial<UseBooleanOutput>, "open" | "toggle"> {
  open: boolean;
  toggle: () => void;
  onCancel?: () => void;
  onConfirm?: () => void;
  message?: string;
  title?: string;
  isLoading?: boolean;
  fun?: (row: any) => void;
  type?: any;
  children?: ReactNode;
  className?: string;
  closeBtn?: boolean;
}

export const DeleteConfirm: FC<AlertModalProps> = ({
  message,
  open,
  onCancel,
  onConfirm,
  setFalse,
  toggle,
  isLoading,
  title,
  fun,
  ...rest
}) => {
  const onCancelHandler = () => {
    toggle();
  };

  return (
    <AlertDialog open={open} onOpenChange={toggle} {...rest}>
      <AlertDialogContent className=" w-[min(400px,90%)] h-auto rounded-[12px]">
        <AlertDialogHeader>
          <AlertDialogDescription>
            <div className="mx-auto flex flex-col items-center space-y-3">
              <div className="flex p-2 justify-center bg-red-100 items-center rounded-full bg-danger-200">
                <TrashIcon className="w-[24px] h-[24px]"  />
              </div>
              <p className="text-center text-[#E03137] text-md font-light">
                {title}
              </p>
              <p className="text-center text-[14px]  font-[600] text-[#71717A] ">
                {message}
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="w-full flex mt-3  justify-center gap-4  ">
          <Button
            className={`${
              isLoading && "opacity-70"
            } bg-[#E03137]  rounded-[10px] sm:px-8 h-[38px] w-[100px]`}
            onClick={fun}
            variant="destructive"
          >
            {isLoading ? <Loader /> : "Delete"}
          </Button>
          <Button
            onClick={onCancelHandler}
            variant="outline"
            className={`${
              isLoading && "opacity-70"
            } text-[#52525B]  rounded-[10px] sm:px-8 h-[38px] w-[100px] `}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
