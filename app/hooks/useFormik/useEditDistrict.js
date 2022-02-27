import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { toggleFormSnackbar } from "../../store/actions/actionCreators"
import { useRipple } from "../useRipple"
import { useToggle } from "../useToggle"
import { nameValidationSchema } from "./validate"

export const useEditDistrict = (district) => {

    const dispatch = useDispatch()

    const [ripple, events] = useRipple()
    const [edit, setEdit] = useState(false)

    const { openDeleteDistrictDialog } = useToggle()

    const dialogText = `Do you really want to delete the "${district.name}"?`

    const {
        values, isSubmitting, touched, errors,
        getFieldProps, handleSubmit, resetForm, submitForm, setSubmitting
    } = useFormik({
        initialValues: { name: district.name },
        validationSchema: nameValidationSchema,
        onSubmit: (data) => {
            if (values.name == district.name) {
                setSubmitting(false)
                return
            }
            console.log(data)
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
    const handleDeleteClick = () => {
        openDeleteDistrictDialog(dialogText, district)
    }
    const handleDeleteConfirmClick = () => {

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