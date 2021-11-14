import { Container, AppBar, Box, Toolbar, Drawer } from '@mui/material'
import InputSearch from './InputSearch'
import AppLogo from '../AppLogo'
import CartSidebar from './CartSidebar'
import Menu from './Menu'
import LoginDialog from './LoginDialog'
import { connect } from 'react-redux'
import { closeCartSidebar } from '../../../redux/actions/main'

const TopHeader = ({cartSidebar, closeCartSidebar}) => {

    const isOpen = cartSidebar.isOpen

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
                onClose={closeCartSidebar}
            >
                <CartSidebar />
            </Drawer>
            <LoginDialog />
        </Box>
    );
}

const mapStateToProps = (state) => ({
    cartSidebar: state.cartSidebar
})

const mapDispatchToProps = dispatch => ({
    closeCartSidebar: () => dispatch(closeCartSidebar())
})

export default connect(mapStateToProps, mapDispatchToProps)(TopHeader)