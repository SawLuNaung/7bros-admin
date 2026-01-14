import { ColumnDef } from "@tanstack/react-table";
import InactiveBadge from "../common/InactiveBadge";
import { useBoolean } from "usehooks-ts";
import { cn, getRelativeTime } from "../../lib/utils";
import ActiveBadge from "../common/ActiveBadge";
import { useState } from "react";
import CellAction from "../common/CellAction";
import { DeleteConfirm } from "../common/DeleteConfirmation";
import EmployeeModal from "../common/Modal";
import { UserForm } from "./user-form";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useMutation } from "@apollo/client";
import {
  DELETE_DRIVER_BY_ID,
  GET_ALL_DRIVERS,
  UPDATE_DRIVER_BY_ID,
} from "../../graphql/kiloTaxi";
import { toast } from "sonner";
import { getTierFromDriverId, getTierColorClasses } from "../../utils/tierHelper";
import { Switch } from "../ui/switch";

export type Section = {
  __typename: string;
  name: string;
  address: string;
  profile_picture_url: string;
  balance: number;
  birth_date: null;
  created_at: string;
  disabled: false;
  driver_id: string;
  verified: boolean;
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
    accessorKey: "driver_id",
    header: () => {
      return (
        <section className={cn("flex  justify-start  items-center gap-2")}>
          <h3>Driver ID</h3>
        </section>
      );
    },
  },
  {
    accessorKey: "tier",
    header: () => {
      return (
        <section className={cn("flex  justify-start  items-center gap-2")}>
          <h3>Tier</h3>
        </section>
      );
    },
    cell: ({ row }) => {
      const driverId = row.getValue("driver_id") as string;
      const tierInfo = getTierFromDriverId(driverId);
      const colorClasses = getTierColorClasses(tierInfo.tier);

      return (
        <div className="flex items-center">
          <span
            className={cn(
              "px-2 py-1 rounded-md text-xs font-medium border",
              colorClasses.bg,
              colorClasses.text,
              colorClasses.border
            )}
          >
            {tierInfo.tierName}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "address",
    header: () => {
      return (
        <section className={cn("flex  justify-start  items-center gap-2")}>
          <h3>Address</h3>
        </section>
      );
    },
  },


  {
    accessorKey: "balance",
    header: () => {
      return (
        <section className={cn("flex  justify-start  items-center gap-2")}>
          <h3>Balance</h3>
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
    accessorKey: "verified",
    header: ({}) => {
      return (
        <section className={cn("flex  justify-start  items-center gap-2")}>
          <h3>Verification</h3>
        </section>
      );
    },
    cell: ({ row }) => {
      const verified = row.original.verified as boolean;
      return (
        <div className="">
          {verified ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-300">
              Verified
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-300">
              Unverified
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "disabled",
    header: ({}) => {
      return (
        <section className={cn("flex  justify-center  items-center gap-2")}>
          <h3>Disabled</h3>
        </section>
      );
    },
    cell: ({ row }) => {
      const [updateDriver] = useMutation(UPDATE_DRIVER_BY_ID, {
        refetchQueries: [{ query: GET_ALL_DRIVERS }],
      });
      
      const disabled = row.original.disabled as boolean;
      const driverId = row.original.id;
      const driverName = row.original.name;

      const handleToggleDisabled = async (checked: boolean) => {
        try {
          await updateDriver({
            variables: {
              id: driverId,
              disabled: checked,
              driving_license_number: row.original.driving_license_number || null,
              vehicle_model: row.original.vehicle_model || null,
              address: row.original.address || null,
              verified: row.original.verified || false,
            },
          });

          toast.success(checked ? 'Driver Disabled' : 'Driver Enabled', {
            description: `${driverName} has been ${checked ? 'disabled' : 'enabled'}.`,
            duration: 3000,
          });
        } catch (error: any) {
          console.error("Error toggling disabled status:", error);
          
          toast.error('Failed to Update Status', {
            description: error.message || 'An error occurred while updating the driver status.',
            duration: 5000,
          });
        }
      };

      return (
        <div className="flex justify-center">
          <Switch
            checked={disabled}
            onCheckedChange={handleToggleDisabled}
          />
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
      const [deleteService] = useMutation(DELETE_DRIVER_BY_ID, {
        refetchQueries: [{ query: GET_ALL_DRIVERS }],
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
        const driverName = deleteData.original?.name;

        try {
          await deleteService({
            variables: {
              id: id,
            },
          });
          
          toast.success('Driver Deleted Successfully', {
            description: `${driverName} has been removed from the system.`,
            duration: 4000,
          });
          
          dToggle(); // Close the confirmation modal
        } catch (error: any) {
          console.error("Error deleting driver:", error);
          
          toast.error('Failed to Delete Driver', {
            description: error.message || 'An error occurred while deleting the driver.',
            duration: 5000,
          });
        }
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
            message={"Do you want to delete Driver?"}
            title={"Do you want to delete this record permanently?"}
            isLoading={false}
            toggle={dToggle}
            open={dValue}
            fun={handleDelete}
          />
          <EmployeeModal
            title={"Edit Driver"}
            modelRatio="w-[100svw] lg:w-[650px]"
            editMode={true}
            open={value}
            toggle={toggle}
            form={
              <UserForm
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
