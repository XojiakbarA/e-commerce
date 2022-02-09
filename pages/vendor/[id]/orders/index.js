import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Grid, Typography } from '@mui/material'
import { fetchOrders } from '../../../../api/vendor'
import { wrapper } from '../../../../app/store'
import ProfileLayout from "../../../../components/layout/ProfileLayout/ProfileLayout"
import OrderListItem from '../../../../components/vendor/OrderListItem'
import OrderList from '../../../../components/common/List/List'
import MainLayout from '../../../../components/layout/MainLayout'
import ProfilePageHead from '../../../../components/common/ProfilePageHead'

const labels = ['Order ID', 'Products', 'Status', 'Date purchased', 'Total']

const Orders = ({data}) => {

    const orders = data.data
    const meta = data.meta

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <ProfilePageHead
                    title='Orders'
                    titleIcon={<ShoppingCartIcon fontSize='large'/>}
                />
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
        </Grid>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(({dispatch, getState}) => async ({query, req}) => {

    const user = getState().user
    const cookie = req.headers.cookie
    
    if (!user) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    try {
        const res = await fetchOrders(query.id, cookie)
        if (res.status === 200) {
            return {
                props: {
                    data: res.data
                }
            }
        }
    } catch (e) {
        if (e.response.status === 404) {
            return {
                notFound: true
            }
        }
    }

})

export default Orders

Orders.getLayout = (page) => {
    return (
        
        <MainLayout>
            <ProfileLayout>
                {page}
            </ProfileLayout>
        </MainLayout>
    )
}