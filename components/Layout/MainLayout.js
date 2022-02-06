import { Container } from "@mui/material"
import TopHeader from "./TopHeader/TopHeader"
import BottomHeader from "./BottomHeader"
import Footer from './Footer'
import MenuMobile from "./MenuMobile"
import AccountMenu from "./AccountMenu/AccountMenu"
import LoginDialog from "../dialogs/LoginDialog"
import CartSidebar from "./CartSidebar"
import RegisterDialog from "../dialogs/RegisterDialog"
import Snackbar from './Snackbar/Snackbar'

const MainLayout = ({children}) => {

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
        <CartSidebar />
        {/* <Snackbar/> */}
        </>
    )
}

export default MainLayout