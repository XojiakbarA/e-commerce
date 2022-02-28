import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { toggleFormSnackbar } from "../../store/actions/actionCreators"
import { createRegion } from "../../store/actions/async/admin"
import { useRipple } from "../useRipple"
import { nameValidationSchema } from "./validate"

export const useAddRegion = (handleSelectedClick) => {

    const dispatch = useDispatch()

    const [ripple, events] = useRipple()
    const [edit, setEdit] = useState(false)

    const {
        values, errors, touched, isSubmitting,
        getFieldProps, handleSubmit, submitForm, resetForm, setSubmitting
    } = useFormik({
        initialValues: { name: '' },
        validationSchema: nameValidationSchema,
        onSubmit: (data) => {
            dispatch(createRegion(data, resetForm, setSubmitting, setEdit, handleSelectedClick))
            setSubmitting(false)
        }
    })

    useEffect(() => {
        if (touched.name && errors.name) {
            dispatch(toggleFormSnackbar(true, errors.name))
        }
    }, [dispatch, touched.name, errors.name])

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

    return {
        edit,
        values,
        errors,
        touched,
        events,
        isSubmitting,
        getFieldProps,
        handleSubmit,
        handleEditClick,
        handleSubmitClick,
        handleBlur,
    }
}