import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import InputField from "../forms/InputField";
import { cn } from "../../lib/utils";
import SwitchField from "../forms/SwitchField";
import ModalConfirmBtns from "../common/ModalConfirmBtns";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useMutation } from "@apollo/client";
import { GET_ALL_CUSTOMERS } from "../../graphql/kiloTaxi";
import { UPDATE_CUSTOMER_BY_ID } from "../../graphql/customers";

type CustomerFormType = {
  editData?: any;
  toggle: () => void;
  editMode: boolean;
};

const fieldHeight = "h-[40px] md:h-[44px] ";
const filedWidth = "md:w-[calc(50%-10px)] w-full";
const formContainer =
  "flex flex-col md:flex-row   justify-between items-center";

export const CustomerForm: React.FC<CustomerFormType> = ({
  editData,
  toggle,
  editMode,
}) => {
  const [updateService, { loading }] = useMutation(UPDATE_CUSTOMER_BY_ID, {
    refetchQueries: [GET_ALL_CUSTOMERS],
  });

  const FormSchema = yup.object({
    name: yup.string(),
    email: yup.string(),
    phone: yup.string(),
    profile_picture_url: yup.string(),
    disabled: yup.boolean(),
  });

  const form = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues: editData
      ? editData
      : {
          name: "",
          email: "",
          phone: "",
          profile_picture_url: "",
          disabled: false,
        },
  });
  const handleOnSave = async (data: any) => {
    console.log(data)
    await updateService({
      variables: {
        id: data?.id,
        disabled: data?.disabled,
      },
    });
    toggle();
  };

  return (
    <Form {...form}>
      <form
        className="sm:space-y-[16px]"
        onSubmit={form.handleSubmit(handleOnSave)}
      >
        <Avatar>
          <AvatarImage
            className="w-[100px] rounded-md"
            src={
              editData?.profile_picture_url
                ? editData?.profile_picture_url
                : "https://github.com/shadcn.png"
            }
            alt="@shadcn"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className={formContainer}>
          <InputField
            disabled={editMode ? true : false}
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
            labelTitle="Email"
            fieldName="email"
            placeholder={"Type Here"}
            required={false}
            languageName={"career"}
            fieldHeight={cn(" w-full", fieldHeight)}
            fieldWidth={filedWidth}
          />
        </div>
        <InputField
          disabled={editMode ? true : false}
          labelTitle="Phone"
          fieldName="phone"
          placeholder={"Type Here"}
          required={false}
          languageName={"career"}
          fieldHeight={cn(" w-full", fieldHeight)}
          fieldWidth={filedWidth}
        />
        <div className={"flex gap-[20px]"}>
          <SwitchField
            title="Disabled"
            fieldName="disabled"
            required={false}
            fieldHeight=""
            fieldWidth=""
          />
        </div>
        <ModalConfirmBtns
          size={"lg"}
          width="w-[100px] rounded-md"
          isLoading={loading}
          editMode={false}
          toggle={toggle}
        />
      </form>
    </Form>
  );
};
