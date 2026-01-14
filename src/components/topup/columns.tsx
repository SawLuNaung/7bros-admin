import { ColumnDef } from "@tanstack/react-table";
import { cn, getRelativeTime } from "../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useState } from "react";
import { useBoolean } from "usehooks-ts";
import CellAction from "../common/CellAction";
import EmployeeModal from "../common/Modal";
import { TopUpForm } from "./topUp-form";

type Driver = {
  __typename: string;
  name: string;
  phone: string;
  driver_id:string;
  address: string;
  profile_picture_url: string;
  vehicle_number: string;
  balance: number;
  bookings: unknown[]; // You can define a specific type for bookings if needed
};

type DriverTransaction = {
  __typename: string;
  id: string;
  amount: number;
  status: string;
  created_at: string;
  transaction_number: string;
  driver: Driver;
};

export const columns: ColumnDef<DriverTransaction>[] = [
  {
    id: "id",
  },
  {
    accessorKey: "driver.name",
    header: () => {
      return (
        <section className={cn("flex  justify-start  items-center gap-2")}>
          <h3>Name</h3>
        </section>
      );
    },
  },
  {
    accessorKey: "driver.driver_id",
    header: () => {
      return (
        <section className={cn("flex  justify-start  items-center gap-2")}>
          <h3>Driver ID</h3>
        </section>
      );
    },
  },
  {
    accessorKey: "driver.profile_picture_url",
    header: () => {
      return (
        <section className={cn("flex  justify-start  items-center gap-2")}>
          <h3>Photo</h3>
        </section>
      );
    },
    cell: ({ row }) => {


      const PICURL = row.original.driver.profile_picture_url as string;
      return (
        <div className="">
          {PICURL ? (
            <Avatar>
              <AvatarImage src={PICURL} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          ) : (
            <Avatar>
              <AvatarImage src={PICURL} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "driver.phone",
    header: () => {
      return (
        <section className={cn("flex  justify-start  items-center gap-2")}>
          <h3>Phone</h3>
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
    header: () => {
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
    accessorKey: "status",
    header: () => {
      return (
        <section className={cn("flex  justify-start  items-center gap-2")}>
          <h3>Status</h3>
        </section>
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
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [ setDeleteData] = useState<any>();
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [singleDriverData, setSingleDriverData] = useState<any>({
        address: "",
        balance: "",
        birth_date: "",
        created_at: "",
        disabled: null,
        driver_id: "",
      });

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const {  toggle: dToggle } = useBoolean(false);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { value, toggle } = useBoolean(false);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const handleEdit = (row: any) => {
        const RowData = row.original;
        setSingleDriverData(RowData);

        toggle();
      };

      
      return (
        <div className={"flex justify-center "}>
          <CellAction
            language="section"
            setSingleCodeGenerator={setDeleteData}
            handleDelete={() => dToggle()}
            handleEdit={handleEdit}
            isDelete={false}
            isEdit={false}
            isDetails
            row={row}
          />
          <EmployeeModal
            title={"Details Top Up"}
            modelRatio="w-[100svw] lg:w-[650px]"
            editMode={true}
            open={value}
            toggle={toggle}
            form={
              <TopUpForm
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
