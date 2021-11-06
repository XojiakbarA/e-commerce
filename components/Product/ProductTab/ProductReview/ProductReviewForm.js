import { Grid, Rating, Typography, TextField, Button } from "@mui/material"

import SendIcon from '@mui/icons-material/Send'

const ProductReviewForm = () => {
    return(
        <Grid container spacing={2}>
            <Grid item lg={12}>
                <Typography variant='h4'>
                    Write a Review for this product
                </Typography>
            </Grid>
            <Grid item lg={12}>
                <Typography variant='h6'>
                    Your Rating
                </Typography>
                <Rating name='user-rating' />
            </Grid>
            <Grid item lg={12}>
                <TextField
                    id="outlined-multiline-flexible"
                    label="Your Review"
                    multiline
                    rows={5}
                    fullWidth
                />
                <Button variant='contained' endIcon={<SendIcon />} sx={{my: 2}}>Submit</Button>
            </Grid>
        </Grid>
    )
}

export default ProductReviewForm