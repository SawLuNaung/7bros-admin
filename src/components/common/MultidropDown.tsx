import { MultiSelectDrop } from './MultiSelectDrop'
import { useState } from 'react'

const EmployeeInformationDrop = ({
    InputHi,
    additionalData,
    field,
    languageTitle,
    placeHolder,
    fieldName,
    disabled =  false,
    two
}: {
    InputHi: string
    additionalData: object
    field: any
    languageTitle: string
    fieldName: string,
    placeHolder?:string,
    disabled?:boolean
    two?:boolean
}) => {

    const [popoverOpen, setPopoverOpen] = useState(false);

    return (
        <MultiSelectDrop
            disabled={disabled}
            height={InputHi}
            placeHolder={placeHolder}
            popoverOpen={popoverOpen}
            setPopoverOpen={setPopoverOpen}
            languageTitle={languageTitle}
            additionalData={additionalData}
            fieldName={fieldName}
            field={field}
            two={two}
        />
    )
}

export default EmployeeInformationDrop
