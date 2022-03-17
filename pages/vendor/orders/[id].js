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
import { useToggle } from '../../../app/hooks/useToggle';
import OrderHead from '../../../components/vendor/OrderHead';
import { useState } from 'react';
import { useRouter } from 'next/router';
import ProfilePageHead from '../../../components/common/ProfilePageHead';
import MainLayout from '../../../components/layout/MainLayout';
import ConfirmDialog from '../../../components/dialogs/ConfirmDialog';

const Order = () => {

    const router = useRouter()
    const dispatch = useDispatch()
    const order = useSelector(state => state.subOrder)
    const isLoading = useSelector(state => state.toggle.isLoading)

    let editDisabled = true
    if (order.status === 'pending' && order.payment_status !== 'approved') {
        editDisabled = false
    }

    const map = order.order_products.map(product => [product.id, product.quantity])

    const obj = Object.fromEntries(map)

    const [counts, setCounts] = useState(obj)
    const [saveDisabled, setSaveDisabled] = useState(true)

    const { orderShipDialog, openOrderShipDialog, closeOrderShipDialog } = useToggle()

    const { isOpen, text } = orderShipDialog

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
    const handleSaveClick = () => {
        dispatch(editOrderProducts(router.query.id, setSaveDisabled, {quantity: counts}))
    }
    const handleOrderShip = () => {
        dispatch(orderShipping(router.query.id))
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
                    onClick={e => openOrderShipDialog(dialogText)}
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
                                <OrderShippingAddress order={order}/>
                            </Grid>
                            <Grid item lg={6}>
                                <OrderDetails order={order}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <ConfirmDialog
                open={isOpen}
                content={text}
                loading={isLoading}
                handleCancelClick={closeOrderShipDialog}
                handleConfirmClick={handleOrderShip}
            />
        </Grid>
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