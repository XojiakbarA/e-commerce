import {Grid} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CancelIcon from '@mui/icons-material/Cancel';
import ProfileTitle from "../../../components/profile/ProfileTitle";
import ProfileLayout from "../../../components/layout/ProfileLayout/ProfileLayout";
import OrderStatus from "../../../components/profile/orders/OrderStatus";
import OrderShippingAddress from "../../../components/profile/orders/OrderShippingAddress";
import {useSelector} from "react-redux";
import {getOrder} from "../../../redux/actions";
import OrderDetails from "../../../components/profile/orders/OrderDetails";
import { wrapper } from "../../../redux/store"
import OrderProductList from '../../../components/common/List/List'
import OrderProductListItem from "../../../components/profile/orders/OrderProductListItem";
import ConfirmDialog from "../../../components/dialogs/ConfirmDialog";
import { useToggle } from "../../../app/hooks/useToggle";

const labels = ['Product', 'Title', 'Price', 'Brand', 'Shop']

const Order = () => {

    const order = useSelector(state => state.order.data)

    const { openConfirmDialog } = useToggle()

    return (
        <ProfileLayout>
            <ProfileTitle
                title='Order Details'
                titleIcon={<ShoppingBagIcon fontSize='large'/>}
                buttonText={order.status == 'cancelled' ? null : 'Cancel the Order'}
                buttonIcon={<CancelIcon />}
                onClick={openConfirmDialog}
            />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <OrderStatus status={order.status} />
                </Grid>
                <Grid item xs={12}>
                    <OrderProductList labels={labels}>
                        {
                            order.order_products.map(product => (
                                <Grid item xs={12} key={product.id}>
                                    <OrderProductListItem product={product}/>
                                </Grid>
                            ))
                        }
                    </OrderProductList>
                </Grid>
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
        </ProfileLayout>
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