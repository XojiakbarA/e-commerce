import { Box, Switch } from "@mui/material"
import { useState } from "react"

const SwitchInput = ({ item, applyValue }) => {

    const [checked, setChecked] = useState(Boolean(item.value))

    const handleFilterChange = (event) => {
        setChecked(prev => !prev)
        applyValue({ ...item, value: event.target.checked })
    }

    return (
        <Box
            sx={{
                display: 'inline-flex',
                flexDirection: 'row',
                alignItems: 'end',
                height: 48,
                pl: '20px',
            }}
        >
        <Switch
            inputProps={{ 'aria-label': 'filter-published' }}
            checked={checked}
            onChange={handleFilterChange}
        />
        </Box>
    )
}

export default SwitchInput