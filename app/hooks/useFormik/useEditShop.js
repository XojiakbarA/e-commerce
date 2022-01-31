import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { appendToFormData } from "../../../utils/utils"
import { editShop } from "../../store/actions/async/vendor"
import { shopValidationSchema } from "./validate"


export const useEditShop = () => {

    const dispatch = useDispatch()

    const shop = useSelector(state => state.shop.data)

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
        preview,
    }
}