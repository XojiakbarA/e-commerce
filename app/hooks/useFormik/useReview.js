import { useFormik } from "formik"
import { useDispatch } from "react-redux"
import { createReview } from "../../store/actions/async/user"
import { reviewValidationSchema } from "./validate"

export const useReview = (product_id) => {

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            rating: '',
            text: ''
        },
        validationSchema: reviewValidationSchema,
        onSubmit: (data, {setSubmitting}) => {
            dispatch(createReview(product_id, data, setSubmitting))
        },
        enableReinitialize: true
    })

    return { ...formik }
}