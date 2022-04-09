import { Typography, Grid } from "@mui/material"
import MainLayout from "../components/layout/MainLayout"
import Carousel from "react-material-ui-carousel"
import BannerItem from "../components/common/Banner/BannerItem"
import ProductCard from "../components/common/Card/ProductCard/ProductCard"
import { getBanners, getProducts } from "../app/store/actions/async/common"
import { wrapper } from "../app/store"
import { useSelector } from "react-redux"

const Index = () => {

    const banners = useSelector(state => state.banners)
    const products = useSelector(state => state.products.data)

    return(
        <>
            <Carousel sx={{ overflow: 'visible' }}>
                {
                    banners.map( (banner) => <BannerItem key={banner.id} banner={banner} /> )
                }
            </Carousel>
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

Index.getLayout = (page) => {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    )
}