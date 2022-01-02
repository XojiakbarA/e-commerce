import { Container, Drawer, Snackbar, Alert } from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import { toggleCartSidebar, setSnackbar } from "../../redux/actions"
import TopHeader from "./TopHeader/TopHeader"
import BottomHeader from "./BottomHeader"
import Footer from './Footer'
import MenuMobile from "./MenuMobile"
import AccountMenu from "./AccountMenu/AccountMenu"
import LoginDialog from "./LoginDialog/LoginDialog"
import CartSidebar from "./CartSidebar"
import RegisterDialog from "./RegisterDialog/RegisterDialog"
import OrderDialog from "./OrderDialog/OrderDialog"
import ConfirmDialog from "./ConfirmDialog/ConfirmDialog";
import EditProfileDialog from "./EditProfileDialog/EditProfileDialog";

const MainLayout = ({children}) => {

    const dispatch = useDispatch()
    const cartSidebar = useSelector(state => state.toggle.cartSidebar)
    const isOpenSnackbar = useSelector(state => state.snackbar.isOpen)
    const snackbarText = useSelector(state => state.snackbar.text)

    const closeSidebar = () => dispatch(toggleCartSidebar(false))
    const handleCloseSnackbar = () => dispatch(setSnackbar(false))

    return(
        <>
        <TopHeader />
        <BottomHeader />
            <Container sx={{minHeight: '100vh', marginTop: {xs: 9, lg: 3}}}>
                {children}
            </Container>
        <Footer />
        <MenuMobile />

        <AccountMenu />
        <LoginDialog />
        <RegisterDialog />
        <OrderDialog />
        <ConfirmDialog />
        <EditProfileDialog />
        <Drawer
            anchor='right'
            open={cartSidebar}
            onClose={closeSidebar}
        >
            <CartSidebar />
        </Drawer>
        <Snackbar
            open={isOpenSnackbar}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            onClose={ handleCloseSnackbar }
            autoHideDuration={3000}
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
        </>
    )
}

export default MainLayout