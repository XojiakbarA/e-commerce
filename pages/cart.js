import { Grid, Stack } from "@mui/material"
import ShoppingStep from "../components/ShoppingStep"
import CartProductPage from "../components/CartSidebar/CartProductPage"
import CartForm from "../components/Form/CartForm"

const Cart = () => {
    return(
        <Grid container spacing={2}>
            <Grid item lg={8}>
                <ShoppingStep />
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