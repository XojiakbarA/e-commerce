import ListAltIcon from '@mui/icons-material/ListAlt'
import AddIcon from '@mui/icons-material/Add'
import ProfileLayout from "../../../components/layout/ProfileLayout/ProfileLayout"
import ProfileTitle from "../../../components/profile/ProfileTitle"
import { useSelector } from 'react-redux'
import { Grid, Typography } from '@mui/material'
import AddProductDialog from '../../../components/dialogs/AddProductDialog'
import ViewProductDialog from '../../../components/dialogs/ViewProductDialog'
import EditProductDialog from '../../../components/dialogs/EditProductDialog'
import DeleteProductDialog from '../../../components/dialogs/DeleteProductDialog'
import { wrapper } from "../../../app/store"
import ProductList from '../../../components/common/List/List'
import ProductListItem from '../../../components/vendor/ProductListItem'
import { useToggle } from '../../../app/hooks/useToggle'
import { getProducts } from '../../../app/store/actions/async/vendor'

const labels = [ 'Title', 'Image', 'Stock', 'Price', 'Sale Price', 'Rating', '' ]

const Products = () => {

    const products = useSelector(state => state.products.data)
    const meta = useSelector(state => state.products.meta)

    const { openAddProductDialog } = useToggle()

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
                <ProductList labels={labels} meta={meta}>
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

export const getServerSideProps = wrapper.getServerSideProps(({dispatch, getState}) => async ({params, query, req}) => {

    const user = getState().user

    if (!user) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    const cookie = req?.headers.cookie

    await dispatch(getProducts(params.id, query, cookie))

    const products = getState().products.data

    if (!products) {
        return {
            notFound: true
        }
    }

})

export default Products