import { Grid, Stack } from "@mui/material"
import CartStepper from "../components/Stepper/CartStepper"
import CartProductPage from "../components/CartSidebar/CartProductPage"
import CartForm from "../components/Form/CartForm/CartForm"

const Cart = () => {
    return(
        <Grid container spacing={2}>
            <Grid item lg={9}>
                <CartStepper />
            </Grid>
            <Grid item lg={8}>
                <Stack spacing={2}>
                    <CartProductPage />
                    <CartProductPage />
                    <CartProductPage />
                    <CartProductPage />
                </Stack>
            </Grid>
            <Grid item lg={4}>
                <CartForm />
            </Grid>
        </Grid>
    )
}

export default Cart