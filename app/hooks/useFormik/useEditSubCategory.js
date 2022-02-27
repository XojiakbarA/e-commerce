import { useFormik } from "formik"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { deleteSubCategory, editSubCategory } from "../../store/actions/async/admin"

export const useEditSubCategory = (sub_category) => {

    const dispatch = useDispatch()

    const [ edit, setEdit ] = useState(false)

    const { values, isSubmitting, getFieldProps, handleChange, handleSubmit, submitForm, resetForm, setSubmitting } = useFormik({
        initialValues: { title: sub_category.title },
        onSubmit: (data) => {
            if (values.title == sub_category.title) {
                setSubmitting(false)
                return
            }
            dispatch(editSubCategory(sub_category.id, data, resetForm, setSubmitting, setEdit))
        },
        enableReinitialize: true
    })

    const handleEditClick = (e) => {
        resetForm()
        setEdit(prev => !prev)
    }
    const handleBlur = () => {
        setEdit(false)
    }
    const handleSubmitClick = async () => {
        await submitForm()
    }
    const handleDeleteClick = () => {
        dispatch(deleteSubCategory(sub_category.id, setSubmitting))
    }

    return {
        edit,
        values,
        isSubmitting,
        getFieldProps,
        handleChange,
        handleSubmit,
        handleEditClick,
        handleBlur,
        handleSubmitClick,
        handleDeleteClick
    }
}