import { Grid } from "@mui/material"
import { useSelector } from "react-redux"
import ProductGallery from "../../components/product/ProductGallery"
import ProductInfo from '../../components/product/ProductInfo'
import ProductTab from "../../components/product/ProductTab/ProductTab"
import { getProduct } from "../../app/store/actions/async/common"
import { getReviews } from "../../app/store/actions/async/user"
import { wrapper } from "../../app/store"

const Product = () => {

    const product = useSelector(state => state.product)
    const reviews = useSelector(state => state.reviews)

    return(
        <Grid container spacing={2}>
            <Grid item lg={6}>
                <ProductGallery images={product.images} />
            </Grid>
            <Grid item lg={6}>
                <ProductInfo product={product} />
            </Grid>
            <Grid item lg={12}>
                <ProductTab description={product.description} reviews={reviews}/>
            </Grid>
        </Grid>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(({dispatch}) => async ({params}) => {

    await dispatch(getProduct(params.id))
    await dispatch(getReviews(params.id))

})

export default Product