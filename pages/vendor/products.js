import ListAltIcon from '@mui/icons-material/ListAlt'
import AddIcon from '@mui/icons-material/Add'
import ProfileLayout from "../../components/layout/ProfileLayout/ProfileLayout"
import { useSelector } from 'react-redux'
import { Grid, Typography } from '@mui/material'
import AddProductDialog from '../../components/dialogs/AddProductDialog'
import ViewProductDialog from '../../components/dialogs/ViewProductDialog'
import EditProductDialog from '../../components/dialogs/EditProductDialog'
import { wrapper } from "../../app/store"
import ProductList from '../../components/common/List/List'
import ProductListItem from '../../components/vendor/ProductListItem'
import { useToggle } from '../../app/hooks/useToggle'
import { getProducts } from '../../app/store/actions/async/vendor'
import MainLayout from '../../components/layout/MainLayout'
import ProfilePageHead from '../../components/common/ProfilePageHead'
import ConfirmDialog from '../../components/dialogs/ConfirmDialog'
import { useProduct } from '../../app/hooks/useFormik/useProduct'

const labels = [ 'Title', 'Image', 'Stock', 'Price', 'Sale Price', 'Rating', '' ]

const Products = () => {

    const products = useSelector(state => state.products.data)
    const meta = useSelector(state => state.products.meta)

    const {
        openAddProductDialog,
        deleteProductDialog, closeDeleteProductDialog,
        deleteProductImageDialog, closeDeleteProductImageDialog } = useToggle()

    const { isOpen, text, payload } = deleteProductDialog

    const { isSubmitting, handleDeleteClick, handleDeleteImageClick } = useProduct(payload)

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
                    open={isOpen}
                    content={text}
                    loading={isSubmitting}
                    handleCancelClick={closeDeleteProductDialog}
                    handleConfirmClick={handleDeleteClick}
                />
                <ConfirmDialog
                    open={deleteProductImageDialog.isOpen}
                    content={deleteProductImageDialog.text}
                    loading={isSubmitting}
                    handleCancelClick={closeDeleteProductImageDialog}
                    handleConfirmClick={e => handleDeleteImageClick(deleteProductImageDialog.product_id, deleteProductImageDialog.image_id)}
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