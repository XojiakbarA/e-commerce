import { useFormik } from "formik"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { toggleSnackbar } from "../../store/actions/actionCreators"
import { useRipple } from "../useRipple"
import { nameValidationSchema } from "./validate"

export const useFieldName = (name, onSubmit, setEdit) => {

    const dispatch = useDispatch()

    const [ripple, events] = useRipple()

    const {
        values, isSubmitting, touched, errors,
        getFieldProps, handleSubmit, resetForm, setSubmitting
    } = useFormik({
        initialValues: { name: name ?? '' },
        validationSchema: nameValidationSchema,
        onSubmit: onSubmit,
        enableReinitialize: true
    })

    useEffect(() => {
        if (touched.name && errors.name) {
            dispatch(toggleSnackbar(true, errors.name, 'error'))
        } else {
            dispatch(toggleSnackbar(false, ''))
        }
    }, [dispatch, touched.name, errors.name])

    const handleEditClick = (e) => {
        e.stopPropagation()
        resetForm()
        setEdit(prev => !prev)
    }
    const handleBlur = () => {
        if (!ripple) setEdit(false)
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
        setSubmitting,
        handleEditClick,
        handleBlur
    }
}