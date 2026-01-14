import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Form } from "../ui/form";
import * as yup from "yup";
import InputField from "../forms/InputField";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import {  useState } from "react";
import { X } from "lucide-react";
import Radiofield from "../forms/RadioField";
import { useMutation } from "@apollo/client";
import { GET_ALL_TOPUPS, UPDATE_AMOUNT } from "../../graphql/topUp";

type UserFormType = {
  editData?: any;
  toggle: () => void;
  editMode: boolean;
};

const fieldHeight = "h-[40px] md:h-[44px] ";
const filedWidth = "md:w-[calc(50%-10px)] w-full";
const formContainer =
  "flex flex-col md:flex-row   justify-between items-center";

export const TopUpForm: React.FC<UserFormType> = ({ editData, toggle }) => {
  const [checkReceipt, setCheckReceipt] = useState(false);
  const [updateService] = useMutation(UPDATE_AMOUNT, {
    refetchQueries: [GET_ALL_TOPUPS],
  });


  const FormSchema = yup.object({
    id: yup.string(),
    name: yup.string(),
    amount: yup.number(),
    phone: yup.string(),
    approve: yup.string(),
    profile_picture_url: yup.string(),
  });

  const form = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      id: editData.id,
      name: editData.driver.name,
      amount: editData.amount,
      phone: editData.driver.phone,
      profile_picture_url: editData.driver.profile_picture_url,
      approve: "no",
    },
  });

  // useEffect(() => {
  //   if (form.getValues("approve") === "no") {
  //     form.setValue("amount", 0);
  //   }
  // }, [form.getValues("approve")]);

  const handleOnSave = async (data: any) => {
    await updateService({
      variables: {
        driver_transaction_id: data?.id,
        amount: data?.amount,
        accepted: data.approve === "yes",
      },
    });
    alert("top up success")
  };

  return (
    <Form {...form}>
      <form
        className="sm:space-y-[16px]"
        onSubmit={form.handleSubmit(handleOnSave)}
      >
        <Avatar>
          <AvatarImage
            className="w-[100px]   object-fill h-[100px] rounded-md"
            src={
              editData.driver.profile_picture_url
                ? editData.driver.profile_picture_url
                : "https://github.com/shadcn.png"
            }
            alt="@shadcn"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        {checkReceipt && (
          <div
            className={cn(
              "w-[500px] bg-white top-[-20%] left-[70px]  fixed",
              !editData.top_up?.receipt_photo_url &&
                "top-0 h-[200px] border rounded-lg p-3 flex items-center justify-center"
            )}
          >
            <X
              onClick={() => setCheckReceipt(false)}
              className=" border hover:scale-110 border-purple-600 bg-white absolute right-2 top-2 cursor-pointer"
            />

            {editData.top_up?.receipt_photo_url ? (
              <Avatar>
                <AvatarImage
                  className=" w-auto  object-fill h-auto rounded-md"
                  src={
                    editData.top_up?.receipt_photo_url
                      ? editData.top_up?.receipt_photo_url
                      : "https://github.com/shadcn.png"
                  }
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            ) : (
              <div>No Receipt Photo</div>
            )}
          </div>
        )}

        <Button
          type="button"
          className="w-auto"
          variant={"outline"}
          onClick={() => setCheckReceipt((prev) => !prev)}
        >
          Check Receipt
        </Button>

        <Radiofield
          title="Approve Receipt"
          languageName="Approved"
          fieldName={"approve"}
        />

        <div className={formContainer}>
          {form.getValues("approve") === "yes" && (
            <InputField
              disabled={false}
              labelTitle="Amount"
              fieldName="amount"
              placeholder={"Type Here"}
              required={false}
              languageName={"career"}
              fieldHeight={cn(" w-full", fieldHeight)}
              fieldWidth={filedWidth}
            />
          )}
          {/* <InputField
            disabled={true}
            labelTitle="Status"
            fieldName="status"
            placeholder={"Type Here"}
            required={false}
            languageName={"career"}
            fieldHeight={cn(" w-full", fieldHeight)}
            fieldWidth={filedWidth}
          /> */}
        </div>

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
            disabled={true}
            labelTitle="Phone"
            fieldName="phone"
            placeholder={"Type Here"}
            required={false}
            languageName={"career"}
            fieldHeight={cn(" w-full", fieldHeight)}
            fieldWidth={filedWidth}
          />
        </div>

        <div className="w-full flex py-2 mt-2  justify-center sm:justify-end gap-2">
          <Button
            type="submit"
            size={"lg"}
            variant="outline"
            className={cn(` w-[100px] "opacity-50"}`)}
          >
            Save
          </Button>
          <Button
            type="button"
            onClick={() => toggle()}
            size={"lg"}
            variant="outline"
            className={cn(` w-[100px] "opacity-50"}`)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};
