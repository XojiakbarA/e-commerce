import { useFormik } from "formik"
import { useDispatch } from "react-redux"
import { appendToFormData } from "../../../utils/utils"
import { createBanner } from "../../store/actions/async/admin"
import { createbannerValidationSchema } from "./validate"

export const useAddBanner = () => {

    const dispatch = useDispatch()

    const {
        values, touched, errors, isSubmitting,
        handleSubmit, getFieldProps, setValues, resetForm, setSubmitting
    } = useFormik({
        initialValues: {
            title: '',
            description: '',
            image: null
        },
        validationSchema: createbannerValidationSchema,
        onSubmit: (data) => {
            const formData = appendToFormData(data)
            dispatch(createBanner(formData, resetForm, setSubmitting))
        }
    })

    return {
        values,
        touched,
        errors,
        isSubmitting,
        handleSubmit,
        getFieldProps,
        setValues
    }
}