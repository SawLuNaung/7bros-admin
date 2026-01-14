import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { columns } from "../../components/drivers/column";
import { DataTable } from "../../components/tables/Data-table";
import { GET_ALL_DRIVERS } from "../../graphql/kiloTaxi";
import { PaginationClient } from "../../components/common/Pagination";
import EmployeeModal from "../../components/common/Modal";
import TableFrame from "../../components/common/TableFrame";
import { UserForm } from "../../components/drivers/user-form";
import { useBoolean } from "usehooks-ts";
import {
  filterDriversByTier,
  sortDriversByTier,
  getAllTiers,
} from "../../utils/tierHelper";
import { ArrowUpDown } from "lucide-react";

export const Drivers = () => {
  const { data, loading } = useQuery(GET_ALL_DRIVERS, {
    fetchPolicy: "network-only",
  });

  const [selectedTier, setSelectedTier] = useState<number>(0); // 0 = All tiers
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const memorizedData = useMemo(() => data?.drivers || [], [data]);
  const { value, toggle } = useBoolean(false);

  // Apply filtering and sorting
  const filteredAndSortedData = useMemo(() => {
    let result = memorizedData;

    // Filter by tier
    if (selectedTier !== 0) {
      result = filterDriversByTier(result, selectedTier);
    }

    // Sort by tier
    result = sortDriversByTier(result, sortOrder);

    return result;
  }, [memorizedData, selectedTier, sortOrder]);

  const [currentTableData, setCurrentTableData] = useState(filteredAndSortedData);

  // Update current table data when filtered/sorted data changes
  useEffect(() => {
    setCurrentTableData(filteredAndSortedData);
  }, [filteredAndSortedData]);

  const updateTableData = (paginatedData: any) => {
    setCurrentTableData(paginatedData);
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="p-[30px] min-h-[calc(100svh-81px)]  bg-gray-100">
      <TableFrame
        title="Drivers"
        modalTrue={() => {
          toggle();
        }}
        isWrite={false}
        subTitle={true}
      />

      {/* Filter and Sort Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4 flex items-center gap-4 flex-wrap">
        {/* Tier Filter */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">
            Filter by Tier:
          </label>
          <select
            value={selectedTier}
            onChange={(e) => setSelectedTier(Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value={0}>All Tiers</option>
            {getAllTiers().map((tier) => (
              <option key={tier.value} value={tier.value}>
                {tier.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Button */}
        <button
          onClick={toggleSortOrder}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <ArrowUpDown className="w-4 h-4" />
          Sort: {sortOrder === "asc" ? "Tier 1 → 2" : "Tier 2 → 1"}
        </button>

        {/* Results Count */}
        <div className="ml-auto text-sm text-gray-600">
          Showing <span className="font-semibold">{filteredAndSortedData.length}</span> of{" "}
          <span className="font-semibold">{memorizedData.length}</span> drivers
        </div>
      </div>

      <DataTable
        className="with-action-column"
        columns={columns}
        loading={loading}
        data={currentTableData || []}
      />
      <div className="flex items-start mt-[30px]">
        <PaginationClient
          data={filteredAndSortedData || []}
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
        form={<UserForm editMode={false} toggle={toggle} />}
      />
    </div>
  );
};
