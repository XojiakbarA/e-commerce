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

    return {
        preview,
        handleBgUploadChange,
        handleAvUploadChange
    }
}