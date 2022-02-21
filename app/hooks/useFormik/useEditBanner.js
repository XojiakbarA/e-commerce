import { useFormik } from "formik"
import { useDispatch } from "react-redux"
import { appendToFormData } from "../../../utils/utils"
import { editBanner } from "../../store/actions/async/admin"
import { bannerValidationSchema } from "./validate"


export const useEditBanner = (banner) => {

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            title: banner.title,
            description: banner.description,
            image: banner.image
        },
        validationSchema: bannerValidationSchema,
        onSubmit: (data, {setSubmitting, resetForm}) => {
            const formData = appendToFormData(data)
            dispatch(editBanner(banner.id, formData, setSubmitting, resetForm))
        },
        enableReinitialize: true
    })

    return { ...formik }
}