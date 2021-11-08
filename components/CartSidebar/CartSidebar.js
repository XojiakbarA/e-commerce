import { Box, Typography, Stack, Divider, Button, IconButton } from '@mui/material'
import CartButtons from './CartButtons'
import CartProduct from './CartProduct'

import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const CartSidebar = ({handleCartClose}) => {
    return(
        <Box sx={{padding: 1, width: 350}}>
            <Stack spacing={2} divider={<Divider orientation='horizontal' flexItem />}>
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography variant='h5'>
                        17 items
                    </Typography>
                    <IconButton onClick={handleCartClose}>
                        <ChevronRightIcon />
                    </IconButton>
                </Box>
                
                <Stack spacing={1}>
                    <CartProduct />
                    <CartProduct />
                    <CartProduct />
                    <CartProduct />
                    <CartProduct />
                    <CartProduct />
                    <CartProduct />
                    <CartProduct />
                </Stack>
            </Stack>
            <CartButtons />
        </Box>
    )
}

export default CartSidebar