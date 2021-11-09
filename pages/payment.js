import { FormControlLabel, Grid, Paper, Stack, Radio, TextField, Button, Box, Divider, FormControl } from "@mui/material"
import CheckoutInfo from "../components/CheckoutInfo/CheckoutInfo"
import ShoppingStep from "../components/ShoppingStep"


const Payment = () => {
    return(
        <Grid container spacing={2}>
            <Grid item lg={8}>
                <ShoppingStep />
            </Grid>
            <Grid item lg={8}>
                <Paper sx={{ padding: 3, marginBottom: 3 }}>
                    <Stack spacing={2} divider={<Divider orientation='horizontal' />}>
                        <Box>
                            <FormControlLabel label='Pay with credit card' control={<Radio />} />
                            <Grid container spacing={2} marginBottom={2}>
                                <Grid item lg={6}>
                                    <Stack spacing={2}>
                                        <TextField size='small' label='Card Number' />
                                        <TextField size='small' label='Name on Card' />
                                    </Stack>
                                </Grid>
                                <Grid item lg={6}>
                                    <Stack spacing={2}>
                                        <TextField size='small' label='Exp Date' />
                                        <TextField size='small' label='Name on Card' />
                                    </Stack>
                                </Grid>
                            </Grid>
                            <Button variant='outlined' >Submit</Button>
                        </Box>
                        <Box>
                            <FormControlLabel label='Pay with PayPal' control={<Radio />} />
                            <Stack direction='row' spacing={2}>
                                <TextField size='small' label='PayPal Email' fullWidth />
                                <Button variant='outlined'>Submit</Button>
                            </Stack>
                            
                        </Box>
                        <Box>
                            <FormControlLabel label='Cash on Delivery' control={<Radio />} />
                        </Box>
                    </Stack>
                </Paper>
                <Grid item lg={12}>
                    <Stack direction='row' spacing={4}>
                        <Button variant='outlined' fullWidth>Back to Checkout</Button>
                        <Button variant='contained' fullWidth>Review</Button>
                    </Stack>
                </Grid>
            </Grid>
            <Grid item lg={4}>
                <CheckoutInfo />
            </Grid>
        </Grid>
    )
}

export default Payment