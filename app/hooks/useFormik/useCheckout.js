import { useFormik } from "formik"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createOrder } from "../../store/actions/async/user"
import { getDistricts } from "../../store/actions/async/common"
import { setDistricts } from "../../store/actions/actionCreators"
import { checkoutValidationSchema } from "./validate"

export const useCheckout = () => {

    const dispatch = useDispatch()

    const user = useSelector(state => state.user)

    const regions = useSelector(state => state.regions)
    const districts = useSelector(state => state.districts.data)
    const isFetching = useSelector(state => state.districts.isFetching)

    const [region, setRegion] = useState(null)
    const [district, setDistrict] = useState(null)

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

    return {
        ...formik,
        regions,
        districts,
        region,
        district,
        isFetching,
        handleRegionChange,
        handleDistrictChange
    }
}