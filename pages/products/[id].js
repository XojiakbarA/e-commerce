import { Grid } from "@mui/material"
import { connect } from "react-redux"
import ProductGallery from "../../components/product/ProductGallery"
import ProductInfo from '../../components/product/ProductInfo'
import ProductTab from "../../components/product/ProductTab/ProductTab"
import { getProduct } from "../../redux/actions"
import { wrapper } from "../../redux/store"

const Product = ({product}) => {
    return(
        <Grid container spacing={2}>
            <Grid item lg={6}>
                <ProductGallery images={product.images} />
            </Grid>
            <Grid item lg={6}>
                <ProductInfo product={product} />
            </Grid>
            <Grid item lg={12}>
                <ProductTab description={product.desc} reviews={product.reviews} />
            </Grid>
        </Grid>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({params}) => {

    const id = params.id
    await getProduct(id, store.dispatch)

})

const mapStateToProps = (state) => ({
    product: state.product
})

export default connect(mapStateToProps)(Product)