import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { editUser } from "../../store/actions/async/user"
import { appendToFormData } from "../../../utils/utils"
import { editProfileValidationSchema } from "./validate"

export const useEditProfile = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const formik = useFormik({
        initialValues: {
            first_name: user.first_name,
            last_name: user.last_name ?? '',
            email: user.email,
            phone: user.phone ?? '',
            birth_date: user.birth_date ?? '',
            image: null
        },
        validationSchema: editProfileValidationSchema,
        onSubmit: (data, {setSubmitting}) => {
            // const formData = appendToFormData(data)
            // dispatch(editUser(formData, user.id, setSubmitting))
            console.log(data)
            setSubmitting(false)
        },
        enableReinitialize: true
    })

    return {
        ...formik
    }
}