import { Container } from "@mui/material"
import TopHeader from "./TopHeader/TopHeader"
import BottomHeader from "./BottomHeader"
import Footer from './Footer'
import MenuMobile from "./MenuMobile"
import LoginDialog from "../dialogs/LoginDialog"
import CartSidebar from "./CartSidebar"
import RegisterDialog from "../dialogs/RegisterDialog"

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
        <LoginDialog />
        <RegisterDialog />
        <CartSidebar />
        </>
    )
}

export default MainLayout