import { useFormik } from "formik"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { deleteCategory, editCategory } from "../../store/actions/async/admin"
import { useRipple } from "../useRipple"

export const useEditCategory = (category) => {

    const dispatch = useDispatch()

    const [ripple, events] = useRipple()
    const [open, setOpen] = useState(false)
    const [ edit, setEdit ] = useState(false)
    
    const { values, isSubmitting, getFieldProps, handleSubmit, submitForm, resetForm, setSubmitting } = useFormik({
        initialValues: { title: category.title },
        onSubmit: (data) => {
            if (values.title == category.title) {
                setSubmitting(false)
                return
            }
            dispatch(editCategory(category.id, data, resetForm, setSubmitting, setEdit))
        },
        enableReinitialize: true
    })

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
    const handleSubmitClick = async () => {
        await submitForm()
    }
    const handleDeleteClick = () => {
        dispatch(deleteCategory(category.id, setSubmitting))
    }

    return {
        open,
        edit,
        ripple,
        values,
        isSubmitting,
        events,
        getFieldProps,
        handleSubmit,
        handleOpenClick,
        handleEditClick,
        handleBlur,
        handleSubmitClick,
        handleDeleteClick
    }
}