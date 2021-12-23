import { Grid, Stack, Typography } from "@mui/material"
import CartProductCard from "../components/shopping-pages/CartProductCard"
import { useSelector } from "react-redux"
import ShoppingLayout from "../components/layout/ShoppingLayout/ShoppingLayout"

const Cart = () => {

    const cart = useSelector(state => state.cart.data)
    const cartCount = cart?.length

    return(
        cartCount
        ?
        <ShoppingLayout>
            <Grid item lg={8}>
                <Stack spacing={2}>
                    {
                        cart.map(product => (
                            <CartProductCard key={product.id} product={product}/>
                        ))
                    }
                </Stack>
            </Grid>
        </ShoppingLayout>
        :
        <Typography variant="h3">
            Cart is Empty
        </Typography>
        
    )
}

export default Cart