import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { toggleSnackbar } from "../../store/actions/actionCreators"
import { useRipple } from "../useRipple"
import { titleValidationSchema } from "./validate"

export const useFieldTitle = (title, onSubmit, edit, setEdit) => {

    const dispatch = useDispatch()

    const [ripple, events] = useRipple()
    const [open, setOpen] = useState(false)
    
    const {
        values, isSubmitting, touched, errors,
        getFieldProps, handleSubmit, resetForm, setSubmitting
    } = useFormik({
        initialValues: { title: title ?? '' },
        onSubmit: onSubmit,
        validationSchema: titleValidationSchema,
        enableReinitialize: true
    })

    useEffect(() => {
        if (touched.title && errors.title) {
            dispatch(toggleSnackbar(true, errors.title, 'error'))
        } else {
            dispatch(toggleSnackbar(false, ''))
        }
    }, [dispatch, touched.title, errors.title])

    const handleOpenClick = (e) => {
        if (!edit) setOpen(prev => !prev)
    }
    const handleEditClick = (e) => {
        e.stopPropagation()
        resetForm()
        setEdit(prev => !prev)
    }
    const handleBlur = () => {
        if (!ripple) setEdit(false)
    }

    return {
        open,
        ripple,
        values,
        isSubmitting,
        events,
        touched,
        errors,
        getFieldProps,
        handleSubmit,
        handleOpenClick,
        handleEditClick,
        handleBlur,
        setSubmitting
    }
}