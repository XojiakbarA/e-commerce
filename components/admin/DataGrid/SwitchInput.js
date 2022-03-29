import { Box, Checkbox, FormControlLabel, Switch } from "@mui/material"
import { useState } from "react"

const SwitchInput = ({ item, applyValue }) => {

    const [any, setAny] = useState(true)
    const [checked, setChecked] = useState(Boolean(item.value))

    const handleCheckboxChange = (e) => {
        setAny(prev => !prev)
        if (!any) {
            applyValue({ ...item, value: undefined })
        } else {
            applyValue({ ...item, value: checked ? 1 : 0 })
        }
    }
    const handleSwitchChange = (e) => {
        setChecked(prev => !prev)
        applyValue({ ...item, value: e.target.checked ? 1 : 0 })
    }

    return (
        <Box
            sx={{
                display: 'inline-flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                height: 48,
                pl: '20px',
            }}
        >
        <Switch
            inputProps={{ 'aria-label': 'filter-published' }}
            disabled={any}
            checked={checked}
            onChange={handleSwitchChange}
        />
        <FormControlLabel
            label="Any"
            control={
                <Checkbox
                    size='small'
                    checked={any}
                    onChange={handleCheckboxChange}
                />
            }
            componentsProps={{ typography: { variant: 'subtitle2' } }}
        />
        </Box>
    )
}

export default SwitchInput