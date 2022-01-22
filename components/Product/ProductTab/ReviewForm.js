import { Grid, Rating, Typography, TextField, Button, CircularProgress } from "@mui/material"
import SendIcon from '@mui/icons-material/Send'
import { useSelector } from "react-redux"
import { useReview } from "../../../app/hooks/useFormik/useReview"

const ReviewForm = () => {

    const user = useSelector(state => state.user)

    const {
        handleSubmit, handleChange, handleBlur, getFieldProps,
        values, touched, errors, isSubmitting
    } = useReview()

    return(
        <form onSubmit={handleSubmit}>
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
                <Rating
                    name='rating'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={Number(values.rating)}
                />
            </Grid>
            {
                !user &&
                <Grid item lg={12}>
                    <TextField
                        label='Name'
                        size='small'
                        error={ touched.name && Boolean(errors.name) }
                        helperText={ touched.name && errors.name }
                        { ...getFieldProps('name') }
                    />
                </Grid>
            }
            <Grid item lg={12}>
                <TextField
                    label="Your Review"
                    multiline
                    rows={5}
                    fullWidth
                    error={ touched.text && Boolean(errors.text) }
                    helperText={ touched.text && errors.text }
                    { ...getFieldProps('text') }
                />
                <Button
                    variant='contained'
                    sx={{my: 2}}
                    type='submit'
                    endIcon={
                        isSubmitting
                        ?
                        <CircularProgress color='inherit' size={20} />
                        :
                        <SendIcon />
                    }
                    disabled={isSubmitting}
                >
                    Submit
                </Button>
            </Grid>
        </Grid>
        </form>
    )
}

export default ReviewForm