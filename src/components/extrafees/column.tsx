import { ColumnDef } from "@tanstack/react-table";
import { cn, getRelativeTime } from "../../lib/utils";
import ActiveBadge from "../common/ActiveBadge";
import InactiveBadge from "../common/InactiveBadge";
import CellAction from "../common/CellAction";
import { useBoolean } from "usehooks-ts";
import { useState } from "react";
import EmployeeModal from "../common/Modal";
import { ExtraFeesForm } from "./extra-fees-form";

export type ExtraFeesType = {
  __typename: string;
  updated_at: string;
  name: string;
  id: string;
  disabled: boolean;
  created_at: string;
  amount: number;
};

export const columns: ColumnDef<ExtraFeesType>[] = [
  {
    id: "id",
  },
  {
    accessorKey: "name",
    header: () => {
      return (
        <section className={cn("flex  justify-start  items-center gap-2")}>
          <h3>Name</h3>
        </section>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => {
      return (
        <section className={cn("flex  justify-start  items-center gap-2")}>
          <h3>Amount</h3>
        </section>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: ({}) => {
      return (
        <section className={cn("flex  justify-start  items-center gap-2")}>
          <h3>Created Time</h3>
        </section>
      );
    },
    cell: ({ row }) => {
      const dateString = row.getValue("created_at") as string;

      const relativeTime = getRelativeTime(dateString);

      return (
        <div className="">
          <h3>{relativeTime}</h3>
        </div>
      );
    },
  },
  {
    accessorKey: "disabled",
    header: ({}) => {
      return (
        <section className={cn("flex  justify-start  items-center gap-2")}>
          <h3>Disabled</h3>
        </section>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("disabled") as string;
      return (
        <div className="">
          {status ? (
            <ActiveBadge type="verified" />
          ) : (
            <InactiveBadge type="verified" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: () => {
      return (
        <div className="h-full bg-zinc-50  flex items-center justify-center">
          <p className="font-bold text-zinc-500 text-center">Action</p>
        </div>
      );
    },
    cell: ({ row }) => {
      const [setDeleteData] = useState<any>();
      const [singleDriverData, setSingleDriverData] = useState<any>({
        address: "",
        balance: "",
        birth_date: "",
        created_at: "",
        disabled: null,
        driver_id: "",
      });

      const { toggle: dToggle } = useBoolean(false);
      const { value, toggle } = useBoolean(false);

      const handleEdit = (row: any) => {
        const RowData = row.original;
        setSingleDriverData(RowData);

        toggle();
      };


      return (
        <div className={"flex justify-center "}>
          <CellAction
            language="section"
            isDelete={false}
            isEdit={false}
            isDetails
            setSingleCodeGenerator={setDeleteData}
            handleDelete={() => dToggle()}
            handleEdit={handleEdit}
            row={row}
          />
          <EmployeeModal
            title={"Extra Fees Detail"}
            modelRatio="w-[100svw] lg:w-[650px]"
            editMode={true}
            open={value}
            toggle={toggle}
            form={
              <ExtraFeesForm
                editMode
                editData={singleDriverData || []}
                toggle={toggle}
              />
            }
          />
        </div>
      );
    },
  },
];
