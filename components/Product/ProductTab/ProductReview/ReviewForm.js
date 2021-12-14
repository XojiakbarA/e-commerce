import { Grid, Rating, Typography, TextField, Button, CircularProgress } from "@mui/material"
import SendIcon from '@mui/icons-material/Send'
import { reviewValidationSchema } from '../../../../utils/validate'
import { useFormik } from "formik"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { userReview, getReviews } from "../../../../redux/actions"

const ReviewForm = () => {

    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.toggle.isLoading)
    const productId = useSelector(state => state.product.id)
    const user = useSelector(state => state.user)

    const formik = useFormik({
        initialValues: {
            rating: '0',
            name: user ? user.name : '',
            text: '',
            product_id: productId
        },
        validationSchema: reviewValidationSchema,
        onSubmit: async (data, {resetForm}) => {
            await dispatch(userReview(data))
            await dispatch(getReviews(productId))
            resetForm()
        }
    })

    return(
        <form onSubmit={formik.handleSubmit}>
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
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={Number(formik.values.rating)}
                />
            </Grid>
            {
                user
                ?
                null
                :
                <Grid item lg={12}>
                    <TextField
                        label='Name'
                        size='small'
                        error={ formik.touched.name && Boolean(formik.errors.name) }
                        helperText={ formik.touched.name && formik.errors.name }
                        { ...formik.getFieldProps('name') }
                    />
                </Grid>
            }
            <Grid item lg={12}>
                <TextField
                    label="Your Review"
                    multiline
                    rows={5}
                    fullWidth
                    error={ formik.touched.text && Boolean(formik.errors.text) }
                    helperText={ formik.touched.text && formik.errors.text }
                    { ...formik.getFieldProps('text') }
                />
                <Button
                    variant='contained'
                    sx={{my: 2}}
                    type='submit'
                    endIcon={
                        isLoading
                        ?
                        <CircularProgress color='inherit' size={20} />
                        :
                        <SendIcon />
                    }
                    disabled={isLoading}
                >
                    Submit
                </Button>
            </Grid>
        </Grid>
        </form>
    )
}

export default ReviewForm