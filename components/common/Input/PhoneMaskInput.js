import { forwardRef } from "react"
import { IMaskInput } from "react-imask"

const PhoneMaskInput = forwardRef(function PhoneMask({onChange, name, ...other}, ref) {
    return (
        <IMaskInput
            {...other}
            mask="(00) 000-00-00"
            name={name}
            inputRef={ref}
            onAccept={(value) => onChange({ target: { name, value } })}
            overwrite
        />
    )
})

export default PhoneMaskInput