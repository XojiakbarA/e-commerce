import ListAltIcon from '@mui/icons-material/ListAlt'
import AddIcon from '@mui/icons-material/Add'
import ProfileLayout from "../../components/layout/ProfileLayout/ProfileLayout"
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Typography } from '@mui/material'
import AddProductDialog from '../../components/dialogs/AddProductDialog'
import ViewProductDialog from '../../components/dialogs/ViewProductDialog'
import EditProductDialog from '../../components/dialogs/EditProductDialog'
import { wrapper } from "../../app/store"
import ProductList from '../../components/common/List/List'
import ProductListItem from '../../components/vendor/ProductListItem'
import { deleteProduct, deleteProductImage, getProducts } from '../../app/store/actions/async/vendor'
import MainLayout from '../../components/layout/MainLayout'
import ProfilePageHead from '../../components/common/ProfilePageHead'
import ConfirmDialog from '../../components/dialogs/ConfirmDialog'
import { toggleAddProductDialog, toggleDeleteProductDialog, toggleDeleteProductImageDialog } from '../../app/store/actions/dialogActions'

const labels = [ 'Title', 'Image', 'Stock', 'Price', 'Sale Price', 'Rating', '' ]

const Products = () => {

    const dispatch = useDispatch()

    const products = useSelector(state => state.products.data)
    const meta = useSelector(state => state.products.meta)

    const {
        loading, text, prod_id, image_id,
        deleteProductDialog, deleteProductImageDialog
    } = useSelector(state => state.dialog)

    const openAddProductDialog = () => {
        dispatch(toggleAddProductDialog(true))
    }
    const closeDeleteProductDialog = () => {
        dispatch(toggleDeleteProductDialog(false, null, null))
    }
    const closeDeleteProductImageDialog = () => {
        dispatch(toggleDeleteProductImageDialog(false, null, null))
    }
    const handleProductDeleteClick = () => {
        dispatch(deleteProduct(prod_id))
    }
    const handleProductImageDeleteClick = () => {
        dispatch(deleteProductImage(prod_id, image_id))
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <ProfilePageHead
                    title='Products'
                    titleIcon={<ListAltIcon fontSize='large'/>}
                    buttonText='Add Product'
                    buttonIcon={<AddIcon />}
                    onClick={openAddProductDialog}
                />
            </Grid>
            <Grid item xs={12}>
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
                <ConfirmDialog
                    open={deleteProductDialog}
                    content={text}
                    loading={loading}
                    handleCancelClick={closeDeleteProductDialog}
                    handleConfirmClick={handleProductDeleteClick}
                />
                <ConfirmDialog
                    open={deleteProductImageDialog}
                    content={text}
                    loading={loading}
                    handleCancelClick={closeDeleteProductImageDialog}
                    handleConfirmClick={handleProductImageDeleteClick}
                />
            </Grid>
        </Grid>
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

    await dispatch(getProducts(query, cookie))

    const products = getState().products.data

    if (!products) {
        return {
            notFound: true
        }
    }

})

export default Products

Products.getLayout = (page) => {
    return (
        
        <MainLayout>
            <ProfileLayout>
                {page}
            </ProfileLayout>
        </MainLayout>
    )
}