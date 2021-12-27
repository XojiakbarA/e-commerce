import {Grid} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CancelIcon from '@mui/icons-material/Cancel';
import ProfileTitle from "../../../components/profile/ProfileTitle";
import ProfileLayout from "../../../components/layout/ProfileLayout";
import OrderStatus from "../../../components/profile/OrderStatus";
import OrderProductList from "../../../components/profile/OrderProductList/OrderProductList";
import OrderShippingAddress from "../../../components/profile/OrderShippingAddress";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getOrder} from "../../../redux/actions";
import {useRouter} from "next/router";
import OrderDetails from "../../../components/profile/OrderDetails";

const Order = () => {

    const router = useRouter()
    const dispatch = useDispatch()
    const id = router.query.id
    const order = useSelector(state => state.order.data)

    useEffect(() => {
        dispatch(getOrder(id))
    }, [id])

    return (
        <ProfileLayout>
            <ProfileTitle
                title='Order Details'
                titleIcon={<ShoppingBagIcon fontSize='large'/>}
                buttonText='Cancel the Order'
                buttonIcon={<CancelIcon />}
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