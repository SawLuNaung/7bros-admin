import TableFrame from "../../components/common/TableFrame";
import { useQuery } from "@apollo/client";
import { GET_ALL_INITIAL_FEES } from "../../graphql/setupfees";
import { SetUpFeesForm } from "../../components/setupfees/SetUpFees-form";
import { useMemo } from "react";

export const SetUpFees = () => {
  const { data, loading } = useQuery(GET_ALL_INITIAL_FEES, {
    fetchPolicy: "network-only",
  });

  const memorizedData = useMemo(() => data?.fee_configs || [], [data]);

  return (
    <div className="p-[30px] min-h-[calc(100svh-81px)]  bg-gray-100">
      <TableFrame
        title="Setup Fees"
        modalTrue={() => {}}
        isWrite={false}
        subTitle={true}
      />
      <SetUpFeesForm
        loading={loading}
        editData={memorizedData[0] || []}
        editMode={false}
      />
    </div>
  );
};
