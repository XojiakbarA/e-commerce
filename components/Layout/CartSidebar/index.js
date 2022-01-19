import { Box, Typography, Stack, Divider, IconButton, Drawer } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import SidebarButtons from './SidebarButtons'
import SidebarProductCard from './SidebarProductCard'
import { useSelector } from 'react-redux'
import { useToggle } from '../../../app/hooks/useToggle'

const CartSidebar = () => {

    const cart = useSelector(state => state.cart.data)

    const { cartSidebar, closeSidebar } = useToggle()

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