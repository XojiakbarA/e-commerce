import { Container, AppBar, Box, Toolbar, Drawer, Snackbar, Alert } from '@mui/material'
import InputSearch from './InputSearch'
import AppLogo from '../AppLogo'
import CartSidebar from './CartSidebar'
import Menu from './Menu'
import LoginDialog from './LoginDialog'
import { closeCartSidebar, setSnackbar } from '../../../redux/actions/main'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import AccountMenu from './AccountMenu/AccountMenu'

const TopHeader = () => {

    const isOpen = useSelector(state => state.cartSidebar.isOpen)
    const isOpenSnackbar = useSelector(state => state.snackbar.isOpen)
    const snackbarText = useSelector(state => state.snackbar.text)

    const dispatch = useDispatch()

    const handleCloseSnackbar = () => dispatch(setSnackbar(false))

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
            <AccountMenu />
            <Snackbar
                open={isOpenSnackbar}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                onClose={ handleCloseSnackbar }
                autoHideDuration={5000}
            >
                <Alert
                    severity='success'
                    variant='standard'
                    elevation={6}
                    color='info'
                    onClose={ handleCloseSnackbar }
                >
                    {snackbarText}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default TopHeader