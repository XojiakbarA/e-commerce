import FixedHeader from "./FixedHeader"
import HidingHeader from "./HidingHeader"

const Layout = ({children}) => {

    return(
        <>
        <FixedHeader />
        <HidingHeader />
        <main>
            {children}
        </main>
        </>
    )
}

export default Layout