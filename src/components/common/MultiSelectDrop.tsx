import { Button } from "../..//components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../components/ui/command";
import { FormControl } from "../../components/ui/form";
import {
  PopoverTrigger,
  Popover,
  PopoverContent,
} from "../../components/ui/popover";
import { cn } from "../../lib/utils";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { useFormContext } from "react-hook-form";

interface MultiSelectDropProps {
  popoverOpen: boolean;
  setPopoverOpen: (data: any) => void;
  field: any;
  additionalData: any;
  languageTitle: string;
  fieldName: string;
  placeHolder?: string;
  height?: string;
  disabled?: boolean;
  two?: boolean;
}

export const MultiSelectDrop: React.FC<MultiSelectDropProps> = ({
  popoverOpen,
  setPopoverOpen,
  field,
  additionalData,
  placeHolder,
  fieldName,
  height,
  disabled = false,
  two,
}) => {
  const form = useFormContext();

  return (
    <Popover modal open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger className="w-full" asChild>
        <FormControl className=" w-full">
          <Button
            {...field}
            disabled={disabled}
            variant="outline"
            role="combobox"
            className={cn(
              `w-full border-[1px]  disabled:bg-[#F1F5FB] disabled:opacity-100 disabled:border-none border-[#A0AEC0]  text-sideMenuTextColor2 disabled:text-secondaryTextColor  justify-between focus:ring-primary-500 focus:ring-offset-2 focus:ring-2`,
              height,
              !field.value && "text-[#A0AEC0]"
            )}
          >
            {field.value ? (
              additionalData.find(
                (language: any) => language.value === field.value
              )?.label
            ) : (
              <span className="text-[14px] text-inherit">
                {" "}
                {placeHolder ? placeHolder : "select"}
              </span>
            )}
            <ChevronDownIcon className="ml-2  text-slate-400 h-[20px] w-[20px] shrink-0 " />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className={cn(` w-300px] max-w-[700px] p-0`)}>
        <Command className="">
          <CommandInput placeholder={"Search"} className="h-9" />
          <CommandList className="">
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup>
              {two && (
                <div>
                  <div className="flex justify-between  font-light my-3 text-sm  w-[90%] ">
                    <span className="ml-4">ID</span>
                    <span>Name</span>
                  </div>
                  {additionalData.map((item: any) => (
                    <CommandItem
                      value={item.label}
                      key={item.value}
                      onSelect={() => {
                        form.setValue(fieldName, item.value);
                        setPopoverOpen(false);
                      }}
                    >
                      <div className="flex justify-between  w-[90%] ">
                      <span>{item.label}</span>
                        <span>{item.value}</span>
                     
                      </div>

                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          item.value === field.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </div>
              )}
              {!two && (
                <div>
                  {additionalData.map((item: any) => (
                    <CommandItem
                      value={item.label}
                      key={item.value}
                      onSelect={() => {
                        form.setValue(fieldName, item.value);
                        setPopoverOpen(false);
                      }}
                    >
                      <span>{item.label}</span>

                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          item.value === field.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </div>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
