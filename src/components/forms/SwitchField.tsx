import { FormField, FormLabel, FormItem, FormControl } from "../ui/form";
import { Switch } from "../ui/switch";
import { useFormContext } from "react-hook-form";
import { cn } from "../../lib/utils";

type SwitchFieldProps = {
  fieldName: string;
  required: boolean;
  fieldHeight: string;
  fieldWidth: string;
  title:string,
  placeholder?: string;
  flexDirection?: string;
  disabled?: boolean;
};

const SwitchField: React.FC<SwitchFieldProps> = ({
  fieldName,
  title,
  fieldWidth,
  flexDirection = "flex-col justify-start",
  disabled = false,
}) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className={cn(fieldWidth)}>
          <div className={cn("flex  gap-3  ", flexDirection)}>
            <FormLabel className="figma-text-label font-light ">
              <p className=" capitalize"> {title}</p>
            </FormLabel>
            <FormControl>
              <Switch
                disabled={disabled}
                id="active"
                className="h-[20px] w-[39px] disabled:opacity-100"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </div>
        </FormItem>
      )}
    />
  );
};

export default SwitchField;
