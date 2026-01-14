"use client";

import * as React from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn, getRelativeTime } from "../../lib/utils";
import { useState } from "react";
import { useBoolean } from "usehooks-ts";
import EmployeeModal from "../common/Modal";
import { TopUpForm } from "./topUp-form";
import { AlignEndHorizontal } from "lucide-react";



type Driver = {
  __typename: string;
  name: string;
  phone: string;
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
          <p className="font-bold text-zinc-500 text-center">Check</p>
        </div>
      );
    },
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
     

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
           <AlignEndHorizontal color="#f7b39e" className="hover:scale-110" onClick={()=>handleEdit(row)}/>
          {/* <CellAction
            language="section"
            setSingleCodeGenerator={setDeleteData}
            handleDelete={() => dToggle()}
            handleEdit={handleEdit}
            isDelete={false}
            isEdit={false}
            isDetails
            row={row}
          /> */}
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

export function DataTableDemo({ data }: { data: DriverTransaction[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full  p-3 rounded-md drop-shadow">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter Driver ID..."
          type="number"
          value={
            (table.getColumn("driver_driver_id")?.getFilterValue() as number) ??
            ""
          }
          onChange={(event) =>
            table
              .getColumn("driver_driver_id")
              ?.setFilterValue(event.target.value)
          }
          className="max-w-sm bg-white"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="  bg-white">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
