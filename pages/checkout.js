import { Button, CircularProgress, Grid, Stack } from "@mui/material"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import {clearAllCart, toggleLoginDialog, userOrder} from "../redux/actions"
import { checkoutValidationSchema } from "../utils/validate"
import CheckoutForm from "../components/shopping-pages/CheckoutForm"
import ShoppingLayout from "../components/layout/ShoppingLayout/ShoppingLayout"
import PaymentForm from "../components/shopping-pages/PaymentForm"
import { wrapper } from '../redux/store'

const Checkout = () => {

    const router = useRouter()
    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.toggle.isLoading)
    const user = useSelector(state => state.user?.data)

    useEffect(() => {
        if (!user) {
            dispatch(toggleLoginDialog(true))
        }
    }, [dispatch, user])

    const formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            email: '',
            country: '',
            address: '',
            zip_code: '',
            pay_mode: ''
        },
        validationSchema: checkoutValidationSchema,
        onSubmit: async (data) => {
            await dispatch(userOrder(data))
            await dispatch(clearAllCart())
        },
        enableReinitialize: true
    })

    return(
        <>
        {
            user
            ?
            <ShoppingLayout>
                <Grid item lg={8}>
                    <form onSubmit={formik.handleSubmit}>
                        <CheckoutForm formik={formik}/>
                        <PaymentForm formik={formik}/>

                        <Stack direction='row' spacing={4} justifyContent='center'>
                            <Button fullWidth variant='outlined' onClick={() => router.push('/cart')}>Back to Cart</Button>
                            <Button
                                variant='contained'
                                fullWidth
                                type='submit'
                                endIcon={ isLoading
                                    &&
                                    <CircularProgress
                                        color='inherit'
                                        size={20}
                                        sx={{position: 'absolute', top: 8, right: 50}}
                                    />
                                }
                                disabled={isLoading}
                            >
                                Order
                            </Button>
                        </Stack>
                    </form>
                </Grid>
            </ShoppingLayout>
            :
            null
        }
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(({dispatch}) => async () => {

    

})

export default Checkout