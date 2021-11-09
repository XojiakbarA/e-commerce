import { Divider, Paper, Stack } from "@mui/material"
import ShippingEstimatesForm from "./ShippingEstimatesForm"
import VoucherForm from './VoucherForm'
import AdditionalComments from "./AdditionalComments"
import ShoppingInfoItem from "../../ShoppingInfo/ShoppingInfoItem"


const CartForm = () => {
    return(
        <Paper sx={{padding: 3}}>
            <Stack spacing={2} divider={<Divider orientation='horizontal' />}>
                <ShoppingInfoItem prop={{ name: 'Total:', value: 750 }} />
                <AdditionalComments />
                <VoucherForm />
                <ShippingEstimatesForm />
            </Stack>
        </Paper>
    )
}

export default CartForm