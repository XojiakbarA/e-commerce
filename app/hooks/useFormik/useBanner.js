import { useFormik } from "formik"
import { createbannerValidationSchema, editbannerValidationSchema } from "./validate"


export const useBanner = (banner, onSubmit) => {

    const {
        touched, errors, isSubmitting, handleSubmit, getFieldProps, setValues
    } = useFormik({
        initialValues: {
            title: banner?.title ?? '',
            description: banner?.description ?? '',
            image: null
        },
        validationSchema: banner ? editbannerValidationSchema : createbannerValidationSchema,
        onSubmit: onSubmit,
        enableReinitialize: true
    })

    const handleDeleteImageClick = () => {

    }

    return {
        touched,
        errors,
        isSubmitting,
        handleSubmit,
        getFieldProps,
        setValues,
        handleDeleteImageClick
    }
}