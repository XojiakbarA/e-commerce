import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { toggleSnackbar } from "../../store/actions/actionCreators"
import { deleteDistrict } from "../../store/actions/async/admin"
import { useRipple } from "../useRipple"
import { useToggle } from "../useToggle"
import { nameValidationSchema } from "./validate"

export const useDistrict = (district, onSubmit, setEdit) => {

    const dispatch = useDispatch()

    const [ripple, events] = useRipple()

    const { openDeleteDistrictDialog } = useToggle()

    const dialogText = `Do you really want to delete the "${district?.name}"?`

    const {
        values, isSubmitting, touched, errors,
        getFieldProps, handleSubmit, resetForm, submitForm, setSubmitting
    } = useFormik({
        initialValues: { name: district?.name ?? '' },
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
    const handleSubmitClick = async () => {
        await submitForm()
    }
    const handleBlur = () => {
        if (!ripple) setEdit(false)
    }
    const handleDeleteClick = () => {
        openDeleteDistrictDialog(dialogText, district)
    }
    const handleDeleteConfirmClick = () => {
        dispatch(deleteDistrict(district?.id, setSubmitting))
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
        handleSubmitClick,
        handleBlur,
        handleDeleteClick,
        handleDeleteConfirmClick
    }
}