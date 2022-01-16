import ProfileLayout from "../../../components/layout/ProfileLayout/ProfileLayout";
import ProfileTitle from "../../../components/profile/ProfileTitle";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import OrderList from "../../../components/profile/orders/OrderList/OrderList";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { getOrders } from "../../../redux/actions";
import { wrapper } from "../../../redux/store"

const Orders = () => {

    const router = useRouter()

    const orders = useSelector(state => state.orders.data)
    const meta = useSelector(state => state.orders.meta)

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
                orders.length > 0
                ?
                <OrderList
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

export const getServerSideProps = wrapper.getServerSideProps(({dispatch}) => async ({query, req}) => {

    await dispatch(getOrders(query, req.headers.cookie))

})

export default Orders