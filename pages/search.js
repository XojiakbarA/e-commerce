import { useState } from "react"
import {Grid, Paper, Drawer, Pagination} from "@mui/material"
import SearchPanel from "../components/search/SearchPanel"
import SearchSidebar from "../components/search/SearchSidebar"
import ProductCard from "../components/common/ProductCard"
import { wrapper } from "../redux/store"
import { getSearchResults } from "../redux/actions/main"
import { useSelector } from "react-redux"


const brands = [
    {id: 1, title: 'Brand 1'},
    {id: 2, title: 'Brand 2'},
    {id: 3, title: 'Brand 3'},
    {id: 4, title: 'Brand 4'},
]

const Search = ({query}) => {

    const products = useSelector(state => state.products)

    const [sort, setSort] = useState('new')
    const [view, setView] = useState('grid')
    const [sidebar, setSidebar] = useState(false)

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
                    />
                </Grid>
                <Grid item lg={3} display={{xs: 'none', sm: 'block'}}>
                    <Paper>
                        <SearchSidebar
                            brands={brands}
                        />
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
                    <Pagination count={5} size='large' color='primary' sx={{my: 2}} />
                </Grid>
            </Grid>
            <Drawer
                anchor='left'
                open={sidebar}
                onClose={handleSidebarClose}
            >
                <SearchSidebar brands={brands} />
            </Drawer>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({query}) => {

    const title = query.title
    await getSearchResults(title, store.dispatch)

    return {
        props: {
            query: title
        }
    }

})

export default Search