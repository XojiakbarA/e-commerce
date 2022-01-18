import { Box, Typography, Stack, Divider, IconButton, Drawer } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import SidebarButtons from './SidebarButtons'
import SidebarProductCard from './SidebarProductCard'
import { toggleCartSidebar } from '../../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'

const CartSidebar = () => {

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart.data)
    const cartSidebar = useSelector(state => state.toggle.cartSidebar)

    const closeSidebar = () => dispatch(toggleCartSidebar(false))

    return(
        <Drawer anchor='right' open={cartSidebar} onClose={closeSidebar}>
            <Box sx={{padding: 1, width: 350}}>
                <Stack spacing={2} divider={<Divider orientation='horizontal' flexItem />} sx={{height: '100vh'}}>
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography variant='h5'>
                            {cart?.length} items
                        </Typography>
                        <IconButton onClick={ closeSidebar }>
                            <ChevronRightIcon />
                        </IconButton>
                    </Box>
                    
                    <Stack spacing={1}>
                        {
                            cart?.length > 0
                            ?
                            cart.map(product => (
                                <SidebarProductCard key={product.id} product={product} />
                            ))
                            :
                            <Typography variant='h6' textAlign='center'>Cart is empty</Typography>
                        }
                    </Stack>
                </Stack>
                <SidebarButtons />
            </Box>
        </Drawer>
    )
}

export default CartSidebar