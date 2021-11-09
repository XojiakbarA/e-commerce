import { Divider, Paper, Stack, TextField, Typography, Box, Button, Autocomplete } from "@mui/material"

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

const CartForm = () => {
    return(
        <Paper sx={{padding: 3}}>
                    <Stack spacing={2} divider={<Divider orientation='horizontal' />}>
                        <Stack direction='row' justifyContent='space-between' alignItems='center'>
                            <Typography variant='body2'>
                                Total:
                            </Typography>
                            <Typography variant='h6'>
                                $ 750
                            </Typography>
                        </Stack>
                        <Box>
                            <TextField label='Additional Comments' multiline rows={5} fullWidth />
                        </Box>
                        <Stack spacing={2}>
                            <TextField size='small' label='Voucher' />
                            <Button variant='outlined' >Apply Voucher</Button>
                        </Stack>
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
                            <Button variant='contained'>Checkout Now</Button>
                        </Stack>
                    </Stack>
                </Paper>
    )
}

export default CartForm