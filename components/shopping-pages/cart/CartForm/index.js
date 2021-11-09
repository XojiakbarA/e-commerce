import { Divider, Paper, Stack } from "@mui/material"
import ShippingEstimates from "./ShippingEstimates"
import AdditionalComments from "./AdditionalComments"
import VoucherForm from '../../common/VoucherForm'
import ShoppingInfoItem from "../../common/ShoppingInfo/ShoppingInfoItem"


const CartForm = () => {
    return(
        <Paper sx={{padding: 3}}>
            <Stack spacing={2} divider={<Divider orientation='horizontal' />}>
                <ShoppingInfoItem prop={{ name: 'Total:', value: 750 }} />
                <AdditionalComments />
                <VoucherForm />
                <ShippingEstimates />
            </Stack>
        </Paper>
    )
}

export default CartForm