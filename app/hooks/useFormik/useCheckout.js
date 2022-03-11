import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { createOrder } from "../../store/actions/async/user"
import { checkoutValidationSchema } from "./validate"

export const useCheckout = () => {

    const dispatch = useDispatch()

    const user = useSelector(state => state.user)
    const cart = useSelector(state => state.cart.data)
    const total = useSelector(state => state.cart.total)
    const products = cart.map(item => ({id: item.id, quantity: item.quantity}))

    const formik = useFormik({
        initialValues: {
            name: user.first_name ?? '',
            phone: user.phone ?? '',
            email: user.email ?? '',
            region_id: '',
            district_id: '',
            street: '',
            home: '',
            pay_mode: '',
            products: products,
            total: total
        },
        validationSchema: checkoutValidationSchema,
        onSubmit: (data, {setSubmitting}) => {
            dispatch(createOrder(data, setSubmitting))
        },
        enableReinitialize: true
    })

    return {
        ...formik,
    }
}