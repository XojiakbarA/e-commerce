import {Grid} from '@mui/material'
import ProductReviewForm from './ProductReviewForm'
import ProductReviewItem from './ProductReviewItem'

const ProductReview = ({reviews}) => {
    return(
        <Grid container spacing={2}>
            <Grid item lg={6}>
                {
                    reviews.map((review, i) => (
                        <ProductReviewItem key={i} review={review} />
                    ))
                }
            </Grid>
            <Grid item lg={6}>
                <ProductReviewForm />
            </Grid>
        </Grid>
    )
}

export default ProductReview