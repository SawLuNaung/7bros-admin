import { FormField, FormLabel, FormItem, FormControl } from "../ui/form";

import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { cn } from "../../lib/utils";

type DatePickerFieldProps = {
  fieldName: string;
  languageName: string;
  required: boolean;
  fieldHeight: string;
  fieldWidth: string;
  placeholder?: string;
  requiredLabel?: boolean;
  labelTitle?: string;
  disabled?: boolean;
  type?: "number" | "text";
};

const InputField: React.FC<DatePickerFieldProps> = ({
  fieldName,
  required,
  fieldHeight,
  fieldWidth,
  labelTitle,
  placeholder = "plac Holder",
  requiredLabel = true,
  disabled = false,
  type = "text",
}) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className={fieldWidth}>
          {requiredLabel && (
            <FormLabel className="font-light">
              <p className=" capitalize">
                {required ? `${labelTitle}*` : labelTitle}
              </p>
            </FormLabel>
          )}
          <FormControl>
            <Input
              type={type}
              defaultValue={''}
              disabled={disabled}
              className={cn(
                fieldHeight,
                "text-[14px] disabled:border-none disabled:opacity-100  disabled:text-secondaryTextColor disabled:bg-[#F1F5FB] border-[#A0AEC0]"
              )}
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default InputField;
