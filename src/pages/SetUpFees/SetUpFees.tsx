import TableFrame from "../../components/common/TableFrame";
import { useQuery } from "@apollo/client";
import { GET_ALL_INITIAL_FEES } from "../../graphql/setupfees";
import { SetUpFeesForm } from "../../components/setupfees/SetUpFees-form";
import { useMemo } from "react";

export const SetUpFees = () => {
  const { data, loading, error } = useQuery(GET_ALL_INITIAL_FEES, {
    fetchPolicy: "network-only",
  });

  const memorizedData = useMemo(() => data?.fee_configs || [], [data]);
  const feeConfig = memorizedData[0] || undefined;

  return (
    <div className="p-[30px] min-h-[calc(100svh-81px)]  bg-gray-100">
      <TableFrame
        title="Setup Fees"
        modalTrue={() => {}}
        isWrite={false}
        subTitle={true}
      />
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Error loading fee configuration: {error.message}
        </div>
      )}
      <SetUpFeesForm
        loading={loading}
        editData={feeConfig}
        editMode={false}
      />
    </div>
  );
};
