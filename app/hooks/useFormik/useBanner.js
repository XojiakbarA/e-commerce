import { useFormik } from "formik"
import { useDispatch } from "react-redux"
import { useToggle } from '../../hooks/useToggle'
import { deleteBanner } from "../../store/actions/async/admin"
import { createbannerValidationSchema, editbannerValidationSchema } from "./validate"


export const useBanner = (banner, onSubmit, handleBannerChange) => {

    const dispatch = useDispatch()

    const { openDeleteBannerDialog } = useToggle()

    const dialogText = `Do you really want to delete the "${banner?.title}"?`

    const {
        touched, errors, isSubmitting, handleSubmit,
        getFieldProps, setValues, setSubmitting, resetForm
    } = useFormik({
        initialValues: {
            title: banner?.title ?? '',
            description: banner?.description ?? '',
            image: null
        },
        validationSchema: banner ? editbannerValidationSchema : createbannerValidationSchema,
        onSubmit: onSubmit,
        enableReinitialize: true
    })

    const handleDeleteClick = () => {
        openDeleteBannerDialog(dialogText, banner)
    }
    const handleDeleteConfirmClick = () => {
        dispatch(deleteBanner(banner?.id, setSubmitting, handleBannerChange))
    }
    const handleDeleteImageClick = () => {

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
        handleDeleteImageClick
    }
}