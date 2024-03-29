import { Box, Typography, Stack, Divider, IconButton, Drawer, Button } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import SidebarProductCard from './SidebarProductCard'
import BaseLink from '../../common/Link/BaseLink'
import { useDispatch, useSelector } from 'react-redux'
import { toggleCartSidebar } from '../../../app/store/actions/actionCreators'

const CartSidebar = () => {

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart.data)
    const { cartSidebar } = useSelector(state => state.toggle)

    const closeSidebar = () => {
        dispatch(toggleCartSidebar(false))
    }

    return(
        <Drawer anchor='right' open={cartSidebar} onClose={closeSidebar}>
            <Box sx={{padding: 1, width: 350}}>
                <Stack spacing={2} divider={<Divider orientation='horizontal' flexItem />} sx={{height: '100vh'}}>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
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
                <Stack
                    spacing={2}
                    alignItems='center'
                    sx={{
                        position: 'fixed',
                        width: 350,
                        right: 0,
                        bottom: 0,
                        padding: 1,
                        bgcolor: 'background.default'
                    }}
                >
                    <Button
                        fullWidth
                        variant='contained'
                        href='/checkout'
                        component={BaseLink}
                    >
                        Checkout Now
                    </Button>
                    <Button
                        fullWidth
                        variant='outlined'
                        href='/cart'
                        component={BaseLink}
                    >
                        View Cart
                    </Button>
                </Stack>
            </Box>
        </Drawer>
    )
}

export default CartSidebar