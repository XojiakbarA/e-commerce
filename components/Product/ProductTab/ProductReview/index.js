import {Grid, Typography, Box} from '@mui/material'
import ReviewForm from './ReviewForm'
import ReviewItem from './ReviewItem'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

const ProductReview = ({reviews}) => {

    return (
            <Grid container spacing={2}>
                <Grid item lg={6} height={400} overflow='scroll'>
                    <Box >
                    {
                        reviews.length == 0
                        ?
                        <Typography variant='h4'>
                            No reviews yet
                        </Typography>
                        :
                        reviews.map((review, i) => (
                            <ReviewItem key={i} review={review} />
                        ))
                    }
                    </Box>
                </Grid>
                <Grid item lg={6}>
                    <ReviewForm />
                </Grid>
            </Grid>
    )
}

export default ProductReview