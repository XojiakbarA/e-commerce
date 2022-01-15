import {useState} from 'react'
import { useRouter } from 'next/router'
import { TextField, Box, Slider, Stack, ListSubheader, InputAdornment } from '@mui/material'

const PriceRange = () => {

    const router = useRouter()
    
    const initValue = [
        Number(router.query.price_min) || 0,
        Number(router.query.price_max) || 0
    ]
    const [value, setValue] = useState(initValue)

    const handleSliderChange = (event, newValue) => {
        setValue(newValue)
    }
    const handleSliderChangeCommitted = () => {
        router.push({
            query: {
                ...router.query,
                price_min: value[0],
                price_max: value[1]
            }
        }, null, {scroll: false})
    }

    const handleMinChange = (event) => {
        const minValue = Number(event.target.value)
        setValue(prevState => [ minValue, prevState[1] ])

        router.push({
            query: {
                ...router.query,
                price_min: minValue
            }
        }, null, {scroll: false})
    }
    const handleMaxChange = (event) => {
        const maxValue = Number(event.target.value)
        setValue(prevState => [ prevState[0], maxValue ])

        router.push({
            query: {
                ...router.query,
                price_max: maxValue
            }
        }, null, {scroll: false})
    }

    return (
        <Box>
            <ListSubheader sx={{zIndex: 0}}>
                Price Range
            </ListSubheader>
            <Slider
                getAriaLabel={() => 'Price range'}
                value={value}
                onChange={handleSliderChange}
                onChangeCommitted={handleSliderChangeCommitted}
                valueLabelDisplay="auto"
                min={0}
                max={1500}
                step={5}
            />
            <Stack direction='row' spacing={1} alignItems='center' marginBottom={2}>
                <TextField
                    variant='outlined'
                    size='small'
                    label='Min'
                    value={value[0]}
                    onChange={handleMinChange}
                    InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
                />
                <p>-</p>
                <TextField
                    variant='outlined'
                    size='small'
                    label='Max'
                    value={value[1]}
                    onChange={handleMaxChange}
                    InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
                />
            </Stack>
        </Box>
    );
}

export default PriceRange