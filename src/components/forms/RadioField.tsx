import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '../ui/form'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { useFormContext } from 'react-hook-form'


type RadioFieldProps = {
    languageName:string,
    fieldName:string,
    disabled?:boolean,
    title:string
}

const Radiofield:React.FC<RadioFieldProps> = ({
    fieldName,
    disabled,
    title
})=>{

    const form = useFormContext();



    return (   <FormField
        control={form.control}
        name={fieldName}
        render={({ field }) => (
            <FormItem className="space-y-3">
                <FormLabel className="font-light">
                    {title}
                </FormLabel>
                <FormControl>
                    <RadioGroup
                        disabled={disabled}
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex  space-y-1"
                    >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                                <RadioGroupItem
                                    checked={
                                        field.value === 'yes'
                                    }
                                    value={'yes'}
                                />
                            </FormControl>
                            <FormLabel className="font-normal text-slate-400 ">
                                Approved
                            </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                                <RadioGroupItem
                                    checked={
                                        field.value === 'no'
                                    }
                                    value={'no'}
                                />
                            </FormControl>
                            <FormLabel className="font-normal text-slate-400 ">
                               Reject
                            </FormLabel>
                        </FormItem>
                    </RadioGroup>
                </FormControl>
            </FormItem>
        )}
    />  )
}

export default Radiofield;