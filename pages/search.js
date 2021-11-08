import { useState } from "react"
import {Grid, Paper, Drawer} from "@mui/material"
import SearchPanel from "../components/SearchPanel/SearchPanel"
import ProductList from "../components/Product/ProductList/ProductList"
import SearchSidebar from "../components/SearchSidebar/SearchSidebar"

const products = {
    items: [
        {
            id: 1, title: 'Product 1', price: 60, rating: 2, img: 'images/products/product1.png'
        },
        {
            id: 2, title: 'Product 2', price: 100, rating: 3, img: 'images/products/product2.png'
        },
        {
            id: 3, title: 'Product 3', price: 220, rating: 4, img: 'images/products/product3.png'
        },
        {
            id: 4, title: 'Product 4', price: 40, rating: 4, img: 'images/products/product4.png'
        },
        {
            id: 5, title: 'Product 5', price: 180, rating: 5, img: 'images/products/product5.png'
        },
        {
            id: 6, title: 'Product 6', price: 50, rating: 3, img: 'images/products/product6.png'
        },
        {
            id: 7, title: 'Product 7', price: 70, rating: 4, img: 'images/products/product7.png'
        },
        {
            id: 8, title: 'Product 8', price: 200, rating: 5, img: 'images/products/product8.png'
        }
    ]
}
const categories = [
    {id: 1, title: 'Category 1'},
    {id: 2, title: 'Category 2'},
    {id: 3, title: 'Category 3'},
    {id: 4, title: 'Category 4'},
    {id: 5, title: 'Category 5'},
    {id: 6, title: 'Category 6'}
]
const brands = [
    {id: 1, title: 'Brand 1'},
    {id: 2, title: 'Brand 2'},
    {id: 3, title: 'Brand 3'},
    {id: 4, title: 'Brand 4'},
]

const Search = () => {

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
                            categories={categories}
                            brands={brands}
                        />
                    </Paper>
                </Grid>
                <Grid item lg={9}>
                    <ProductList
                        products={products}
                        view={view}
                    />
                </Grid>
            </Grid>
            <Drawer
                anchor='left'
                open={sidebar}
                onClose={handleSidebarClose}
            >
                <SearchSidebar categories={categories} brands={brands} />
            </Drawer>
        </>
    )
}

export default Search