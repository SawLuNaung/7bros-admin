import  { useMemo, useState } from "react";
import TableFrame from "../../components/common/TableFrame";
import { useBoolean } from "usehooks-ts";
import { useQuery } from "@apollo/client";
import { GETALL_EXTRAFEES } from "../../graphql/extraFee";
import { DataTable } from "../../components/tables/Data-table";
import { columns } from "../../components/extrafees/column";
import { PaginationClient } from "../../components/common/Pagination";

export const ExtraFee = () => {
  const { data, loading } = useQuery(GETALL_EXTRAFEES, {
    fetchPolicy: "network-only",
  });
  const { toggle } = useBoolean(false);

  const memorizedData = useMemo(() => data?.extra_fees || [], [data]);

  const [currentTableData, setCurrentTableData] = useState(memorizedData);

  const updateTableData = (paginatedData: any) => {
    setCurrentTableData(paginatedData);
  };

  return (
    <div className="p-[30px] min-h-[calc(100svh-81px)]  bg-gray-100">
      <TableFrame
        title="Extra Fees"
        modalTrue={() => {
          toggle();
        }}
        isWrite={false}
        subTitle={true}
      />
      <DataTable
        className="with-action-column"
        columns={columns}
        loading={loading}
        data={currentTableData || []}
      />
      <div className="flex items-start mt-[30px]">
        <PaginationClient
          data={memorizedData || []}
          onPageChange={updateTableData}
          itemsPerPage={8} // Set initial data size to 8 items
        />
      </div>
    </div>
  );
};
