import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { toggleFormSnackbar } from "../../store/actions/actionCreators"
import { deleteRegion, editRegion } from "../../store/actions/async/admin"
import { useRipple } from "../useRipple"
import { useToggle } from "../useToggle"
import { nameValidationSchema } from "./validate"

export const useEditRegion = (region, handleSelectedClick) => {

    const dispatch = useDispatch()

    const [ripple, events] = useRipple()
    const [edit, setEdit] = useState(false)

    const { openDeleteRegionDialog } = useToggle()

    const dialogText = `Do you really want to delete the "${region.name}"?`

    const {
        values, isSubmitting, touched, errors,
        getFieldProps, handleSubmit, resetForm, submitForm, setSubmitting
    } = useFormik({
        initialValues: { name: region.name },
        validationSchema: nameValidationSchema,
        onSubmit: (data) => {
            if (values.name == region.name) {
                setSubmitting(false)
                return
            }
            dispatch(editRegion(region.id, data, resetForm, setSubmitting, setEdit))
        },
        enableReinitialize: true
    })

    useEffect(() => {
        if (touched.name && errors.name) {
            dispatch(toggleFormSnackbar(true, errors.name))
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
    const handleDeleteClick = (e) => {
        e.stopPropagation()
        openDeleteRegionDialog(dialogText, region)
    }
    const handleDeleteConfirmClick = () => {
        dispatch(deleteRegion(region.id, setSubmitting, handleSelectedClick))
    }

    return {
        ripple,
        events,
        edit,
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