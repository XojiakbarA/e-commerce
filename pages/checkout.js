import { Button, CircularProgress, Grid, Stack } from "@mui/material"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { clearAllCart, userOrder } from "../redux/actions"
import { checkoutValidationSchema } from "../utils/validate"
import CheckoutForm from "../components/shopping-pages/CheckoutForm"
import ShoppingLayout from "../components/layout/ShoppingLayout/ShoppingLayout"
import PaymentForm from "../components/shopping-pages/PaymentForm"


const Checkout = () => {

    const router = useRouter()
    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.toggle.isLoading)
    const [initValues, setInitValues] = useState({
        name: '',
        phone: '',
        email: '',
        country: '',
        address: '',
        zip_code: '',
        pay_mode: ''
    })

    useEffect(() => {
        const data = JSON.parse(sessionStorage.getItem('checkout-form'))
        if (data) {
            setInitValues(data)
        }
    }, [])

    const formik = useFormik({
        initialValues: initValues,
        validationSchema: checkoutValidationSchema,
        onSubmit: async (data) => {
            await dispatch(userOrder(data))
            await dispatch(clearAllCart())
        },
        enableReinitialize: true
    })

    return(
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
    )
}

export default Checkout