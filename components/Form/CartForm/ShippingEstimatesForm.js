import { Stack, Typography, Autocomplete, TextField, Button } from "@mui/material"
import Link from "next/link"

const countries = [
    {id: 1, label: 'Kazakhstan'},
    {id: 2, label: 'Uzbekistan'},
    {id: 3, label: 'Tadjikistan'},
    {id: 4, label: 'Kyrgizistan'},
    {id: 5, label: 'Turkmenistan'}
]

const cities = [
    {id: 1, label: 'Tashkent'},
    {id: 2, label: 'Samarkhand'},
    {id: 3, label: 'Kokand'},
    {id: 4, label: 'Karshi'},
    {id: 5, label: 'Bukhara'}
]

const ShippingEstimatesForm = () => {
    return(
        <Stack spacing={2}>
            <Typography variant='body1'>
                Shipping Estimates
            </Typography>
            <Autocomplete
                size='small'
                options={countries}
                renderInput={params => <TextField {...params} label='Country' />}
            />
            <Autocomplete
                size='small'
                options={cities}
                renderInput={params => <TextField {...params} label='City' />}
            />
            <TextField size='small' label='Zip Code' />
            <Button variant='outlined'>Calculate Shipping</Button>
            <Link href='/checkout'>
            <a style={{width: '100%'}}>
                <Button variant='contained' fullWidth>Checkout Now</Button>
            </a>
            </Link>
        </Stack>
    )
}

export default ShippingEstimatesForm