import { useState } from "react"
import {Grid, Paper, Drawer, Pagination, PaginationItem} from "@mui/material"
import SearchPanel from "../components/search/SearchPanel"
import SearchSidebar from "../components/search/SearchSidebar"
import ProductCard from "../components/common/ProductCard"
import { wrapper } from "../redux/store"
import { getSearchResults } from "../redux/actions/main"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"

const Search = ({title}) => {

    const router = useRouter()
    const data = useSelector(state => state.products)
    const products = data.data
    const meta = data.meta
    const total = meta.total
    const currentPage = meta.current_page
    const lastPage = meta.last_page

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
            pathname: '/search',
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
                        total={total}
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
                        products.map((product, i) => (
                            <Grid item xs={12} lg={view == 'grid' ? 4 : 12} key={i}>
                                <ProductCard product={product} view={view} />
                            </Grid>
                        ))
                    }
                    </Grid>
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

export const getServerSideProps = wrapper.getServerSideProps(store => async ({query}) => {

    const title = query.title || 'all'
    const page = query.page || 1
    const cat_id = query.cat_id || null
    const sub_cat_id = query.sub_cat_id || null
    const sort = query.sort || 'new'
    const price_min = query.price_min || 0
    const price_max = query.price_max || 0
    await getSearchResults(title, page, cat_id, sub_cat_id, sort, price_min, price_max, store.dispatch)

    return {
        props: {
            title,
        }
    }

})

export default Search