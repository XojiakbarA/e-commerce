import { Grid, Stack } from "@mui/material"
import ShoppingStep from "../components/shopping-pages/common/ShoppingStep"
import CartProductCard from "../components/shopping-pages/cart/CartProductCard"
import CartForm from "../components/shopping-pages/cart/CartForm"

const Cart = () => {
    return(
        <Grid container spacing={2}>
            <Grid item lg={8}>
                <ShoppingStep />
            </Grid>
            <Grid item lg={8}>
                <Stack spacing={2}>
                    <CartProductCard />
                    <CartProductCard />
                    <CartProductCard />
                    <CartProductCard />
                </Stack>
            </Grid>
            <Grid item lg={4}>
                <CartForm />
            </Grid>
        </Grid>
    )
}

export default Cart