import ProfileLayout from "../../../components/layout/ProfileLayout/ProfileLayout";
import ProfileTitle from "../../../components/profile/ProfileTitle";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import { useSelector } from "react-redux";
import { Grid, Typography } from "@mui/material";
import { getOrders } from "../../../app/store/actions/async/user";
import { wrapper } from "../../../app/store"
import OrderList from '../../../components/common/List/List'
import OrderListItem from "../../../components/profile/orders/OrderListItem";

const labels = ['Order ID', 'Products', 'Date purchased', 'Total']

const Orders = () => {

    const orders = useSelector(state => state.orders.data)
    const meta = useSelector(state => state.orders.meta)

    return (
        <ProfileLayout>
            <ProfileTitle
                title='My Orders'
                titleIcon={<ShoppingBagIcon fontSize='large'/>}
            />
            {
                orders.length > 0
                ?
                <OrderList labels={labels} meta={meta}>
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