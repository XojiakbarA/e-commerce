import { useFormik } from "formik"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { deleteBrand, editBrand } from "../../store/actions/async/admin"

export const useEditBrand = (brand) => {

    const dispatch = useDispatch()

    const [edit, setEdit] = useState(false)

    const { values, isSubmitting, getFieldProps, handleSubmit, handleChange, resetForm, submitForm, setSubmitting } = useFormik({
        initialValues: { title: brand.title},
        onSubmit: (data) => {
            if (values.title == brand.title) {
                setSubmitting(false)
                return
            }
            dispatch(editBrand(brand.id, data, resetForm, setSubmitting, setEdit))
        },
        enableReinitialize: true,
    })

    const handleEditClick = () => {
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
        dispatch(deleteBrand(brand.id, setSubmitting))
    }

    return {
        edit,
        values,
        isSubmitting,
        getFieldProps,
        handleSubmit,
        handleChange,
        handleEditClick,
        handleBlur,
        handleSubmitClick,
        handleDeleteClick
    }
}