import { useFormik } from "formik"
import { useDispatch } from "react-redux"
import { userLogin } from "../../store/actions/async/user"
import { loginValidationSchema } from "./validate"

export const useLogin = () => {

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            remember: ''
        },
        validationSchema: loginValidationSchema,
        onSubmit: (data, { setSubmitting }) => {
            dispatch(userLogin(data, setSubmitting, setErrors))
        }
    })

    return { ...formik }
}