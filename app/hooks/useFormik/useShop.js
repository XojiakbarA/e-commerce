import { useFormik } from "formik"
import { shopValidationSchema } from "./validate"


export const useShop = (shop, onSubmit) => {

    const formik = useFormik({
        initialValues: {
            title: shop?.title ?? '',
            region_id: shop?.region?.id ?? '',
            district_id: shop?.district?.id ?? '',
            street: shop?.street ?? '',
            home: shop?.home ?? '',
            phone: shop?.phone ?? '',
            bg_image: null,
            av_image: null
        },
        validationSchema: shopValidationSchema,
        onSubmit: onSubmit,
        enableReinitialize: true
    })

    const handleBgDeleteImage = () => {

    }
    const handleAvDeleteImage = () => {

    }


    return {
        ...formik,
        handleBgDeleteImage,
        handleAvDeleteImage,
    }
}