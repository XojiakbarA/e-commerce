import { Grid } from "@mui/material"
import {getRegions} from "../app/store/actions/async/common"
import CheckoutForm from "../components/forms/CheckoutForm"
import ShoppingLayout from "../components/layout/ShoppingLayout/ShoppingLayout"
import { wrapper } from '../app/store'
import OrderDialog from "../components/dialogs/OrderDialog"
import MainLayout from "../components/layout/MainLayout"

const Checkout = () => {

    return(
        <ShoppingLayout>
            <Grid item lg={8}>
                <CheckoutForm/>
            </Grid>
            <OrderDialog/>
        </ShoppingLayout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(({dispatch, getState}) => async () => {

    const user = getState().user
    const cart = getState().cart.data
    
    if (cart.length === 0) {
        return {
            redirect: {
                destination: '/cart',
                permanent: false
            }
        }
    }

    if (!user) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    await dispatch(getRegions())

})

export default Checkout

Checkout.getLayout = (page) => {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    )
}