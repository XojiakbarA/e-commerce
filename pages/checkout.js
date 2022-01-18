import { Button, CircularProgress, Grid, Stack } from "@mui/material"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import {getDistricts, getRegions, setDistricts, toggleLoginDialog, createOrder} from "../redux/actions"
import { checkoutValidationSchema } from "../utils/validate"
import CheckoutForm from "../components/shopping-pages/CheckoutForm"
import ShoppingLayout from "../components/layout/ShoppingLayout/ShoppingLayout"
import PaymentForm from "../components/shopping-pages/PaymentForm"
import { wrapper } from '../redux/store'
import OrderDialog from "../components/dialogs/OrderDialog"

const Checkout = () => {

    const router = useRouter()
    const dispatch = useDispatch()

    const isLoading = useSelector(state => state.toggle.isLoading)
    const user = useSelector(state => state.user)

    const regions = useSelector(state => state.regions)
    const districts = useSelector(state => state.districts.data)
    const isFetching = useSelector(state => state.districts.isFetching)

    const [region, setRegion] = useState(null)
    const [district, setDistrict] = useState(null)

    useEffect(() => {
        if (!user) {
            dispatch(toggleLoginDialog(true))
        }
    }, [dispatch, user])

    const formik = useFormik({
        initialValues: {
            name: user.first_name ?? '',
            phone: user.phone ?? '',
            email: user.email ?? '',
            region_id: '',
            district_id: '',
            street: '',
            home: '',
            pay_mode: ''
        },
        validationSchema: checkoutValidationSchema,
        onSubmit: (data) => {
            dispatch(createOrder(data))
        },
        enableReinitialize: true
    })

    const handleRegionChange = (e, value) => {
        setDistrict(null)
        formik.setFieldValue('district_id', '')
        dispatch(setDistricts([]))
        if (value) {
            setRegion(value)
            formik.setFieldValue('region_id', value.id)
            dispatch(getDistricts(value.id))
        } else {
            setRegion(null)
            formik.setFieldValue('region_id', '')
            dispatch(setDistricts([]))
        }
    }
    const handleDistrictChange = (e, value) => {
        setDistrict(value)
        formik.setFieldValue('district_id', value?.id)
    }

    return(
        <>
        {
            user
            ?
            <ShoppingLayout>
                <Grid item lg={8}>
                    <form onSubmit={formik.handleSubmit}>
                        <CheckoutForm
                            formik={formik}
                            regions={regions}
                            region={region}
                            handleRegionChange={handleRegionChange}
                            districts={districts}
                            district={district}
                            handleDistrictChange={handleDistrictChange}
                            loading={isFetching}
                        />
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
                <OrderDialog/>
            </ShoppingLayout>
            :
            null
        }
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(({dispatch}) => async () => {

    await dispatch(getRegions())

})

export default Checkout