import { Grid, Stack, Typography } from "@mui/material"
import CartProductCard from "../components/common/Card/CardProductCard/CartProductCard"
import { useSelector } from "react-redux"
import ShoppingLayout from "../components/layout/ShoppingLayout/ShoppingLayout"
import { wrapper } from '../app/store'
import MainLayout from "../components/layout/MainLayout"

const Cart = () => {

    const cart = useSelector(state => state.cart.data)

    return(
        cart?.length > 0
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

export const getServerSideProps = wrapper.getServerSideProps(({dispatch}) => async () => {

    

})

export default Cart

Cart.getLayout = (page) => {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    )
}