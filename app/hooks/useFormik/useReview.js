import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { createReview } from "../../store/actions/async/user"
import { reviewValidationSchema } from "./validate"

export const useReview = () => {

    const dispatch = useDispatch()
    const {payload} = useSelector(state => state.dialog)

    const formik = useFormik({
        initialValues: {
            rating: '',
            text: ''
        },
        validationSchema: reviewValidationSchema,
        onSubmit: (data, {setSubmitting}) => {
            dispatch(createReview(payload, data, setSubmitting))
        },
        enableReinitialize: true
    })

    return { ...formik }
}