import { Grid } from "@mui/material"
import {getRegions} from "../app/store/actions/async/common"
import CheckoutForm from "../components/forms/CheckoutForm"
import ShoppingLayout from "../components/layout/ShoppingLayout/ShoppingLayout"
import { wrapper } from '../app/store'
import OrderDialog from "../components/dialogs/OrderDialog"

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
    
    if (!user) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    if (cart.length === 0) {
        return {
            redirect: {
                destination: '/cart',
                permanent: false
            }
        }
    }

    await dispatch(getRegions())

})

export default Checkout