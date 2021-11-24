import { useState } from "react"
import {Grid, Paper, Drawer, Pagination, PaginationItem} from "@mui/material"
import SearchPanel from "../components/search/SearchPanel"
import SearchSidebar from "../components/search/SearchSidebar"
import ProductCard from "../components/common/ProductCard"
import Link from "next/link"
import { wrapper } from "../redux/store"
import { getSearchResults } from "../redux/actions/main"
import { useSelector } from "react-redux"
import router from "next/router"

const Search = ({title}) => {

    const products = useSelector(state => state.products.data)
    const total = useSelector(state => state.products.meta.total)
    const meta = useSelector(state => state.products.meta)

    const [sort, setSort] = useState('new')
    const [view, setView] = useState('grid')
    const [sidebar, setSidebar] = useState(false)
    const [page, setPage] = useState(1)

    function handleSortChange(e) {
        setSort(e.target.value)
    }

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
        router.push('/search?title=' + title + '&page=' + p)
    }

    return(
        <>
            <Grid container spacing={2}>
                <Grid item lg={12} xs={12}>
                    <SearchPanel
                        sort={sort}
                        view={view}
                        handleSortChange={handleSortChange}
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
                        page={meta.current_page}
                        count={meta.last_page}
                        onChange={handlePageChange}
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

    const title = query.title
    const page = query.page ? query.page : 1
    await getSearchResults(title, page, store.dispatch)

    return {
        props: {
            title,
            page
        }
    }

})

export default Search