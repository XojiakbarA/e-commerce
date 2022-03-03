import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { toggleSnackbar } from "../../store/actions/actionCreators"
import { createDistrict } from "../../store/actions/async/admin"
import { useRipple } from "../useRipple"
import { nameValidationSchema } from "./validate"

export const useAddDistrict = (region) => {

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
            dispatch(createDistrict(region.id, data, resetForm, setSubmitting, setEdit))
        }
    })

    useEffect(() => {
        if (touched.name && errors.name) {
            dispatch(toggleSnackbar(true, errors.name, 'error'))
        } else {
            dispatch(toggleSnackbar(false, ''))
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