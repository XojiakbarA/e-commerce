import ProfileLayout from "../../../components/layout/ProfileLayout/ProfileLayout";
import ProfileTitle from "../../../components/profile/ProfileTitle";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import OrderList from "../../../components/profile/orders/OrderList/OrderList";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Typography } from "@mui/material";
import { getOrders } from "../../../redux/actions";

const Orders = () => {

    const router = useRouter()
    const dispatch = useDispatch()

    const orders = useSelector(state => state.orders.data)
    const meta = useSelector(state => state.orders.meta)
    const isFetching = useSelector(state => state.orders.isFetching)

    useEffect(() => {
        dispatch(getOrders(router.query))
    }, [dispatch, router.query])

    const handlePageChange = (e, p) => {
        router.push({
            query: { page: p }
        })
    }

    return (
        <ProfileLayout>
            <ProfileTitle
                title='My Orders'
                titleIcon={<ShoppingBagIcon fontSize='large'/>}
            />
            {
                orders && orders.length > 0
                ?
                <OrderList
                    isFetching={isFetching}
                    orders={orders}
                    meta={meta}
                    handlePageChange={handlePageChange}
                />
                :
                <Typography variant="h4">
                    No orders yet
                </Typography>
            }
        </ProfileLayout>
    )
}

export default Orders