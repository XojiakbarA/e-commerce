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
import { useToggle } from "../../../app/hooks/useToggle";

const Order = () => {

    const dispatch = useDispatch()
    const order = useSelector(state => state.order.data)

    const { isLoading, cancelOrderDialog, closeCancelOrderDialog } = useToggle()

    const { isOpen, text, payload } = cancelOrderDialog

    const handleCancelOrder = () => dispatch(cancelOrder(payload))

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
                        order.order_shops.map(order_shop => (
                            <Grid item xs={12} key={order_shop.id}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <OrderStatus orderShop={order_shop}/>
                                    </Grid>
                                    {
                                        order_shop.order_products.map(product => (
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
                open={isOpen}
                content={text}
                loading={isLoading}
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

    const order = getState().order.data

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