import { useFormik } from "formik"
import { useDispatch } from "react-redux"
import { useToggle } from '../../hooks/useToggle'
import { appendToFormData } from "../../../utils/utils"
import { deleteBanner, editBanner } from "../../store/actions/async/admin"
import { editbannerValidationSchema } from "./validate"


export const useEditBanner = (banner, handleBannerChange) => {

    const dispatch = useDispatch()

    const { openDeleteBannerDialog } = useToggle()

    const dialogText = `Do you really want to delete the "${banner.title}"?`

    const {
        touched, errors, isSubmitting, handleSubmit,
        getFieldProps, setValues, setSubmitting, resetForm
    } = useFormik({
        initialValues: {
            title: banner.title,
            description: banner.description,
            image: null
        },
        validationSchema: editbannerValidationSchema,
        onSubmit: (data) => {
            const formData = appendToFormData(data)
            dispatch(editBanner(banner.id, formData, setSubmitting, resetForm))
        },
        enableReinitialize: true
    })

    const handleDeleteClick = () => {
        openDeleteBannerDialog(dialogText, banner)
    }
    const handleDeleteConfirmClick = () => {
        dispatch(deleteBanner(banner.id, setSubmitting, handleBannerChange))
    }

    return {
        touched,
        errors,
        isSubmitting,
        handleSubmit,
        getFieldProps,
        setValues,
        handleDeleteClick,
        handleDeleteConfirmClick,
    }
}