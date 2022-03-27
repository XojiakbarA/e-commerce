import { TextField } from "@mui/material"
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import ruLocale from 'date-fns/locale/ru'

const CustomDataPicker = ({ size, label, name, value, variant, onChange }) => {
    
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
            <DesktopDatePicker
                renderInput={(params) => <TextField variant={variant} {...params} size={size}/>}
                mask='__.__.____'
                label={label}
                name={name}
                value={value}
                onChange={onChange}
            />
        </LocalizationProvider>
    )
}

export default CustomDataPicker