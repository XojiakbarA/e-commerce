import { Stack, Paper, Typography, Box, Divider, Button } from "@mui/material"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import VoucherForm from "./VoucherForm"
import ShoppingInfoItem from './ShoppingInfoItem'

const ShoppingInfo = () => {

    const router = useRouter()
    const total = useSelector(state => state.cart.total)

    const isCheckoutPage = router.pathname == '/checkout'

    const handleCheckout = () => {
        router.push('/checkout')
    }

    return(
        <Paper sx={{padding: 3}}>
            <Stack spacing={2} divider={<Divider orientation='horizontal' />}>
                <Box>
                    <ShoppingInfoItem name={'Subtotal:'} value={total}/>
                    <ShoppingInfoItem name={'Shipping:'} value={0}/>
                    <ShoppingInfoItem name={'Tax:'} value={0}/>
                    <ShoppingInfoItem name={'Discount:'} value={0}/>                           
                </Box>
                <Box>
                    <ShoppingInfoItem name={'Total:'} value={total} nameVariant={'h6'} />
                    <VoucherForm />
                </Box>
                <Button
                    variant='contained'
                    onClick={handleCheckout}
                    sx={{display: isCheckoutPage ? 'none' : 'block'}}
                >
                    Checkout</Button>
            </Stack>
        </Paper>
    )
}

export default ShoppingInfo