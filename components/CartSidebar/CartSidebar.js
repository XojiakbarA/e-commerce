import { Box, Typography, Stack, Divider, IconButton } from '@mui/material'
import CartButtons from './CartButtons'
import CartProduct from './CartProduct'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

import { useDispatch } from 'react-redux'
import { cartClose } from '../../redux/cartSidebarState/cartSidebarState'

const CartSidebar = () => {

    const dispatch = useDispatch()

    return(
        <Box sx={{padding: 1, width: 350}}>
            <Stack spacing={2} divider={<Divider orientation='horizontal' flexItem />}>
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography variant='h5'>
                        17 items
                    </Typography>
                    <IconButton onClick={ () => dispatch(cartClose()) }>
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