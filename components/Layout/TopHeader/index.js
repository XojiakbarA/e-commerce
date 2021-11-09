import { Container, AppBar, Box, Toolbar, Drawer } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { cartClose } from '../../../redux/cartSidebarState/cartSidebarState'

import InputSearch from './InputSearch'
import AppLogo from '../AppLogo'
import CartSidebar from './CartSidebar'
import Menu from './Menu'

const TopHeader = () => {

    const cart = useSelector((state) => state.cartSidebarState.value)
    const dispatch = useDispatch()

    return (
        <Box sx={{ flexGrow: 1, display: {xs: 'none', sm: 'block'} }}>
            <AppBar position='fixed'>
                <Container maxWidth='xl'>
                    <Toolbar>
                        <AppLogo />
                        <InputSearch />
                        <Box sx={{ flexGrow: 1 }} />
                        <Menu />
                    </Toolbar>
                </Container>
            </AppBar>
            <Toolbar />
            <Toolbar />
            <Drawer
                anchor='right'
                open={cart}
                onClose={ () => dispatch(cartClose()) }
            >
                <CartSidebar />
            </Drawer>
        </Box>
    );
}

export default TopHeader