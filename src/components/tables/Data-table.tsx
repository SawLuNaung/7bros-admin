import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { cn } from "../../lib/utils";
import TableSekeleton from "./Table-Skeleton";


export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  updateFun?: () => void;
  handleRemoveClick?: (id: number) => void;
  setData?: any;
  className?: string;
  getSelectedRows?: (data: any) => void;
  loading?: boolean;
  handleAllRowSelection?: (data: boolean) => void;
  isAllRowSelected?: boolean;
  handleGetTableObj?: (table: any) => void;
}

const TBLRow = ({ row }: { row: Row<any> }) => {
  return (
    <TableRow
      className=" border-t hover:bg-yellow-50 cursor-pointer   border-gray-200/50  bg-white h-[51px] "
      key={row.id}
      data-state={row.getIsSelected() && "selected"}
    >
      {row.getVisibleCells().map((cell) => {
        // add condtion you want
        const nameCell =
          cell.column.id.toLowerCase() === "select".toLowerCase();
        const action = cell.column.id.toLowerCase() === "action".toLowerCase();
        const status =
          cell.column.id.toLowerCase() === "disabled".toLowerCase();
        const isActive =
          cell.column.id.toLowerCase() === "isActive".toLowerCase();

        return (
          <TableCell
            key={cell.id}
            className={cn(
              " bg-white ",
              nameCell && " p-0",
              action && "p-3",
              status && "",
              isActive && " pl-10"
            )}
          >
            <div className="h-fit ">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </div>
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export function DataTable<TData, TValue>({
  columns,
  data,
  className,
  loading = false,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    manualPagination: true,
    getRowId: (row: any) => row.id,
  });

  return (
    <div className="  bg-white z-10 relative overflow-auto w-full h-full">
      <Table className={cn(className, "p-0   rounded-xl  m-0")}>
        <TableHeader className="bg-green-50 sticky   h-16   top-0 z-10">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const nameCell = header.column.id === "name";

                const statusCell =
                  header.column.id === "disabled" ||
                  header.column.id === "IsActive";

                const disabledCell = header.column.id === "profile_verified";

                return (
                  <TableHead
                    key={header.id}
                    className={cn(
                      " bg-gray-50   border-b ",
                      (header.id === "select" ||
                        header.id === "Department_ID") &&
                        "w-[50px] text-center ",
                      nameCell && "pl-0",
                      statusCell && "sm:w-[180px w-[120px]",
                      disabledCell && "sm:w-[180px w-[120px]"
                    )}
                  >
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
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table
              .getRowModel()
              .rows.map((row) => <TBLRow key={row?.id} row={row} />)
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="text-center  bg-white"
              >
                {!loading ? "No Result Found!" : <TableSekeleton />}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
