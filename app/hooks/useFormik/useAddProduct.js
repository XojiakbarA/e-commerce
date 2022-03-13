import { useFormik } from "formik"
import { useDispatch } from "react-redux"
import { createProduct } from "../../store/actions/async/vendor"
import { appendToFormData } from "../../../utils/utils"
import { productValidationSchema } from "./validate"

export const useAddProduct = () => {

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            title: '',
            category_id: '',
            sub_category_id: '',
            brand_id: '',
            description: '',
            stock: '',
            price: '',
            sale_price: '',
            images: null,
            images_count: 0,
        },
        validationSchema: productValidationSchema,
        onSubmit: (data, {resetForm}) => {
            const formData = appendToFormData(data)
            dispatch(createProduct(formData, resetForm, formik.setSubmitting))
        }
    })

    return { ...formik }
}