import {Grid} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import MainLayout from '../../../components/layout/MainLayout'
import ProfileLayout from "../../../components/layout/ProfileLayout/ProfileLayout";
import ProfilePageHead from "../../../components/common/ProfilePageHead";
import OrderStatus from "../../../components/profile/orders/OrderStatus";
import OrderDetails from "../../../components/profile/orders/OrderDetails";
import OrderProductListItem from "../../../components/profile/orders/OrderProductListItem";
import AddReviewDialog from "../../../components/dialogs/AddReviewDialog";
import ConfirmDialog from "../../../components/dialogs/ConfirmDialog";
import {useDispatch, useSelector} from "react-redux";
import {cancelSubOrder, getOrder} from "../../../app/store/actions/async/user";
import { wrapper } from "../../../app/store"
import { toggleCancelOrderDialog } from "../../../app/store/actions/dialogActions";

const Order = () => {

    const dispatch = useDispatch()

    const order = useSelector(state => state.order)

    const { loading, cancelOrderDialog, text, order_id } = useSelector(state => state.dialog)

    const closeCancelOrderDialog = () => {
        dispatch(toggleCancelOrderDialog(false, null, null))
    }
    const handleCancelOrder = () => {
        dispatch(cancelSubOrder(order_id, {status: 'cancelled'}))
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
                        <OrderDetails order={order}/>
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