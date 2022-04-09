import { useFormik } from "formik"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { toggleSnackbar } from "../../store/actions/actionCreators"
import { useRipple } from "../useRipple"

export const useSingleField = (field, value, onSubmit, validationSchema, setEdit) => {

    const dispatch = useDispatch()

    const [ripple, events] = useRipple()

    const initialValues = Object.fromEntries([[field, value || '']])

    const {
        values, isSubmitting, touched, errors,
        getFieldProps, handleSubmit, resetForm, setSubmitting
    } = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
        enableReinitialize: true
    })

    useEffect(() => {
        if (touched[field] && errors[field]) {
            dispatch(toggleSnackbar(true, errors[field], 'error'))
        } else {
            dispatch(toggleSnackbar(false, ''))
        }
    }, [dispatch, touched, errors, field])

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
        values,
        isSubmitting,
        events,
        touched,
        errors,
        getFieldProps,
        handleSubmit,
        handleEditClick,
        handleBlur,
        setSubmitting
    }
}