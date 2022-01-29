import { Chip, Grid, Paper, Stack, Typography } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import CancelIcon from '@mui/icons-material/Cancel'
import PendingIcon from '@mui/icons-material/Pending';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReplayIcon from '@mui/icons-material/Replay';
import ProfileLayout from "../../../../components/layout/ProfileLayout/ProfileLayout"
import ProfileTitle from "../../../../components/profile/ProfileTitle"
import OrderProductListItem from '../../../../components/vendor/OrderProductListItem'
import { wrapper } from '../../../../app/store'
import OrderShippingAddress from '../../../../components/profile/orders/OrderShippingAddress'
import OrderDetails from '../../../../components/profile/orders/OrderDetails'
import { getOrder } from '../../../../app/store/actions/async/vendor';
import { useSelector } from 'react-redux';
import { useToggle } from '../../../../app/hooks/useToggle';
import OrderShipDialog from '../../../../components/dialogs/OrderShipDialog';

const Order = () => {

    const order = useSelector(state => state.orderShop.data)

    const { openOrderShipDialog } = useToggle()

    return (
        <ProfileLayout>
            <ProfileTitle
                title='Order Details'
                titleIcon={<ShoppingCartIcon fontSize='large' />}
                buttonText='Ship'
                buttonIcon={<LocalShippingIcon/>}
                disabled={order.status !== 'shipped' && order.status !== 'cancelled' && order.payment_status === 'approved' ? false : true}
                onClick={openOrderShipDialog}
            />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper sx={{padding: 2}}>
                        <Stack direction='row' justifyContent='space-between' alignItems='center'>
                            <Stack direction='row' spacing={3}>
                                <Typography variant='body2'>
                                    Order ID: {order.id}
                                </Typography>
                                <Typography variant='body2'>
                                    Placed on: {order.created_at}
                                </Typography>
                            </Stack>
                            <Stack spacing={2} alignItems='end'>
                                <Stack direction='row' spacing={1} alignItems='center'>
                                    <Typography variant='body2'>
                                        Order Status :
                                    </Typography>
                                    <Chip
                                        size='small'
                                        variant='outlined'
                                        label={order.status}
                                        icon={
                                            order.status === 'cancelled' ?
                                            <CancelIcon/> :
                                            order.status === 'shipped' ?
                                            <LocalShippingIcon /> :
                                            order.status === 'delivered' ?
                                            <CheckCircleIcon/> :
                                            <PendingIcon/>
                                        }
                                        color={
                                            order.status === 'cancelled' ?
                                            'error' :
                                            order.status === 'shipped' ?
                                            'primary' :
                                            order.status === 'delivered' ?
                                            'success' :
                                            'default'
                                        }
                                    />
                                </Stack>
                                <Stack direction='row' spacing={1} alignItems='center'>
                                    <Typography variant='body2'>
                                        Payment Status :
                                    </Typography>
                                    <Chip
                                        size='small'
                                        label={order.payment_status}
                                        icon={
                                            order.payment_status === 'approved' ?
                                            <CheckCircleIcon/> :
                                            order.payment_status === 'declined' ?
                                            <CancelIcon/> :
                                            order.payment_status === 'refunded' ?
                                            <ReplayIcon/> :
                                            <PendingIcon/>
                                        }
                                        color={
                                            order.payment_status === 'approved' ?
                                            'success' :
                                            order.payment_status === 'declined' ?
                                            'error' :
                                            order.payment_status === 'refunded' ?
                                            'warning' :
                                            'default'
                                        }
                                    />
                                </Stack>
                            </Stack>
                        </Stack>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    {
                        order.order_products.map(product => (
                            <Grid item xs={12} key={product.id}>
                                <OrderProductListItem product={product}/>
                            </Grid>
                        ))
                    }
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
            <OrderShipDialog/>
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

    await dispatch(getOrder(query.id, query.order_id, cookie))

})

export default Order