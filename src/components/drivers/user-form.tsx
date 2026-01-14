import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "../ui/form";
import ModalConfirmBtns from "../common/ModalConfirmBtns";
import { cn } from "../../lib/utils";
import InputField from "../forms/InputField";
import SwitchField from "../forms/SwitchField";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useMutation } from "@apollo/client";
import { GET_ALL_DRIVERS, UPDATE_DRIVER_BY_ID } from "../../graphql/kiloTaxi";
import { useEffect } from "react";

type UserFormType = {
  editData?: any;
  toggle: () => void;
  editMode: boolean;
};

const fieldHeight = "h-[40px] md:h-[44px] ";
const filedWidth = "md:w-[calc(50%-10px)] w-full";
const formContainer =
  "flex flex-col md:flex-row   justify-between items-center";

export const UserForm: React.FC<UserFormType> = ({
  editData,
  toggle,
  editMode: _editMode,
}) => {
  const [updateService, { loading }] = useMutation(UPDATE_DRIVER_BY_ID, {
    refetchQueries: [GET_ALL_DRIVERS],
  });

  const FormSchema = yup.object({
    driving_license_number: yup.string(),
    vehicle_model: yup.string(),
    address_street: yup.string(),
    address_city: yup.string(),
    disabled: yup.boolean(),
  });

  const form = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues: editData
      ? {
          driving_license_number: editData?.driving_license_number || "",
          vehicle_model: editData?.vehicle_model || "",
          address_street: editData?.address?.split(", ")[0] || "",
          address_city: editData?.address?.split(", ")[1] || "",
          disabled: editData?.disabled || false,
        }
      : {
          driving_license_number: "",
          vehicle_model: "",
          address_street: "",
          address_city: "",
          disabled: false,
        },
  });

  // Reset form with latest data when editData changes
  useEffect(() => {
    if (editData) {
      form.reset({
        driving_license_number: editData?.driving_license_number || "",
        vehicle_model: editData?.vehicle_model || "",
        address_street: editData?.address?.split(", ")[0] || "",
        address_city: editData?.address?.split(", ")[1] || "",
        disabled: editData?.disabled || false,
      });
    }
  }, [editData, form]);

  const handleOnSave = async (data: any) => {
    // Auto-verify driver ONLY if ALL 4 optional fields are provided:
    // 1. Driving License Number
    // 2. Vehicle Model
    // 3. Address Street
    // 4. Address City
    const hasAllOptionalInfo = data.driving_license_number && data.vehicle_model && data.address_street && data.address_city;
    const isVerified = hasAllOptionalInfo ? true : false;

    // Combine address fields for storage
    let address = null;
    if (data.address_street || data.address_city) {
      const addressParts = [];
      if (data.address_street) addressParts.push(data.address_street);
      if (data.address_city) addressParts.push(data.address_city);
      address = addressParts.join(", ");
    }

    await updateService({
      variables: {
        id: editData?.id,
        driving_license_number: data?.driving_license_number || null,
        vehicle_model: data?.vehicle_model || null,
        address: address,
        disabled: data?.disabled,
        verified: isVerified,
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
            disabled={false}
            labelTitle="Driving License"
            fieldName="driving_license_number"
            placeholder={"Enter driving license number"}
            required={false}
            languageName={"driving_license"}
            fieldHeight={cn(" w-full", fieldHeight)}
            fieldWidth={filedWidth}
          />
          <InputField
            disabled={false}
            labelTitle="Vehicle Type"
            fieldName="vehicle_model"
            placeholder={"Enter vehicle type/model"}
            required={false}
            languageName={"vehicle_model"}
            fieldHeight={cn(" w-full", fieldHeight)}
            fieldWidth={filedWidth}
          />
        </div>
        <div className={formContainer}>
          <InputField
            disabled={false}
            labelTitle="Street Address"
            fieldName="address_street"
            placeholder={"Enter street address"}
            required={false}
            languageName={"address_street"}
            fieldHeight={cn(" w-full", fieldHeight)}
            fieldWidth={filedWidth}
          />
          <InputField
            disabled={false}
            labelTitle="City"
            fieldName="address_city"
            placeholder={"Enter city"}
            required={false}
            languageName={"address_city"}
            fieldHeight={cn(" w-full", fieldHeight)}
            fieldWidth={filedWidth}
          />
        </div>
        {/* <div className={formContainer}>
          <InputField
            disabled={editMode ? true : false}
            labelTitle="Birthday Date"
            fieldName="birth_date"
            placeholder={"Type Here"}
            required={false}
            languageName={"career"}
            fieldHeight={cn(" w-full", fieldHeight)}
            fieldWidth={filedWidth}
          />
          <InputField
            disabled={editMode ? true : false}
            fieldName="address"
            labelTitle="Address"
            placeholder={"Type Here"}
            required={false}
            languageName={"career"}
            fieldHeight={cn(" w-full", fieldHeight)}
            fieldWidth={filedWidth}
          />
        </div> */}
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
