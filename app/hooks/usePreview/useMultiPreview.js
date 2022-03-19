import { useState } from "react"
import { makeURLArray } from "../../../utils/utils"

export const useMultiPreview = (formikImages, setValues) => {

    const [preview, setPreview] = useState([])

    const handleUploadChange = (e) => {
        const prevImages = formikImages
        const newImages = e.target.files

        const dt = new DataTransfer()

        if (prevImages) {
            for (let image of prevImages) {
                dt.items.add(image)
            }
        }
        for (let image of newImages) {
            dt.items.add(image)
        }

        const images = dt.files

        setValues(prevValues => (
            {
                ...prevValues,
                images_count: prevValues.images_count + newImages.length,
                images: images
            }
        ))

        setPreview(makeURLArray(images))
    }

    const handlePreviewDeleteClick = (i) => {
        const images = { ...formikImages }
        delete images[i]

        const dt = new DataTransfer()
        for (let key in images) {
            dt.items.add(images[key])
        }
        images = dt.files

        setValues(prevValues => (
            {
                ...prevValues,
                images_count: prevValues.images_count - 1,
                images: images
            }
        ))
        setPreview(makeURLArray(images))
    }

    const handleClearClick = () => {
        setValues(prevValues => (
            {
                ...prevValues,
                images_count: 0,
                images: null
            }
        ))
        setPreview([])
    }

    return {
        preview,
        setPreview,
        handleUploadChange,
        handlePreviewDeleteClick,
        handleClearClick
    }
}