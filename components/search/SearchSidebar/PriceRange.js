import {useState} from 'react'
import {  TextField, Box, Slider, Stack, ListSubheader } from '@mui/material'

const PriceRange = () => {
    const [minValue, setMinValue] = useState(50)
    const [maxValue, setMaxValue] = useState(700)

    const handleSliderChange = (event, newValue) => {
        setMinValue(newValue[0])
        setMaxValue(newValue[1])
    }

    const handleMinChange = (event, newValue) => {
        setMinValue(Number(event.target.value))
    };
    const handleMaxChange = (event, newValue) => {
        setMaxValue(Number(event.target.value))
    };

    return (
        <Box sx={{marginTop: 2}}>
            <ListSubheader component="div" sx={{zIndex: 0}}>
                Price Range
            </ListSubheader>
            <Slider
                getAriaLabel={() => 'Temperature range'}
                value={[minValue, maxValue]}
                onChange={handleSliderChange}
                valueLabelDisplay="auto"
                min={10}
                max={1500}
                step={5}
            />
            <Stack direction='row' spacing={1} alignItems='center' marginBottom={2}>
                <TextField variant='outlined' label='Min' value={minValue} onChange={handleMinChange} size='small' />
                <p>-</p>
                <TextField variant='outlined' label='Max' value={maxValue} onChange={handleMaxChange} size='small' />
            </Stack>
        </Box>
    );
}

export default PriceRange