import { Grid, Rating, Typography, TextField, Button, CircularProgress, FormHelperText } from "@mui/material"
import SendIcon from '@mui/icons-material/Send'
import StarBorder from "@mui/icons-material/StarBorder"
import { useReview } from "../../app/hooks/useFormik/useReview"

const ReviewForm = ({ product_id }) => {

    const {
        handleSubmit, handleChange, handleBlur, getFieldProps,
        values, touched, errors, isSubmitting
    } = useReview(product_id)

    return(
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item lg={12}>
                    <Typography variant='body1'>
                        Your Rating
                    </Typography>
                    <Rating
                        name='rating'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={Number(values.rating)}
                        emptyIcon={
                            <StarBorder
                                fontSize="inherit"
                                color={touched.rating && errors.rating ? 'error' : 'inherit'}
                            />
                        }
                    />
                    <FormHelperText error={true}>{touched.rating && errors.rating}</FormHelperText>
                </Grid>
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
                </Grid>
                <Grid item lg={12}>
                    <Button
                        sx={{float: 'right'}}
                        variant='contained'
                        size='small'
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