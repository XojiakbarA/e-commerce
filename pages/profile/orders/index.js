import ProfileLayout from "../../../components/layout/ProfileLayout/ProfileLayout";
import ProfileTitle from "../../../components/profile/ProfileTitle";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Grid, Typography } from "@mui/material";
import { getOrders } from "../../../app/store/actions/async/user";
import { wrapper } from "../../../app/store"
import OrderList from "../../../components/common/List/List";
import OrderListItem from "../../../components/profile/orders/OrderListItem";

const labels = ['Order ID', 'Products', 'Status', 'Date purchased', 'Total']

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
                <OrderList labels={labels} meta={meta} onChange={handlePageChange}>
                    {
                        orders.map(order => (
                            <Grid item xs={12} key={order.id}>
                                <OrderListItem order={order}/>
                            </Grid>
                        ))
                    }
                </OrderList>
                :
                <Typography variant="h4">
                    No orders yet
                </Typography>
            }
        </ProfileLayout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(({dispatch, getState}) => async ({query, req}) => {

    const user = getState().user
    
    if (!user) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    await dispatch(getOrders(query, req.headers.cookie))

})

export default Orders