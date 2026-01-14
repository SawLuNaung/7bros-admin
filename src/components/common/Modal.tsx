"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { Separator } from "../ui/separator";

import { cn } from "../../lib/utils";

interface SettingModalProps
  extends React.ComponentProps<typeof AlertDialogPrimitive.Root> {
  toggle: () => void;
  open: boolean;
  title: string;
  editData?: any;
  editMode?: boolean;
  modelRatio?: string;
  form: React.ReactNode;
}

const EmployeeModal: React.FC<SettingModalProps> = ({
  open,
  toggle,
  title,
  editData,
  editMode,
  modelRatio,
  form,
  ...rest
}) => {
  return (
    <AlertDialog open={open} onOpenChange={toggle} {...rest}>
      <AlertDialogContent
        className={cn(
          "rounded-[10px] ",
          "w-[650px] h-auto max-w-[90%] ",
          modelRatio
        )}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>
            <h2 className="font-bold  text-primary-500 text-xl sm:text-2xl">
              {title}
            </h2>
          </AlertDialogTitle>
          <Separator className="bg-yellow-500" />
        </AlertDialogHeader>
        {form}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EmployeeModal;
