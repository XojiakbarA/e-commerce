import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Grid, Typography } from '@mui/material'
import { fetchOrders } from '../../../../api/vendor'
import { wrapper } from '../../../../app/store'
import ProfileLayout from "../../../../components/layout/ProfileLayout/ProfileLayout"
import OrderListItem from '../../../../components/vendor/OrderListItem'
import ProfileTitle from "../../../../components/profile/ProfileTitle"
import OrderList from '../../../../components/common/List/List'
import { useRouter } from 'next/router'

const labels = ['Order ID', 'Products', 'Status', 'Date purchased', 'Total']

const Orders = ({data}) => {

    const orders = data.data
    const meta = data.meta

    const router = useRouter()

    const handlePageChange = (e, p) => {
        router.push({
            query: { ...router.query, page: p }
        })
    }

    return (
        <ProfileLayout>
            <ProfileTitle
                title='Orders'
                titleIcon={<ShoppingCartIcon fontSize='large'/>}
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