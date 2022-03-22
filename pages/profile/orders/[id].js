import {Grid} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ProfileLayout from "../../../components/layout/ProfileLayout/ProfileLayout";
import OrderStatus from "../../../components/profile/orders/OrderStatus";
import OrderShippingAddress from "../../../components/profile/orders/OrderShippingAddress";
import {useDispatch, useSelector} from "react-redux";
import {cancelOrder, getOrder} from "../../../app/store/actions/async/user";
import OrderDetails from "../../../components/profile/orders/OrderDetails";
import { wrapper } from "../../../app/store"
import OrderProductListItem from "../../../components/profile/orders/OrderProductListItem";
import ConfirmDialog from "../../../components/dialogs/ConfirmDialog";
import MainLayout from '../../../components/layout/MainLayout'
import AddReviewDialog from "../../../components/dialogs/AddReviewDialog";
import ProfilePageHead from "../../../components/common/ProfilePageHead";
import { toggleCancelOrderDialog } from "../../../app/store/actions/dialogActions";

const Order = () => {

    const dispatch = useDispatch()

    const order = useSelector(state => state.order)

    const { loading, cancelOrderDialog, text, payload } = useSelector(state => state.dialog)

    const closeCancelOrderDialog = () => {
        dispatch(toggleCancelOrderDialog(false, null, null))
    }
    const handleCancelOrder = () => {
        dispatch(cancelOrder(payload, {status: 'cancelled'}))
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <ProfilePageHead
                    title='Order Details'
                    titleIcon={<ShoppingBagIcon fontSize='large'/>}
                />
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={4}>
                    {
                        order.sub_orders.map(sub_order => (
                            <Grid item xs={12} key={sub_order.id}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <OrderStatus subOrder={sub_order}/>
                                    </Grid>
                                    {
                                        sub_order.order_products.map(product => (
                                            <Grid item xs={12} key={product.id}>
                                                <OrderProductListItem product={product}/>
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                            </Grid>
                        ))
                    }
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item lg={6}>
                                <OrderShippingAddress order={order}/>
                            </Grid>
                            <Grid item lg={6}>
                                <OrderDetails order={order}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <ConfirmDialog
                open={cancelOrderDialog}
                content={text}
                loading={loading}
                handleCancelClick={closeCancelOrderDialog}
                handleConfirmClick={handleCancelOrder}
            />
            <AddReviewDialog/>
        </Grid>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(({dispatch, getState}) => async ({params, req}) => {

    const user = getState().user

    if (!user) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    await dispatch(getOrder(params.id, req.headers.cookie))

    const order = getState().order

    if (!order) {
        return {
            notFound: true
        }
    }

})

export default Order

Order.getLayout = (page) => {
    return (
        
        <MainLayout>
            <ProfileLayout>
                {page}
            </ProfileLayout>
        </MainLayout>
    )
}