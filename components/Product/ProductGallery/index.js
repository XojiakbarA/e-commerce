import { useEffect, useState } from "react"
import { Box } from "@mui/material"
import Image from 'next/image'
import GalleryButtons from "./GalleryButtons"
import { productImageURL } from "../../../utils/utils"

const ProductGallery = ({images}) => {

    if (images.length === 0) {
        images = [{id: null, src: 'no_images.jpeg'}]
    }

    const [src, setSrc] = useState(null)

    useEffect(() => {
        setSrc(images[0].src)

        return () => {
            setSrc(null)
        }
    }, [setSrc, images])

    const handleClick = (src) => {
        setSrc(src)
        console.log(src)
    }

    return(
        <Box>
            <Image
                src={productImageURL + src}
                alt={src}
                width={500}
                height={625}
            />
            <GalleryButtons state={src} images={images} handleClick={handleClick} />
        </Box>
    )
}

export default ProductGallery