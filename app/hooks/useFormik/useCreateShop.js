import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { createShop } from "../../store/actions/async/user"
import { appendToFormData } from "../../../utils/utils"
import { shopValidationSchema } from "./validate"

export const useCreateShop = () => {

    const dispatch = useDispatch()

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
        preview,
    }
}