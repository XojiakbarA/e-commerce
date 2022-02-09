import { useState, useRef, useEffect } from 'react'
import { Grid } from "@mui/material"
import ListAltIcon from '@mui/icons-material/ListAlt'
import AdminLayout from "../../components/layout/AdminLayout/AdminLayout"
import ProductsTable from "../../components/admin/products/ProductsTable"
import { wrapper } from '../../app/store'
import { getProducts } from '../../app/store/actions/async/admin'
import { useSelector } from "react-redux"
import { useRouter } from "next/router"
import AdminPageHead from '../../components/common/AdminPageHead'

function* labelsGenerator() { 
    yield {label: 'By Title', field: 'title'}
    yield {label: 'By Category', field: 'category_title'}
    yield {label: 'By Brand', field: 'brand_title'}
    return {label: 'By Shop', field: 'shop_title'}
}

const Products = () => {

    const router = useRouter()

    const products = useSelector(state => state.products.data)
    const meta = useSelector(state => state.products.meta)

    const labels = useRef(labelsGenerator())

    const [ filterBy, setFilterBy ] = useState(null)

    useEffect(() => {
        setFilterBy(labels.current.next())
    }, [])

    const handleSearch = (e) => {
        const value = e.target.value
        const field = filterBy.value.field
        const query = {}
        query[field] = value

        if (e.keyCode === 13) {
            if (!value) return
            router.push({query})
        }
    }

    const handleClick = () => {
        if (filterBy.done) labels.current = labelsGenerator()
        setFilterBy(labels.current.next())
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <AdminPageHead
                    title='Products'
                    titleIcon={<ListAltIcon fontSize='large'/>}
                    onKeyUp={handleSearch}
                    onClick={handleClick}
                    buttonText={filterBy?.value?.label}
                />
            </Grid>
            <Grid item xs={12}>
                <ProductsTable products={products} meta={meta}/>
            </Grid>
        </Grid>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(({dispatch}) => async ({query, req}) => {

    const cookie = req.headers.cookie

    query.count = query.count ?? 5
    query.page = query.page ?? 1

    await dispatch(getProducts(query, cookie))

})

export default Products

Products.getLayout = (page) => {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}