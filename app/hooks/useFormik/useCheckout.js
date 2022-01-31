import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { createOrder } from "../../store/actions/async/user"
import { checkoutValidationSchema } from "./validate"

export const useCheckout = () => {

    const dispatch = useDispatch()

    const user = useSelector(state => state.user)

    const formik = useFormik({
        initialValues: {
            name: user.first_name ?? '',
            phone: user.phone ?? '',
            email: user.email ?? '',
            region_id: '',
            district_id: '',
            street: '',
            home: '',
            pay_mode: ''
        },
        validationSchema: checkoutValidationSchema,
        onSubmit: (data) => {
            dispatch(createOrder(data))
        },
        enableReinitialize: true
    })

    return {
        ...formik,
    }
}