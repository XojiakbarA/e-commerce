import {Grid} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CancelIcon from '@mui/icons-material/Cancel';
import ProfileTitle from "../../../components/profile/ProfileTitle";
import ProfileLayout from "../../../components/layout/ProfileLayout/ProfileLayout";
import OrderStatus from "../../../components/profile/orders/OrderStatus";
import OrderProductList from "../../../components/profile/orders/OrderProductList/OrderProductList";
import OrderShippingAddress from "../../../components/profile/orders/OrderShippingAddress";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getOrder, toggleConfirmDialog} from "../../../redux/actions";
import {useRouter} from "next/router";
import OrderDetails from "../../../components/profile/orders/OrderDetails";

const Order = () => {

    const router = useRouter()
    const dispatch = useDispatch()
    const id = router.query.id
    const order = useSelector(state => state.order.data)

    useEffect(() => {
        dispatch(getOrder(id))
    }, [id])

    const handleCancel = () => {
        dispatch(toggleConfirmDialog(true))
    }

    return (
        <ProfileLayout>
            <ProfileTitle
                title='Order Details'
                titleIcon={<ShoppingBagIcon fontSize='large'/>}
                buttonText={order?.status == 'cancelled' ? null : 'Cancel the Order'}
                buttonIcon={<CancelIcon />}
                onClick={handleCancel}
            />
            <OrderStatus status={order?.status} />
            <OrderProductList products={order?.order_products}/>
            <Grid container spacing={2}>
                <Grid item lg={6}>
                    <OrderShippingAddress order={order}/>
                </Grid>
                <Grid item lg={6}>
                    <OrderDetails order={order}/>
                </Grid>
            </Grid>
        </ProfileLayout>
    )
}

export default Order