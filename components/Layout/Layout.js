import { Container } from "@mui/material"

import TopHeader from "./TopHeader/TopHeader"
import BottomHeader from "./BottomHeader/BottomHeader"
import Footer from './Footer/Footer'
import FooterMobile from "./FooterMobile/FooterMobile"

const Layout = ({children}) => {

    return(
        <>
        <TopHeader />
        <BottomHeader />
            <Container sx={{minHeight: '100vh', marginTop: {xs: 9, lg: 3}}}>
                {children}
            </Container>
        <Footer />
        <FooterMobile />
        </>
    )
}

export default Layout