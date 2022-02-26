import { useFormik } from "formik"
import { useDispatch } from "react-redux"
import { createCategory } from "../../store/actions/async/admin"
import { categoryValidationSchema } from "./validate"

export const useAddCategory = (setOpen) => {

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            category: {
                title: ''
            },
            sub_categories: [
                { title: '' }
            ]
        },
        validationSchema: categoryValidationSchema,
        onSubmit: (data, {resetForm, setSubmitting}) => {
            dispatch(createCategory(data, resetForm, setSubmitting, setOpen))
        },
        validateOnBlur: false
    })

    return { ...formik }
}