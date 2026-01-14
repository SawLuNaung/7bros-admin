import { Form } from "../ui/form";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import InputField from "../forms/InputField";
import { cn } from "../../lib/utils";
import ModalConfirmBtns from "../common/ModalConfirmBtns";
import DropDownDataField from "../forms/DropDownField";
import { useQuery } from "@apollo/client";
import { GET_ALL_DRIVERS } from "../../graphql/kiloTaxi";
import { useMemo } from "react";

type UserFormType = {
  editData?: any;
  toggle: () => void;
  editMode: boolean;
};

const fieldHeight = "h-[40px] md:h-[44px] ";
const filedWidth = "md:w-[calc(50%-10px)] w-full";
const formContainer =
  "flex flex-col md:flex-row   justify-between items-center";

export const additionalData = [
  { label: "Percentage", value: "percentage" },
  { label: "Fixed", value: "fixed" },
];

export const AddTopUpForm: React.FC<UserFormType> = ({
  toggle,
  editMode,
}) => {
  const { data } = useQuery(GET_ALL_DRIVERS, {
    fetchPolicy: "network-only",
  });

  const memorizedData = useMemo(() => data?.drivers || [], [data]);


  const modifiedData = memorizedData.map((data:any)=>{
    return {
        label:data.driver_id,
        value:data.name
    }
  })



  const FormSchema = yup.object({
    amount: yup.string(),
    driver_id: yup.string(),
  });

  const form = useForm({
    resolver: yupResolver(FormSchema),
  });

  const handleOnSave = async () => {


    toggle();
  };

  return (
    <Form {...form}>
      <form
        className="sm:space-y-[16px]"
        onSubmit={form.handleSubmit(handleOnSave)}
      >
        <div className={formContainer}>
          <DropDownDataField
            disabled={editMode ? true : false}
            labelTitle="Driver ID"
            fieldName="driver_id"
            required={false}
            two={true}
            requiredLabel={true}
            languageName={"career"}
            fieldHeight={cn(" w-full", fieldHeight)}
            fieldWidth={filedWidth}
            additionalData={modifiedData}
          />
          <InputField
            disabled={editMode ? true : false}
            labelTitle="Amount"
            type="number"
            fieldName="amount"
            placeholder={"Type Here"}
            required={false}
            languageName={"career"}
            fieldHeight={cn(" w-full", fieldHeight)}
            fieldWidth={filedWidth}
          />
        </div>
        <ModalConfirmBtns
          size={"lg"}
          width="w-[100px] rounded-md"
          isLoading={false}
          editMode={false}
          toggle={toggle}
        />
      </form>
    </Form>
  );
};
