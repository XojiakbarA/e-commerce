import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createShop } from "../../store/actions/async/user"
import { getDistricts } from "../../store/actions/async/common"
import { setDistricts } from "../../store/actions/actionCreators"
import { appendToFormData } from "../../../utils/utils"
import { shopValidationSchema } from "./validate"

export const useCreateShop = () => {

    const dispatch = useDispatch()

    const regions = useSelector(state => state.regions)
    const districts = useSelector(state => state.districts.data)

    const isFetching = useSelector(state => state.districts.isFetching)

    const [region, setRegion] = useState(null)
    const [district, setDistrict] = useState(null)

    const [preview, setPreview] = useState({bg_image: null, av_image: null})

    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            title: '',
            region_id: '',
            district_id: '',
            street: '',
            home: '',
            phone: '',
            bg_image: null,
            av_image: null
        },
        validationSchema: shopValidationSchema,
        onSubmit: (data) => {
            const formData = appendToFormData(data)
            dispatch(createShop(formData, formik.setSubmitting))
        }
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

    useEffect(() => {
        const bg_image = formik.values.bg_image
        if (bg_image) {
            const url = URL.createObjectURL(bg_image)
            setPreview(prevState => ({ ...prevState, bg_image: url }))
        }
    }, [formik.values.bg_image])

    useEffect(() => {
        const av_image = formik.values.av_image
        if (av_image) {
            const url = URL.createObjectURL(av_image)
            setPreview(prevState => ({ ...prevState, av_image: url }))
        }
    }, [formik.values.av_image])

    return {
        ...formik,
        regions,
        districts,
        preview,
        region,
        district,
        isFetching,
        handleRegionChange,
        handleDistrictChange,
    }
}