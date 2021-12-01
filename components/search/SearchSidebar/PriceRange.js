import {useState} from 'react'
import { useRouter } from 'next/router'
import { TextField, Box, Slider, Stack, ListSubheader } from '@mui/material'

const PriceRange = () => {

    const router = useRouter()
    const initMinValue = Number(router.query.price_min) || 0
    const initMaxValue = Number(router.query.price_max) || 0
    const [minValue, setMinValue] = useState(initMinValue)
    const [maxValue, setMaxValue] = useState(initMaxValue)

    const handleSliderChange = (event, newValue) => {
        const minValue = newValue[0]
        const maxValue = newValue[1]
        setMinValue(minValue)
        setMaxValue(maxValue)

        router.push({
            pathname: '/search',
            query: { ...router.query, price_min: minValue, price_max: maxValue }
        }, null, {scroll: false})
    }

    const handleMinChange = (event) => {
        const minValue = Number(event.target.value)
        setMinValue(minValue)

        router.push({
            pathname: '/search',
            query: { ...router.query, price_min: minValue }
        }, null, {scroll: false})
    };
    const handleMaxChange = (event) => {
        const maxValue = Number(event.target.value)
        setMaxValue(maxValue)

        router.push({
            pathname: '/search',
            query: { ...router.query, price_max: maxValue }
        }, null, {scroll: false})
    };

    return (
        <Box>
            <ListSubheader sx={{zIndex: 0}}>
                Price Range
            </ListSubheader>
            <Slider
                getAriaLabel={() => 'Temperature range'}
                value={[minValue, maxValue]}
                onChange={handleSliderChange}
                valueLabelDisplay="auto"
                min={0}
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