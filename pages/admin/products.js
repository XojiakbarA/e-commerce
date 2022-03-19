import { Grid } from "@mui/material"
import ListAltIcon from '@mui/icons-material/ListAlt'
import AdminLayout from "../../components/layout/AdminLayout/AdminLayout"
import { wrapper } from '../../app/store'
import { getProducts } from '../../app/store/actions/async/admin'
import { useSelector } from "react-redux"
import AdminPageHead from '../../components/common/AdminPageHead'
import DataTable from '../../components/admin/DataTable/DataTable'
import ProductsTableRow from '../../components/admin/DataTable/DataTableRows/ProductsTableRow'
import { useAdminSearch } from '../../app/hooks/useAdminSearch'

const headLabels = [
    { label: 'Published', field: 'published' },
    { label: 'Title', field: 'title' },
    { label: 'Stock', field: 'stock' },
    { label: 'Regular Price', field: 'price' },
    { label: 'Sales Price', field: 'sale_price' },
    { label: 'Rating', field: 'rating' },
    { label: 'Category', field: 'category' },
    { label: 'Brand', field: 'brand' },
    { label: 'Shop', field: 'shop' },
]

const colSpan = (field) => {
    return  field === 'title' ||
            field === 'shop'
            ? 2 : 0
}

function* labelsGenerator() { 
    yield {label: 'By Title', field: 'title'}
    yield {label: 'By Category', field: 'category_title'}
    yield {label: 'By Brand', field: 'brand_title'}
    return {label: 'By Shop', field: 'shop_title'}
}

const Products = () => {

    const products = useSelector(state => state.products.data)
    const meta = useSelector(state => state.products.meta)

    const { label, handleSearch, handleClick } = useAdminSearch(labelsGenerator)

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <AdminPageHead
                    title='Products'
                    titleIcon={<ListAltIcon fontSize='large'/>}
                    onKeyUp={handleSearch}
                    onClick={handleClick}
                    buttonText={label}
                />
            </Grid>
            <Grid item xs={12}>
                <DataTable meta={meta} labels={headLabels} colSpan={colSpan}>
                    {
                        products.map(product => (
                            <ProductsTableRow key={product.id} product={product}/>
                        ))
                    }
                </DataTable>
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