import { RadioGroup, FormControlLabel, Grid, Paper, Stack, Radio, Box, Divider } from "@mui/material"
import { useState } from "react"
import CreditCardForm from "../components/shopping-pages/payment/CreditCardForm"
import PayPalForm from "../components/shopping-pages/payment/PayPalForm"
import ShoppingInfo from "../components/shopping-pages/common/ShoppingInfo"
import ShoppingLinks from "../components/shopping-pages/common/ShoppingLinks"
import ShoppingStep from "../components/shopping-pages/common/ShoppingStep"

const Payment = () => {

    const [ form, setForm ] = useState('creditCard')

    function handleFormChange(e) {
        setForm(e.target.value)
    }

    return(
        <Grid container spacing={2}>
            <Grid item lg={8}>
                <ShoppingStep />
            </Grid>
            <Grid item lg={8}>
                <Paper sx={{ padding: 3, marginBottom: 3 }}>
                    <RadioGroup
                        value={form}
                        onChange={handleFormChange}
                    >
                    <Stack spacing={2} divider={<Divider orientation='horizontal' />}>
                        <Box>
                            <FormControlLabel value='creditCard' label='Pay with credit card' control={<Radio />} />
                            <Box display={form == 'creditCard' ? 'block' : 'none' }>
                                <CreditCardForm form={form} />
                            </Box>
                        </Box>
                        <Box>
                            <FormControlLabel value='payPal' label='Pay with PayPal' control={<Radio />} />
                            <Box display={form == 'payPal' ? 'block' : 'none' }>
                                <PayPalForm form={form} />
                            </Box>
                        </Box>
                        <Box>
                            <FormControlLabel value='delivery' label='Cash on Delivery' control={<Radio />} />
                        </Box>
                    </Stack>
                    </RadioGroup>
                </Paper>
                <ShoppingLinks
                    back={{ title: 'Back to Checkout', path: '/checkout' }}
                    forward={{ title: 'Review', path: '/review' }}
                />
            </Grid>
            <Grid item lg={4}>
                <ShoppingInfo />
            </Grid>
        </Grid>
    )
}

export default Payment