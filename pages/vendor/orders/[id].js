import { Button, CircularProgress, Grid } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ProfileLayout from "../../../components/layout/ProfileLayout/ProfileLayout"
import OrderProductListItem from '../../../components/vendor/OrderProductListItem'
import { wrapper } from '../../../app/store'
import OrderShippingAddress from '../../../components/profile/orders/OrderShippingAddress'
import OrderDetails from '../../../components/profile/orders/OrderDetails'
import { editOrderProducts } from '../../../app/store/actions/async/vendor';
import { useDispatch, useSelector } from 'react-redux';
import { useToggle } from '../../../app/hooks/useToggle';
import OrderShipDialog from '../../../components/dialogs/OrderShipDialog';
import OrderHead from '../../../components/vendor/OrderHead';
import { useState } from 'react';
import { useRouter } from 'next/router';
import ProfilePageHead from '../../../components/common/ProfilePageHead';
import MainLayout from '../../../components/layout/MainLayout';
import { fetchSubOrder } from '../../../api/vendor';

const Order = ({data}) => {

    const router = useRouter()
    const dispatch = useDispatch()
    const order = data.data
    const isLoading = useSelector(state => state.toggle.isLoading)

    let editDisabled = true
    if (order.status === 'pending' && order.payment_status !== 'approved') {
        editDisabled = false
    }

    const map = new Map()
    for (let product of order.order_products) {
        map.set(product.id, product.quantity)
    }
    const obj = Object.fromEntries(map)

    const [counts, setCounts] = useState(obj)
    const [saveDisabled, setSaveDisabled] = useState(true)

    const { openOrderShipDialog } = useToggle()

    const handleAddClick = (id) => {
        setCounts(prev => {
            prev[id]++
            return {...prev}
        })
    }
    const handleRemoveClick = (id) => {
        setCounts(prev => {
            if (prev[id] === 0) {
                return prev
            }
            prev[id]--
            return {...prev}
        })
    }
    const handleSaveClick = () => {
        dispatch(editOrderProducts(router.query.id, setSaveDisabled, {quantity: counts}))
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <ProfilePageHead
                    title='Order Details'
                    titleIcon={<ShoppingCartIcon fontSize='large' />}
                    buttonText='Ship'
                    buttonIcon={<LocalShippingIcon/>}
                    disabled={order.status !== 'shipped' && order.status !== 'cancelled' && order.payment_status === 'approved' ? false : true}
                    onClick={openOrderShipDialog}
                />
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <OrderHead order={order}/>
                    </Grid>
                    {
                        order.order_products.map(product => (
                            <Grid item xs={12} key={product.id}>
                                <OrderProductListItem
                                    product={product}
                                    count={counts[product.id]}
                                    handleAddClick={handleAddClick}
                                    handleRemoveClick={handleRemoveClick}
                                    setSaveDisabled={setSaveDisabled}
                                    editDisabled={editDisabled}
                                />
                            </Grid>
                        ))
                    }
                    <Grid item xs={12} display='flex' justifyContent='flex-end'>
                        <Button
                            variant='outlined'
                            size='small'
                            disabled={saveDisabled || isLoading}
                            onClick={handleSaveClick}
                            endIcon={
                                isLoading &&
                                <CircularProgress
                                    size={20}
                                    color='inherit'
                                />
                            }
                        >
                            Save Changes
                        </Button>
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
            </Grid>
            <OrderShipDialog/>
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
        const res = await fetchSubOrder(query.id, cookie)
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

export default Order

Order.getLayout = (page) => {
    return (
        
        <MainLayout>
            <ProfileLayout>
                {page}
            </ProfileLayout>
        </MainLayout>
    )
}