import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import InputField from "../forms/InputField";
import { Form } from "../ui/form";
import { cn } from "../../lib/utils";
import SwitchField from "../forms/SwitchField";
import ModalConfirmBtns from "../common/ModalConfirmBtns";

type ExtraFeesType = {
  editData?: any;
  toggle: () => void;
  editMode: boolean;
};

const fieldHeight = "h-[40px] md:h-[44px] ";
const filedWidth = "md:w-[calc(50%-10px)] w-full";
const formContainer =
  "flex flex-col md:flex-row   justify-between items-center";

export const ExtraFeesForm: React.FC<ExtraFeesType> = ({
  toggle,
  editData,
  editMode,
}) => {
  const FormSchema = yup.object({
    name: yup.string(),
    amount: yup.number(),
    disabled: yup.boolean(),
  });

  const form = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues:editData
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
          <InputField
            disabled={true}
            labelTitle="Name"
            fieldName="name"
            placeholder={"Type Here"}
            required={false}
            languageName={"career"}
            fieldHeight={cn(" w-full", fieldHeight)}
            fieldWidth={filedWidth}
          />
          <InputField
            disabled={editMode ? true : false}
            labelTitle="Amount"
            fieldName="amount"
            placeholder={"Type Here"}
            required={false}
            languageName={"career"}
            fieldHeight={cn(" w-full", fieldHeight)}
            fieldWidth={filedWidth}
          />
        </div>
        <div className={"flex gap-[20px]"}>
          <SwitchField
            title="Disabled"
            fieldName="disabled"
            required={false}
            fieldHeight=""
            disabled
            fieldWidth=""
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
