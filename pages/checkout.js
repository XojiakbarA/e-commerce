import { Grid, Stack, Button } from "@mui/material"
import CheckoutInfo from "../components/CheckoutInfo/CheckoutInfo"
import BillingAddressForm from "../components/Form/BillingAddressForm/BillingAddressForm"
import ShippingAddressForm from "../components/Form/ShippingAddressForm/ShippingAddressForm"
import ShoppingStep from "../components/ShoppingStep"

const Checkout = () => {
    return(
        <Grid container spacing={2}>
            <Grid item lg={8}>
                <ShoppingStep />
            </Grid>
            <Grid item lg={8}>
                <ShippingAddressForm />
                <BillingAddressForm />
                <Grid item lg={12}>
                    <Stack direction='row' spacing={4}>
                        <Button variant='outlined' fullWidth>Back to Cart</Button>
                        <Button variant='contained' fullWidth>Proceed to Payment</Button>
                    </Stack>
                </Grid>
            </Grid>
            <Grid item lg={4}>
                <CheckoutInfo />
            </Grid>
        </Grid>
    )
}

export default Checkout