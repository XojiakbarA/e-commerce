import { useState } from "react"
import { Box } from "@mui/material"
import Image from 'next/image'
import GalleryButtons from "./GalleryButtons"
import { imageLoader } from "../../../utils/utils"

const ProductGallery = ({images}) => {

    if (images.length === 0) {
        images = [{id: null, src: 'no_images.jpeg'}]
    }

    const [src, setSrc] = useState(images[0].src)

    const handleClick = (e) => {
        setSrc(e.target.alt)
    }

    return(
        <Box>
            <Image
                loader={imageLoader}
                src={'products/' + src}
                alt={src}
                width={500}
                height={625}
            />
            <GalleryButtons images={images} handleClick={handleClick} />
        </Box>
    )
}

export default ProductGallery