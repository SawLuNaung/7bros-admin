import { ColumnDef } from "@tanstack/react-table";
import { cn, getRelativeTime } from "../../lib/utils";
import ActiveBadge from "../common/ActiveBadge";
import InactiveBadge from "../common/InactiveBadge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import CellAction from "../common/CellAction";
import { DeleteConfirm } from "../common/DeleteConfirmation";
import EmployeeModal from "../common/Modal";
import { useState } from "react";
import { useBoolean } from "usehooks-ts";
import { CustomerForm } from "./customer-form";
import { useMutation } from "@apollo/client";
import { DELETE_CUSTOMER_BY_ID } from "../../graphql/customers";
import { GET_ALL_CUSTOMERS } from "../../graphql/kiloTaxi";

export type Section = {
  __typename: string;
  name: string;
  email: string;
  profile_picture_url: string;
  phone: number;
  disabled: null;
  created_at: string;
};

export const columns: ColumnDef<Section>[] = [
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
    accessorKey: "email",
    header: () => {
      return (
        <section className={cn("flex  justify-start  items-center gap-2")}>
          <h3>Email</h3>
        </section>
      );
    },
  },
  {
    accessorKey: "profile_picture_url",
    header: () => {
      return (
        <section className={cn("flex  justify-start  items-center gap-2")}>
          <h3>Picture</h3>
        </section>
      );
    },
    cell: ({ row }) => {
      const PICURL = row.getValue("profile_picture_url") as string;
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
    accessorKey: "phone",
    header: () => {
      return (
        <section className={cn("flex  justify-start  items-center gap-2")}>
          <h3>Phone</h3>
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
    header: () => {
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
      const [deleteData, setDeleteData] = useState<any>();
      const [deleteService, { loading }] = useMutation(DELETE_CUSTOMER_BY_ID, {
        refetchQueries: [GET_ALL_CUSTOMERS],
      });
      const [singleDriverData, setSingleDriverData] = useState<any>({
        address: "",
        balance: "",
        birth_date: "",
        created_at: "",
        disabled: null,
        driver_id: "",
      });

      const { value: dValue, toggle: dToggle } = useBoolean(false);
      const { value, toggle } = useBoolean(false);

      const handleEdit = (row: any) => {
        const RowData = row.original;
        setSingleDriverData(RowData);

        toggle();
      };

      const handleDelete = async () => {
        const id = deleteData.original?.id;

        await deleteService({
          variables: {
            id: id,
          },
        });
        dToggle();
      };

      return (
        <div className={"flex justify-center "}>
          <CellAction
            language="section"
            setSingleCodeGenerator={setDeleteData}
            handleDelete={() => dToggle()}
            handleEdit={handleEdit}
            row={row}
          />
          <DeleteConfirm
            message={"Do you want to delete Customers?"}
            title={"Do you want to delete this record permanently?"}
            isLoading={loading}
            toggle={dToggle}
            open={dValue}
            fun={handleDelete}
          />
          <EmployeeModal
            title={"Edit Customers"}
            modelRatio="w-[100svw] lg:w-[650px]"
            editMode={true}
            open={value}
            toggle={toggle}
            form={
              <CustomerForm
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
