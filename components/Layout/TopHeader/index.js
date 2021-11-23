import { Container, AppBar, Box, Toolbar, Drawer } from '@mui/material'
import InputSearch from './InputSearch'
import AppLogo from '../AppLogo'
import CartSidebar from './CartSidebar'
import Menu from './Menu'
import LoginDialog from './LoginDialog'
import { closeCartSidebar } from '../../../redux/actions/main'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

const TopHeader = () => {

    const isOpen = useSelector(state => state.cartSidebar.isOpen)

    const dispatch = useDispatch()

    const closeSidebar = () => dispatch(closeCartSidebar())

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
                open={isOpen}
                onClose={closeSidebar}
            >
                <CartSidebar />
            </Drawer>
            <LoginDialog />
        </Box>
    );
}

export default TopHeader