import { useState } from "react"
import {Grid, Paper, Drawer, Typography} from "@mui/material"
import SearchPanel from "../components/search/SearchPanel"
import SearchSidebar from "../components/search/SearchSidebar"
import ProductCard from "../components/common/ProductCard"
import { wrapper } from "../app/store"
import { getProducts } from "../app/store/actions/async/common"
import { useSelector } from "react-redux"
import MyPagination from "../components/common/Pagination"
import MainLayout from "../components/layout/MainLayout"

const Search = ({title}) => {

    const products = useSelector(state => state.products.data)
    const meta = useSelector(state => state.products.meta)

    const [listView, setListView] = useState(false)
    const [sidebar, setSidebar] = useState(false)

    function handleViewClick(bool) {
        setListView(bool)
    }

    function handleSidebarClick() {
        setSidebar(prevState => !prevState)
    }

    function handleSidebarClose() {
        setSidebar(false)
    }

    return(
        <>
            <Grid container spacing={2}>
                <Grid item lg={12} xs={12}>
                    <SearchPanel
                        listView={listView}
                        handleViewClick={handleViewClick}
                        handleSidebarClick={handleSidebarClick}
                        title={title}
                        total={meta.total}
                    />
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
                            <Grid item xs={12} lg={listView ? 12 : 4} key={product.id}>
                                <ProductCard product={product} listView={listView} />
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
            <Drawer
                anchor='left'
                open={sidebar}
                onClose={handleSidebarClose}
            >
                <SearchSidebar />
            </Drawer>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(({dispatch}) => async ({query}) => {

    await dispatch(getProducts(query))

    return {
        props: {
            title: query.title ?? ''
        }
    }

})

export default Search

Search.getLayout = (page) => {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    )
}