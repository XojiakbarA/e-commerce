import { Typography, Grid } from "@mui/material"
import Banner from "../components/index/Banner"
import ProductCard from "../components/common/ProductCard"
import { getBanners, getNewProducts } from "../redux/actions/main"
import { wrapper } from "../redux/store"
import { useSelector } from "react-redux"

const Index = () => {

    const products = useSelector(state => state.products)

    return(
        <>
            <Banner />
            <Typography variant='h3' gutterBottom>
                New Products
            </Typography>
            <Grid container spacing={2}>
                {
                    products.map((product, i) => (
                        <Grid item xs={12} lg={3} key={i}>
                            <ProductCard product={product} />
                        </Grid>
                    ))
                }
            </Grid>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async () => {

    await getBanners(store.dispatch)
    await getNewProducts(store.dispatch)

})

export default Index