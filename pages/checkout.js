import { Button, CircularProgress, Grid, Stack } from "@mui/material"
import { useRouter } from "next/router"
import {getRegions} from "../redux/actions"
import CheckoutForm from "../components/shopping-pages/CheckoutForm"
import ShoppingLayout from "../components/layout/ShoppingLayout/ShoppingLayout"
import PaymentForm from "../components/shopping-pages/PaymentForm"
import { wrapper } from '../redux/store'
import OrderDialog from "../components/dialogs/OrderDialog"
import { useCheckout } from "../app/hooks/useFormik/useCheckout"

const Checkout = () => {

    const router = useRouter()

    const {
        handleSubmit, getFieldProps, handleBlur, handleChange,
        handleRegionChange, handleDistrictChange,
        touched, errors, values, isFetching, isSubmitting,
        regions, districts, region, district
    } = useCheckout()

    return(
        <>
            <ShoppingLayout>
                <Grid item lg={8}>
                    <form onSubmit={handleSubmit}>
                        <CheckoutForm
                            getFieldProps={getFieldProps}
                            handleBlur={handleBlur}
                            handleRegionChange={handleRegionChange}
                            handleDistrictChange={handleDistrictChange}
                            touched={touched}
                            errors={errors}
                            regions={regions}
                            districts={districts}
                            region={region}
                            district={district}
                            isFetching={isFetching}
                        />

                        <PaymentForm
                            touched={touched}
                            errors={errors}
                            values={values}
                            handleChange={handleChange}
                        />

                        <Stack direction='row' spacing={4} justifyContent='center'>
                            <Button fullWidth variant='outlined' onClick={() => router.push('/cart')}>Back to Cart</Button>
                            <Button
                                variant='contained'
                                fullWidth
                                type='submit'
                                endIcon={ isSubmitting
                                    &&
                                    <CircularProgress
                                        color='inherit'
                                        size={20}
                                        sx={{position: 'absolute', top: 8, right: 50}}
                                    />
                                }
                                disabled={isSubmitting}
                            >
                                Order
                            </Button>
                        </Stack>
                    </form>
                </Grid>
                <OrderDialog/>
            </ShoppingLayout>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(({dispatch, getState}) => async () => {

    const user = getState().user
    const cart = getState().cart.data
    
    if (!user) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    if (cart.length === 0) {
        return {
            redirect: {
                destination: '/cart',
                permanent: false
            }
        }
    }

    await dispatch(getRegions())

})

export default Checkout