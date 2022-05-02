import { useEffect, useState } from "react"
import { Box, Grid } from "@mui/material"
import Image from 'next/image'
import GalleryButtons from "./GalleryButtons"
import { appURL } from "../../../../utils/utils"

const ProductGallery = ({images}) => {

    const [src, setSrc] = useState(null)

    useEffect(() => {
        if (images.length > 0) {
            setSrc(images[0].src)
        } else {
            setSrc('no_images.jpeg')
        }

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
                <Box borderRadius={5} overflow='hidden' width={500} height={625}>
                    <Image
                        src={appURL + src}
                        alt={src}
                        width={500}
                        height={625}
                    />
                </Box>
            </Grid>
            <Grid item lg={12}>
                <GalleryButtons state={src} images={images} handleClick={handleClick}/>
            </Grid>
        </Grid>
    )
}

export default ProductGallery