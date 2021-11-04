import FixedHeader from "./FixedHeader"
import HidingHeader from "./HidingHeader"
import Footer from './Footer'
import MenuMobile from "../Menu/MenuMobile"

const Layout = ({children}) => {

    return(
        <>
        <FixedHeader />
        <HidingHeader />
        <main>
            {children}
        </main>
        <Footer />
        <MenuMobile />
        </>
    )
}

export default Layout