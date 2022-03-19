import { useFormik } from "formik"
import { useDispatch } from "react-redux"
import { deleteProduct, deleteProductImage } from "../../store/actions/async/vendor"
import { productValidationSchema } from "./validate"

export const useProduct = (product, onSubmit) => {

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            title: product?.title ?? '',
            category_id: product?.category?.id ?? '',
            sub_category_id: product?.sub_category?.id ?? '',
            brand_id: product?.brand?.id ?? '',
            description: product?.description ?? '',
            stock: product?.stock ?? '',
            price: product?.price ?? '',
            sale_price: product?.sale_price ?? '',
            images: null,
            images_count: product?.images?.length ?? 0,
        },
        validationSchema: productValidationSchema,
        onSubmit: onSubmit,
        enableReinitialize: true
    })

    const handleDeleteImageClick = (product_id, image_id) => {
        dispatch(deleteProductImage(product_id, image_id, formik.setSubmitting))
    }
    const handleDeleteClick = () => {
        dispatch(deleteProduct(product.id, formik.setSubmitting))
    }

    return {
        ...formik,
        handleDeleteImageClick,
        handleDeleteClick
    }
}