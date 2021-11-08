import { useState } from 'react'
import { Container } from "@mui/material"

import TopHeader from "./TopHeader/TopHeader"
import BottomHeader from "./BottomHeader/BottomHeader"
import Footer from './Footer/Footer'
import FooterMobile from "./FooterMobile/FooterMobile"

const Layout = ({children}) => {

    const [cart, setCart] = useState(false)

    function handleCartOpen() {
        setCart(true)
    }
    function handleCartClose() {
        setCart(false)
    }

    return(
        <>
        <TopHeader cart={cart} handleCartOpen={handleCartOpen} handleCartClose={handleCartClose} />
        <BottomHeader />
            <Container sx={{minHeight: '100vh', marginTop: {xs: 9, lg: 3}}}>
                {children}
            </Container>
        <Footer />
        <FooterMobile cart={cart} handleCartOpen={handleCartOpen} handleCartClose={handleCartClose} />
        </>
    )
}

export default Layout