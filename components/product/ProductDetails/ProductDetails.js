import { Box, Grid, Typography } from "@mui/material"
import ProductGallery from "./ProductGallery/ProductGallery"
import ProductInfo from './ProductInfo'
import ReviewItem from "./ReviewItem"

const ProductDetails = ({ product }) => {

    return (
        <Grid container spacing={2}>
            <Grid item lg={6}>
                <ProductGallery images={product.images} />
            </Grid>
            <Grid item lg={6}>
                <ProductInfo product={product} />
            </Grid>
            <Grid item lg={6}>
                <Typography variant="h4" gutterBottom>
                    Description
                </Typography>
                <Typography variant='body1'>
                    {product.description}
                </Typography>
            </Grid>
            <Grid item lg={6}>
                <Typography variant="h4" gutterBottom>
                    Reviews
                </Typography>
                <Box height={400} overflow='scroll'>
                    {
                        product.reviews.length > 0
                        ?
                        product.reviews.map(review => (
                            <ReviewItem key={review.id} review={review} />
                        ))
                        :
                        <Typography variant='h4'>
                            No reviews yet
                        </Typography>
                    }
                </Box>
            </Grid>
        </Grid>
    )
}

export default ProductDetails