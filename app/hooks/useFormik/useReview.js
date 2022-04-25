import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { createReview } from "../../store/actions/async/user"
import { reviewValidationSchema } from "./validate"

export const useReview = () => {

    const dispatch = useDispatch()
    const user_id = useSelector(state => state.user.id)
    const product_id = useSelector(state => state.dialog.prod_id)

    const formik = useFormik({
        initialValues: {
            rating: '',
            text: '',
            product_id
        },
        validationSchema: reviewValidationSchema,
        onSubmit: (data, {setSubmitting}) => {
            dispatch(createReview(user_id, data, setSubmitting))
        },
        enableReinitialize: true
    })

    return { ...formik }
}