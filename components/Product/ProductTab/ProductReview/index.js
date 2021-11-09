import {Grid} from '@mui/material'
import ReviewForm from './ReviewForm'
import ReviewItem from './ReviewItem'

const ProductReview = ({reviews}) => {
    return(
        <Grid container spacing={2}>
            <Grid item lg={6}>
                {
                    reviews.map((review, i) => (
                        <ReviewItem key={i} review={review} />
                    ))
                }
            </Grid>
            <Grid item lg={6}>
                <ReviewForm />
            </Grid>
        </Grid>
    )
}

export default ProductReview