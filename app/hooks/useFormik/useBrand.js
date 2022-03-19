import { useFormik } from "formik"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { toggleSnackbar } from "../../store/actions/actionCreators"
import { deleteBrand } from "../../store/actions/async/admin"
import { useRipple } from "../useRipple"
import { useToggle } from "../useToggle"
import { titleValidationSchema } from "./validate"

export const useBrand = (brand, onSubmit, setEdit) => {

    const dispatch = useDispatch()

    const [ripple, events] = useRipple()

    const { openDeleteBrandDialog } = useToggle()

    const dialogText = `Do you really want to delete the "${brand?.title}"?`


    const {
        values, isSubmitting, touched, errors,
        getFieldProps, handleSubmit, handleChange, resetForm, submitForm, setSubmitting
    } = useFormik({
        initialValues: { title: brand?.title ?? '' },
        validationSchema: titleValidationSchema,
        onSubmit: onSubmit,
        enableReinitialize: true,
    })

    useEffect(() => {
        if (touched.title && errors.title) {
            dispatch(toggleSnackbar(true, errors.title, 'error'))
        } else {
            dispatch(toggleSnackbar(false, ''))
        }
    }, [dispatch, touched.title, errors.title])

    const handleEditClick = () => {
        resetForm()
        setEdit(prev => !prev)
    }
    const handleSubmitClick = async () => {
        await submitForm()
    }
    const handleBlur = () => {
        if (!ripple) setEdit(false)
    }
    const handleDeleteClick = () => {
        openDeleteBrandDialog(dialogText, brand)
    }
    const handleDeleteConfirmClick = () => {
        dispatch(deleteBrand(brand?.id, setSubmitting))
    }

    return {
        ripple,
        events,
        values,
        isSubmitting,
        touched,
        errors,
        getFieldProps,
        handleSubmit,
        handleChange,
        handleEditClick,
        handleBlur,
        handleSubmitClick,
        handleDeleteClick,
        handleDeleteConfirmClick
    }
}