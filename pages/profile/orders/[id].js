import {Grid} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CancelIcon from '@mui/icons-material/Cancel';
import ProfileTitle from "../../../components/profile/ProfileTitle";
import ProfileLayout from "../../../components/layout/ProfileLayout/ProfileLayout";
import OrderStatus from "../../../components/profile/orders/OrderStatus";
import OrderShippingAddress from "../../../components/profile/orders/OrderShippingAddress";
import {useDispatch, useSelector} from "react-redux";
import {getOrder, toggleConfirmDialog} from "../../../redux/actions";
import OrderDetails from "../../../components/profile/orders/OrderDetails";
import { wrapper } from "../../../redux/store"
import OrderProductList from '../../../components/common/List/List'
import OrderProductListItem from "../../../components/profile/orders/OrderProductListItem";

const labels = ['Product', 'Title', 'Price', 'Brand', 'Shop']

const Order = () => {

    const dispatch = useDispatch()
    const order = useSelector(state => state.order.data)

    const handleCancel = () => {
        dispatch(toggleConfirmDialog(true))
    }

    return (
        <ProfileLayout>
            <ProfileTitle
                title='Order Details'
                titleIcon={<ShoppingBagIcon fontSize='large'/>}
                buttonText={order.status == 'cancelled' ? null : 'Cancel the Order'}
                buttonIcon={<CancelIcon />}
                onClick={handleCancel}
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
        </ProfileLayout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(({dispatch}) => async ({params, req}) => {

    await dispatch(getOrder(params.id, req.headers.cookie))

})

export default Order