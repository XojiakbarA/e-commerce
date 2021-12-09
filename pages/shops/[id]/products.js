import { Grid, Pagination, PaginationItem, Paper, Typography } from "@mui/material"
import ShopBigCard from "../../../components/shop/ShopBigCard"
import { getShop, getShopProducts } from "../../../redux/actions"
import { wrapper } from "../../../redux/store"
import { useSelector } from "react-redux"
import SearchSidebar from "../../../components/search/SearchSidebar"
import ProductCard from "../../../components/common/ProductCard"

const Shop = () => {

    const shopData = useSelector(state => state.shop)
    const shop = shopData.data
    const productsData = useSelector(state => state.products)
    const products = productsData.data
    const lastPage = productsData.meta.last_page

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
                    {!products.length
                        ?
                            <Grid item>
                                <Typography variant='h2'>
                                    Not found products
                                </Typography>
                            </Grid>
                        :
                        products.map((product) => (
                            <Grid item xs={12} lg={4} key={product.id}>
                                <ProductCard product={product} />
                            </Grid>
                        ))
                    }
                    </Grid>
                    {lastPage == 1 ? null :
                        <Pagination
                            size='large' 
                            color='primary'
                            sx={{my: 2}}
                            page={currentPage}
                            count={lastPage}
                            onChange={ (e, p) => handlePageChange(e, p) }
                            renderItem={item => (    
                                <PaginationItem
                                    {...item}
                                />
                            )}
                        />
                        }
                </Grid>
        </Grid>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({query}) => {

    const id = query.id
    await store.dispatch(getShop(id))
    await store.dispatch(getShopProducts(id, query))

})

export default Shop