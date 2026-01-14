import { FormField, FormLabel, FormItem, FormControl, FormMessage } from "../ui/form";
import { useFormContext } from "react-hook-form";
import PasswordInput from "../password-input";
import { cn } from "../../lib/utils";

type PasswordFieldProps = {
  fieldName: string;
  languageName: string;
  required: boolean;
  fieldHeight: string;
  fieldWidth: string;
  placeholder?: string;
  requiredLabel?: boolean;
  labelTitle?: string;
  disabled?: boolean;
  maxLength?: number;
};

const PasswordField: React.FC<PasswordFieldProps> = ({
  fieldName,
  required,
  fieldHeight,
  fieldWidth,
  labelTitle,
  placeholder = "Enter password",
  requiredLabel = true,
  disabled = false,
  maxLength = 6,
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
            <PasswordInput
              maxLength={maxLength}
              disabled={disabled}
              className={cn(
                fieldHeight,
                "text-[14px] disabled:border-none disabled:opacity-100  disabled:text-secondaryTextColor disabled:bg-[#F1F5FB] border-[#A0AEC0]"
              )}
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PasswordField;

