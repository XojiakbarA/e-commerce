import { useState } from "react"
import {Grid, Paper, Drawer, Pagination, Typography} from "@mui/material"
import SearchPanel from "../components/search/SearchPanel"
import SearchSidebar from "../components/search/SearchSidebar"
import ProductCard from "../components/common/ProductCard"
import { wrapper } from "../redux/store"
import { getProducts } from "../redux/actions"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"

const Search = ({title}) => {

    const router = useRouter()
    const products = useSelector(state => state.products.data)
    const meta = useSelector(state => state.products.meta)

    const [view, setView] = useState('grid')
    const [sidebar, setSidebar] = useState(false)

    function handleViewClick(e, newView) {
        setView(newView)
    }

    function handleSidebarClick() {
        setSidebar(!sidebar)
    }

    function handleSidebarClose() {
        setSidebar(false)
    }

    function handlePageChange(e, p) {
        router.push({
            query: { ...router.query, page: p }
        })
    }

    return(
        <>
            <Grid container spacing={2}>
                <Grid item lg={12} xs={12}>
                    <SearchPanel
                        view={view}
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
                            <Grid item xs={12} lg={view == 'grid' ? 4 : 12} key={product.id}>
                                <ProductCard product={product} view={view} />
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
                            <Pagination
                                color='primary'
                                sx={{my: 2}}
                                page={meta.current_page}
                                count={meta.last_page}
                                onChange={ (e, p) => handlePageChange(e, p) }
                            />
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