import { Typography } from "@mui/material"


const ProductDescription = ({description}) => {
    return(
        <Typography variant='body1'>
            {description}
        </Typography>
    )
}

export default ProductDescription