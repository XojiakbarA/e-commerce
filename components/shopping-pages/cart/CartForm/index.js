import { Divider, Paper, Stack } from "@mui/material"
import ShippingEstimates from "./ShippingEstimates"
import AdditionalComments from "./AdditionalComments"
import VoucherForm from '../../common/VoucherForm'
import ShoppingInfoItem from "../../common/ShoppingInfo/ShoppingInfoItem"
import { useSelector } from "react-redux"

const CartForm = () => {

    const total = useSelector(state => state.cart.total)

    return(
        <Paper sx={{padding: 3}}>
            <Stack spacing={2} divider={<Divider orientation='horizontal' />}>
                <ShoppingInfoItem prop={{ name: 'Total:', value: total }} />
                <AdditionalComments />
                <VoucherForm />
                <ShippingEstimates />
            </Stack>
        </Paper>
    )
}

export default CartForm