import { Container } from "@mui/material"

import FixedHeader from "./FixedHeader"
import HidingHeader from "./HidingHeader"
import Footer from './Footer'
import MenuMobile from "../Menu/MenuMobile"

const Layout = ({children}) => {

    return(
        <>
        <FixedHeader />
        <HidingHeader />
            <Container sx={{minHeight: '100vh', marginTop: {xs: 9, lg: 3}}}>
                {children}
            </Container>
        <Footer />
        <MenuMobile />
        </>
    )
}

export default Layout