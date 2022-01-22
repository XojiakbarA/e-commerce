import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { createReview } from "../../../redux/actions"
import { reviewValidationSchema } from "./validate"

export const useReview = () => {

    const dispatch = useDispatch()

    const id = useSelector(state => state.product.id)
    const user = useSelector(state => state.user)

    const formik = useFormik({
        initialValues: {
            rating: 0,
            name: user.first_name ?? '',
            text: ''
        },
        validationSchema: reviewValidationSchema,
        onSubmit: (data, {resetForm}) => {
            dispatch(createReview(id, data, resetForm, formik.setSubmitting))
        },
        enableReinitialize: true
    })

    return { ...formik }
}