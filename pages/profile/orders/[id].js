import {Grid} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PageTitle from "../../../components/common/PageTitle";
import ProfileLayout from "../../../components/layout/ProfileLayout/ProfileLayout";
import OrderStatus from "../../../components/profile/orders/OrderStatus";
import OrderShippingAddress from "../../../components/profile/orders/OrderShippingAddress";
import {useSelector} from "react-redux";
import {getOrder} from "../../../app/store/actions/async/user";
import OrderDetails from "../../../components/profile/orders/OrderDetails";
import { wrapper } from "../../../app/store"
import OrderProductListItem from "../../../components/profile/orders/OrderProductListItem";
import ConfirmDialog from "../../../components/dialogs/ConfirmDialog";
import MainLayout from '../../../components/layout/MainLayout'

const Order = () => {

    const order = useSelector(state => state.order.data)

    return (
        <>
            <PageTitle
                title='Order Details'
                titleIcon={<ShoppingBagIcon fontSize='large'/>}
            />
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
            <ConfirmDialog/>
        </>
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