import { Grid } from "@mui/material"
import ListAltIcon from '@mui/icons-material/ListAlt'
import PageTitle from "../../components/common/PageTitle"
import AdminLayout from "../../components/layout/AdminLayout/AdminLayout"
import ProductsTable from "../../components/admin/products/ProductsTable"
import { wrapper } from '../../app/store'
import { getProducts } from '../../app/store/actions/async/admin'
import { useSelector } from "react-redux"
import { useRouter } from "next/router"

const Products = () => {

    const router = useRouter()

    const products = useSelector(state => state.products.data)
    const meta = useSelector(state => state.products.meta)

    const handleSearch = (e) => {
        const value = e.target.value
        if (e.keyCode === 13) {
            if (!value) {
                return
            }
            router.push({
                query: { ...router.query, title: value }
            })
        }
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <PageTitle
                    title='Products'
                    titleIcon={<ListAltIcon fontSize="large"/>}
                    onKeyUp={handleSearch}
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