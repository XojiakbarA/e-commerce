import { Grid, Paper, Typography } from "@mui/material"
import ShopBigCard from "../../../components/shop/ShopBigCard"
import { getShop, getShopProducts } from "../../../app/store/actions/async/common"
import { wrapper } from "../../../app/store"
import { useSelector } from "react-redux"
import SearchSidebar from "../../../components/search/SearchSidebar"
import ProductCard from "../../../components/common/Card/ProductCard/ProductCard"
import MyPagination from "../../../components/common/Pagination"
import MainLayout from "../../../components/layout/MainLayout"

const Shop = () => {

    const shop = useSelector(state => state.shop.data)
    const products = useSelector(state => state.products.data)
    const meta = useSelector(state => state.products.meta)

    return (
        <Grid container spacing={2}>
            <Grid item lg={12} xs={12}>
                <ShopBigCard shop={shop} />
            </Grid>
            <Grid item lg={3} display={{xs: 'none', sm: 'block'}}>
                <Paper>
                    <SearchSidebar />
                </Paper>
            </Grid>
            <Grid item lg={9}>
                    <Grid container spacing={2}>
                    {
                        products.length > 0
                        ?
                        products.map((product) => (
                            <Grid item xs={12} lg={4} key={product.id}>
                                <ProductCard product={product} />
                            </Grid>
                        ))
                        :
                        <Grid item xs={12}>
                            <Typography variant='h4'>
                                Not found products
                            </Typography>
                        </Grid>
                    }
                    {
                        meta.last_page > 1 &&
                        <Grid item xs={12}>
                            <MyPagination meta={meta}/>
                        </Grid>
                    }
                    </Grid>
                </Grid>
        </Grid>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(({dispatch}) => async ({query}) => {

    const id = query.id
    await dispatch(getShop(id))
    await dispatch(getShopProducts(id, query))

})

export default Shop

Shop.getLayout = (page) => {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    )
}