import FixedHeader from "./FixedHeader"
import HidingHeader from "./HidingHeader"
import MenuMobile from "../Menu/MenuMobile"

const Layout = ({children}) => {

    return(
        <>
        <FixedHeader />
        <HidingHeader />
        <main>
            {children}
        </main>
        <MenuMobile />
        </>
    )
}

export default Layout