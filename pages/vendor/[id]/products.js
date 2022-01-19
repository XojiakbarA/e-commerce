import ListAltIcon from '@mui/icons-material/ListAlt'
import AddIcon from '@mui/icons-material/Add'
import ProfileLayout from "../../../components/layout/ProfileLayout/ProfileLayout"
import ProfileTitle from "../../../components/profile/ProfileTitle"
import { useSelector } from 'react-redux'
import { getShopProducts } from '../../../redux/actions'
import { Grid, Typography } from '@mui/material'
import AddProductDialog from '../../../components/dialogs/AddProductDialog'
import ViewProductDialog from '../../../components/dialogs/ViewProductDialog'
import EditProductDialog from '../../../components/dialogs/EditProductDialog'
import DeleteProductDialog from '../../../components/dialogs/DeleteProductDialog'
import { wrapper } from "../../../redux/store"
import { useRouter } from 'next/router'
import ProductList from '../../../components/common/List/List'
import ProductListItem from '../../../components/vendor/ProductListItem'
import { useToggle } from '../../../app/hooks/useToggle'

const labels = [ 'Title', 'Image', 'Stock', 'Price', 'Sale Price', 'Rating', '' ]

const Products = () => {

    const router = useRouter()

    const products = useSelector(state => state.products.data)
    const meta = useSelector(state => state.products.meta)

    const { openAddProductDialog } = useToggle()

    const handlePageChange = (e, p) => {
        router.push({
            query: { ...router.query, page: p }
        })
    }

    return (
        <ProfileLayout>
            <ProfileTitle
                title='Products'
                titleIcon={<ListAltIcon fontSize='large'/>}
                buttonText='Add Product'
                buttonIcon={<AddIcon />}
                onClick={openAddProductDialog}
            />
            {
                products.length > 0
                ?
                <ProductList labels={labels} meta={meta} onChange={handlePageChange}>
                    {
                        products.map(product => (
                            <Grid item xs={12} key={product.id}>
                                <ProductListItem product={product}/>
                            </Grid>
                        ))
                    }
                </ProductList>
                :
                <Typography variant='h4'>
                    No products yet
                </Typography>
            }
            <AddProductDialog/>
            <ViewProductDialog/>
            <EditProductDialog/>
            <DeleteProductDialog/>
        </ProfileLayout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(({dispatch}) => async ({params, query}) => {

    query.count = query.count ?? 5

    await dispatch(getShopProducts(params.id, query))

})

export default Products