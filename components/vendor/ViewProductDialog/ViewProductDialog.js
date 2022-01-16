import { Box, Dialog, DialogContent, DialogTitle, Grid, IconButton, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'
import ProductGallery from "../../product/ProductGallery"
import ProductInfo from "../../product/ProductInfo"
import { useDispatch, useSelector } from "react-redux"
import { getReviews, toggleViewProductDialog } from "../../../redux/actions"
import { useEffect } from "react"
import ReviewItem from "../../product/ProductTab/ReviewItem"

const ViewProductDialog = () => {

    const dispatch = useDispatch()

    const viewProductDialog = useSelector(state => state.toggle.viewProductDialog)
    const product = useSelector(state => state.product)
    const reviews = useSelector(state => state.reviews.data)
    const reviewsLoading = useSelector(state => state.reviews.isLoading)
    const isLoading = useSelector(state => state.toggle.isLoading)

    const closeViewProductDialog = () => {
        dispatch(toggleViewProductDialog(false))
    }

    useEffect(() => {
        if (viewProductDialog, product.id) {
            dispatch(getReviews(product.id))
        }
    }, [dispatch, product.id, viewProductDialog])

    return (
        <Dialog open={viewProductDialog} onClose={closeViewProductDialog} fullWidth maxWidth='lg'>
            <DialogTitle sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Typography variant="button" fontSize={20}>
                    {product.title}
                </Typography>
                <IconButton onClick={closeViewProductDialog}>
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent>
            {
                isLoading
                ?
                null
                :
                <Grid container spacing={2}>
                    <Grid item lg={6}>
                        <ProductGallery images={product.images}/>
                    </Grid>
                    <Grid item lg={6}>
                        <ProductInfo product={product} />
                    </Grid>
                    <Grid item lg={6}>
                        <Typography variant='h4'>
                            Description
                        </Typography>
                        <Typography variant='body1'>
                            {product.description}
                        </Typography>
                    </Grid>
                    <Grid item lg={6}>
                        <Typography variant='h4'>
                            Reviews
                        </Typography>
                        {
                            reviewsLoading
                            ?
                                null
                            :
                            <Box height={400} overflow='scroll'>
                                {
                                    reviews.length === 0
                                    ?
                                    <Typography variant='h4'>
                                        No reviews yet
                                    </Typography>
                                    :
                                    reviews.map((review) => (
                                        <ReviewItem key={review.id} review={review} />
                                    ))
                                }
                            </Box>
                        }
                    </Grid>
                </Grid>
            }
            </DialogContent>
        </Dialog>
    )
}

export default ViewProductDialog