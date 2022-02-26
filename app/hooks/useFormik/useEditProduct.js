import { useFormik } from "formik"
import { useDispatch } from "react-redux"
import { deleteProduct, deleteProductImage, editProduct } from "../../store/actions/async/vendor"
import { appendToFormData } from "../../../utils/utils"
import { productValidationSchema } from "./validate"

export const useEditProduct = (product) => {

    const dispatch = useDispatch()

    const shop_id = product.shop?.id
    const product_id = product.id

    const formik = useFormik({
        initialValues: {
            title: product.title ?? '',
            category_id: product.category?.id ?? '',
            sub_category_id: product.sub_category?.id ?? '',
            brand_id: product.brand?.id ?? '',
            shop_id: product.shop?.id ?? '',
            description: product.description ?? '',
            stock: product.stock ?? '',
            price: product.price ?? '',
            sale_price: product.sale_price ?? '',
            images: null,
            images_count: 0,
        },
        validationSchema: productValidationSchema,
        onSubmit: (data, {resetForm}) => {
            const formData = appendToFormData(data)
            dispatch(editProduct(shop_id, product_id, formData, resetForm, formik.setSubmitting))
        },
        enableReinitialize: true
    })

    const handleProductImageClick = (image_id) => {
        dispatch(deleteProductImage(shop_id, product_id, image_id))
    }
    const handleDeleteClick = () => {
        dispatch(deleteProduct(shop_id, product_id, formik.setSubmitting))
    }

    return {
        ...formik,
        handleProductImageClick,
        handleDeleteClick
    }
}