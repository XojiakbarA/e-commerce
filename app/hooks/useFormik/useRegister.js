import { useFormik } from "formik"
import { useDispatch } from "react-redux"
import { userRegister } from "../../store/actions/async/user"
import { registerValidationSchema } from "./validate"

export const useRegister = () => {

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            first_name: '',
            email: '',
            password: '',
            password_confirmation: ''
        },
        validationSchema: registerValidationSchema,
        onSubmit: (data, { setSubmitting, setFieldError }) => {
            dispatch(userRegister(data, setSubmitting, setFieldError))
        }
    })

    return { ...formik }
}