import { useFormik } from "formik"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { appendToFormData } from "../../../utils/utils"
import { setDistricts } from "../../store/actions/actionCreators"
import { getDistricts } from "../../store/actions/async/common"
import { editShop } from "../../store/actions/async/vendor"
import { shopValidationSchema } from "./validate"


export const useEditShop = () => {

    const dispatch = useDispatch()

    const shop = useSelector(state => state.shop.data)

    const regions = useSelector(state => state.regions)
    const districts = useSelector(state => state.districts.data)

    const isFetching = useSelector(state => state.districts.isFetching)

    const [region, setRegion] = useState(shop.region)
    const [district, setDistrict] = useState(shop.district)

    const [preview, setPreview] = useState({bg_image: null, av_image: null})
    
    const formik = useFormik({
        initialValues: {
            first_name: shop.first_name ?? '',
            last_name: shop.last_name ?? '',
            title: shop.title ?? '',
            region_id: shop.region.id ?? '',
            district_id: shop.district.id ?? '',
            street: shop.street ?? '',
            home: shop.home ?? '',
            phone: shop.phone ?? '',
            bg_image: null,
            av_image: null
        },
        validationSchema: shopValidationSchema,
        onSubmit: (data) => {
            const formData = appendToFormData(data)
            dispatch(editShop(shop.id, formData, formik.setSubmitting))
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
        shop,
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