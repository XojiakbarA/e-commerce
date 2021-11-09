import { useState } from "react"
import { Box } from "@mui/material"
import Image from 'next/image'
import GalleryButtons from "./GalleryButtons"

const ProductGallery = ({gallery}) => {

    const [src, setSrc] = useState(gallery[0].src)

    const handleClick = (e) => {
        setSrc(e.target.alt)
    }

    return(
        <Box>
            <Image src={src} alt={src} width={500} height={625} />
            <GalleryButtons gallery={gallery} handleClick={handleClick} />
        </Box>
    )
}

export default ProductGallery