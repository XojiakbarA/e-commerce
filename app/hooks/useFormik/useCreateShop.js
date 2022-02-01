import { useFormik } from "formik"
import { useDispatch } from "react-redux"
import { createShop } from "../../store/actions/async/user"
import { appendToFormData } from "../../../utils/utils"
import { shopValidationSchema } from "./validate"

export const useCreateShop = () => {

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            title: '',
            region_id: '',
            district_id: '',
            street: '',
            home: '',
            phone: '',
            bg_image: null,
            av_image: null
        },
        validationSchema: shopValidationSchema,
        onSubmit: (data) => {
            const formData = appendToFormData(data)
            dispatch(createShop(formData, formik.setSubmitting))
        }
    })

    return { ...formik }
}