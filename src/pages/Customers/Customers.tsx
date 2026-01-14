import { useBoolean } from "usehooks-ts";
import TableFrame from "../../components/common/TableFrame";
import { useQuery } from "@apollo/client";
import { GET_ALL_CUSTOMERS } from "../../graphql/kiloTaxi";
import { DataTable } from "../../components/tables/Data-table";
import { columns } from "../../components/customers/columns";
import { useMemo, useState } from "react";
import EmployeeModal from "../../components/common/Modal";
import { PaginationClient } from "../../components/common/Pagination";
import { CustomerForm } from "../../components/customers/customer-form";

export const Customers = () => {
  const { value, toggle } = useBoolean(false);
  const { data, loading } = useQuery(GET_ALL_CUSTOMERS, {
    fetchPolicy: "network-only",
  });


  const memorizedData = useMemo(() => data?.customers || [], [data]);

  const [currentTableData, setCurrentTableData] = useState(memorizedData);

  const updateTableData = (paginatedData: any) => {
    setCurrentTableData(paginatedData);
  };

  return (
    <div className="p-[30px] min-h-[calc(100svh-81px)]  bg-gray-100">
      <TableFrame
        title="Customers"
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
      <EmployeeModal
        title={"Add Driver"}
        modelRatio="w-[100svw] lg:w-[650px]"
        editMode={false}
        open={value}
        toggle={toggle}
        form={<CustomerForm editMode={false} toggle={toggle} />}
      />
    </div>
  );
};
