import { Stack, Paper, Typography, Box, Divider } from "@mui/material"
import VoucherForm from "../Form/CartForm/VoucherForm"
import ShoppingInfoItem from './ShoppingInfoItem'

const ShoppingInfo = () => {
    return(
        <Paper sx={{padding: 3}}>
                    <Stack spacing={2} divider={<Divider orientation='horizontal' />}>
                        <Box>
                            <ShoppingInfoItem prop={{ name: 'Subtotal:', value: 2610 }} />
                            <ShoppingInfoItem prop={{ name: 'Shipping:', value: 0 }} />
                            <ShoppingInfoItem prop={{ name: 'Tax:', value: 40 }} />
                            <ShoppingInfoItem prop={{ name: 'Discount:', value: 0 }} />                           
                        </Box>
                        <Box>
                            <Typography variant='h5' gutterBottom textAlign='end'>
                                $ 2610
                            </Typography>
                            <VoucherForm />
                        </Box>
                    </Stack>
                </Paper>
    )
}

export default ShoppingInfo