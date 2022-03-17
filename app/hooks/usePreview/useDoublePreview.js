import { useState } from "react"


export const useDoublePreview = (setValues) => {

    const [preview, setPreview] = useState({bg_image: null, av_image: null})

    const handleBgUploadChange = (e) => {
        const image = e.target.files[0]
        const url = URL.createObjectURL(image)

        setValues(prevValues => (
            {
                ...prevValues,
                bg_image: image
            }
        ))
        setPreview(prevState => ({ ...prevState, bg_image: url }))
    }

    const handleAvUploadChange = (e) => {
        const image = e.target.files[0]
        const url = URL.createObjectURL(image)

        setValues(prevValues => (
            {
                ...prevValues,
                av_image: image
            }
        ))
        setPreview(prevState => ({ ...prevState, av_image: url }))
    }

    const handleBgPreviewDeleteClick = () => {
        setValues(prevValues => (
            {
                ...prevValues,
                bg_image: null
            }
        ))
        setPreview(prevState => ({ ...prevState, bg_image: null }))
    }

    const handleAvPreviewDeleteClick = () => {
        setValues(prevValues => (
            {
                ...prevValues,
                av_image: null
            }
        ))
        setPreview(prevState => ({ ...prevState, av_image: null }))
    }

    return {
        preview,
        handleBgUploadChange,
        handleAvUploadChange,
        handleBgPreviewDeleteClick,
        handleAvPreviewDeleteClick,
    }
}