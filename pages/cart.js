import { Grid, Stack, Typography } from "@mui/material"
import ShoppingStep from "../components/shopping-pages/common/ShoppingStep"
import CartProductCard from "../components/shopping-pages/cart/CartProductCard"
import CartForm from "../components/shopping-pages/cart/CartForm"
import { useSelector } from "react-redux"

const Cart = () => {

    const cart = useSelector(state => state.cart.data)

    return(
        <Grid container spacing={2}>
            <Grid item lg={8}>
                <ShoppingStep />
            </Grid>
            <Grid item lg={8}>
                <Stack spacing={2}>
                    {
                        !cart?.length
                        ?
                        <Typography variant="h3">
                            Cart is Empty
                        </Typography>
                        :
                        cart.map(product => (
                            <CartProductCard key={product.id} product={product}/>
                        ))
                    }
                </Stack>
            </Grid>
            <Grid item lg={4}>
                <CartForm />
            </Grid>
        </Grid>
    )
}

export default Cart