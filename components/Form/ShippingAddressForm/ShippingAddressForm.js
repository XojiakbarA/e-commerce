import { Grid, Paper, Typography, Stack, TextField, Autocomplete } from "@mui/material"

const countries = [
    {id: 1, label: 'Kazakhstan'},
    {id: 2, label: 'Uzbekistan'},
    {id: 3, label: 'Tadjikistan'},
    {id: 4, label: 'Kyrgizistan'},
    {id: 5, label: 'Turkmenistan'}
]

const ShippingAddressForm = () => {
    return(
        <Paper sx={{ padding: 3, marginBottom: 3 }}>
            <Typography variant='body1' gutterBottom>
                Shipping Address
            </Typography>
            <Grid container spacing={2}>
                <Grid item lg={6}>
                    <Stack spacing={2}>
                        <TextField size='small' label='Full Name' />
                        <TextField size='small' label='Phone Number' />
                        <TextField size='small' label='Zip Code' />
                        <TextField size='small' label='Address 1' />
                    </Stack>
                </Grid>
                <Grid item lg={6}>
                    <Stack spacing={2}>
                        <TextField size='small' label='Email address' />
                        <TextField size='small' label='Company' />
                        <Autocomplete
                            size='small'
                            options={countries}
                            renderInput={params => <TextField {...params} label='Country' />}
                        />
                        <TextField size='small' label='Address 2' />
                    </Stack>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default ShippingAddressForm