import { Typography, Grid } from "@mui/material"
import Banner from "../components/index/Banner"
import ProductCard from "../components/common/ProductCard"
import { getBanners, getProducts } from "../redux/actions/async/component"
import { wrapper } from "../redux/store"
import { useSelector } from "react-redux"

const Index = () => {

    const products = useSelector(state => state.products.data)

    return(
        <>
            <Banner />
            <Typography variant='h3' gutterBottom>
                New Products
            </Typography>
            <Grid container spacing={2}>
                {
                    products.map(product => (
                        <Grid item xs={12} lg={3} key={product.id}>
                            <ProductCard product={product} />
                        </Grid>
                    ))
                }
            </Grid>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(({dispatch}) => async () => {

    await dispatch(getBanners())
    await dispatch(getProducts({count: 8}))

})

export default Index