import { useState } from "react"

export const useSinglePreview = (setValues) => {

    const [preview, setPreview] = useState(null)

    const handleUploadChange = (e) => {
        const image = e.target.files[0]
        const url = URL.createObjectURL(image)

        setValues(prevValues => (
            {
                ...prevValues,
                image: image
            }
        ))
        setPreview(url)
    }

    return {
        preview,
        handleUploadChange
    }
}