import { useFormik } from "formik"
import { productValidationSchema } from "./validate"

export const useProduct = (product, onSubmit) => {

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

    return {
        ...formik,
    }
}