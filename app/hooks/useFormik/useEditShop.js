import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { appendToFormData } from "../../../utils/utils"
import { editShop } from "../../store/actions/async/vendor"
import { shopValidationSchema } from "./validate"


export const useEditShop = () => {

    const dispatch = useDispatch()

    const shop = useSelector(state => state.shop.data)

    const formik = useFormik({
        initialValues: {
            title: shop.title ?? '',
            region_id: shop.region.id ?? '',
            district_id: shop.district.id ?? '',
            street: shop.street ?? '',
            home: shop.home ?? '',
            phone: shop.phone ?? '',
            bg_image: null,
            av_image: null
        },
        validationSchema: shopValidationSchema,
        onSubmit: (data) => {
            const formData = appendToFormData(data)
            dispatch(editShop(shop.id, formData, formik.setSubmitting))
        }
    })

    return {
        ...formik,
        shop,
    }
}