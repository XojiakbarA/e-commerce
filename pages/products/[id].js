import { Box, Grid, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import ProductGallery from "../../components/product/ProductGallery"
import ProductInfo from '../../components/product/ProductInfo'
import { getProduct } from "../../app/store/actions/async/common"
import { wrapper } from "../../app/store"
import MainLayout from "../../components/layout/MainLayout"
import ReviewItem from "../../components/product/ReviewItem"

const Product = () => {

    const product = useSelector(state => state.product)

    return(
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

export const getServerSideProps = wrapper.getServerSideProps(({dispatch}) => async ({params}) => {

    await dispatch(getProduct(params.id))

})

export default Product

Product.getLayout = (page) => {
    return (
        
        <MainLayout>
            {page}
        </MainLayout>
    )
}