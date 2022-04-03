import { Button, CircularProgress, Grid } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SaveIcon from '@mui/icons-material/Save'
import ProfileLayout from "../../../components/layout/ProfileLayout/ProfileLayout"
import OrderProductListItem from '../../../components/vendor/OrderProductListItem'
import { wrapper } from '../../../app/store'
import OrderShippingAddress from '../../../components/profile/orders/OrderShippingAddress'
import OrderDetails from '../../../components/profile/orders/OrderDetails'
import { editOrderProducts, getSubOrder, orderShipping } from '../../../app/store/actions/async/vendor';
import { useDispatch, useSelector } from 'react-redux';
import OrderHead from '../../../components/vendor/OrderHead';
import { useState } from 'react';
import ProfilePageHead from '../../../components/common/ProfilePageHead';
import MainLayout from '../../../components/layout/MainLayout';
import ConfirmDialog from '../../../components/dialogs/ConfirmDialog';
import { toggleOrderShipDialog } from '../../../app/store/actions/dialogActions';

const Order = () => {

    const dispatch = useDispatch()
    const sub_order = useSelector(state => state.subOrder)
    const isLoading = useSelector(state => state.toggle.isLoading)
    const { loading, orderShipDialog } = useSelector(state => state.dialog)

    let editDisabled = true
    if (sub_order.status === 'pending' && sub_order.payment_status !== 'approved') {
        editDisabled = false
    }

    const map = sub_order.order_products.map(product => [product.id, product.quantity])

    const obj = Object.fromEntries(map)

    const [counts, setCounts] = useState(obj)
    const [saveDisabled, setSaveDisabled] = useState(true)

    const dialogText = 'Are you sure you want to ship the order?'

    const handleAddClick = (id) => {
        setCounts(prev => {
            prev[id]++
            return {...prev}
        })
    }
    const handleRemoveClick = (id) => {
        setCounts(prev => {
            if (prev[id] === 1) {
                return prev
            }
            prev[id]--
            return {...prev}
        })
    }
    const openOrderShipDialog = () => {
        dispatch(toggleOrderShipDialog(true))
    }
    const closeOrderShipDialog = () => {
        dispatch(toggleOrderShipDialog(false))
    }
    const handleSaveClick = () => {
        dispatch(editOrderProducts(sub_order.id, setSaveDisabled, {quantity: counts}))
    }
    const handleOrderShip = () => {
        dispatch(orderShipping(sub_order.id, {status: 'shipped'}))
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <ProfilePageHead
                    title='Order Details'
                    titleIcon={<ShoppingCartIcon fontSize='large' />}
                    buttonText='Ship'
                    buttonIcon={<LocalShippingIcon/>}
                    disabled={
                        sub_order.status !== 'shipped' &&
                        sub_order.status !== 'cancelled' &&
                        sub_order.payment_status === 'approved' ? false : true}
                    onClick={ openOrderShipDialog }
                />
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <OrderHead order={sub_order}/>
                    </Grid>
                    {
                        sub_order.order_products.map(product => (
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
                                isLoading
                                ?
                                <CircularProgress
                                    size={15}
                                    color='inherit'
                                />
                                :
                                <SaveIcon/>
                            }
                        >
                            Save
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item lg={6}>
                                <OrderShippingAddress order={sub_order}/>
                            </Grid>
                            <Grid item lg={6}>
                                <OrderDetails order={sub_order}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <ConfirmDialog
                open={orderShipDialog}
                content={dialogText}
                loading={loading}
                handleCancelClick={closeOrderShipDialog}
                handleConfirmClick={handleOrderShip}
            />
        </Grid>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(({dispatch, getState}) => async ({query, req}) => {

    const user = getState().user
    const isVendor = user?.role == 'vendor'
    
    if (!user) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }
    if (!isVendor) {
        return {
            notFound: true
        }
    }

    await dispatch(getSubOrder(query.id, req.headers.cookie))

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