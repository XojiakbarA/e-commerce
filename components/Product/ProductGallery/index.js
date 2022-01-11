import { useEffect, useState } from "react"
import { Grid } from "@mui/material"
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
    }

    return(
        <Grid container spacing={2}>
            <Grid item lg={12}>
                <Image
                    src={productImageURL + src}
                    alt={src}
                    width={500}
                    height={625}
                />
            </Grid>
            <Grid item lg={12}>
                <GalleryButtons state={src} images={images} handleClick={handleClick} />
            </Grid>
        </Grid>
    )
}

export default ProductGallery