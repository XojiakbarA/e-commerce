import { Grid, Typography } from '@mui/material'
import ListAltIcon from '@mui/icons-material/ListAlt'
import AddIcon from '@mui/icons-material/Add'
import MainLayout from '../../components/layout/MainLayout'
import ProfileLayout from "../../components/layout/ProfileLayout/ProfileLayout"
import ProfilePageHead from '../../components/common/ProfilePageHead'
import ProductList from '../../components/common/List/List'
import ProductListItem from '../../components/vendor/ProductListItem'
import ConfirmDialog from '../../components/dialogs/ConfirmDialog'
import ProductDialog from '../../components/dialogs/ProductDialog'
import ProductForm from '../../components/forms/ProductForm'
import ProductDetails from '../../components/product/ProductDetails/ProductDetails'
import { useDispatch, useSelector } from 'react-redux'
import { wrapper } from "../../app/store"
import { createProduct, deleteProduct, deleteProductImage, editProduct, getProducts } from '../../app/store/actions/async/vendor'
import { toggleAddProductDialog, toggleDeleteProductDialog, toggleDeleteProductImageDialog, toggleEditProductDialog, toggleViewProductDialog } from '../../app/store/actions/dialogActions'
import { appendToFormData } from '../../utils/utils'

const labels = [ 'Title', 'Image', 'Stock', 'Price', 'Sale Price', 'Rating', '' ]

const Products = () => {

    const dispatch = useDispatch()

    const products = useSelector(state => state.products.data)
    const meta = useSelector(state => state.products.meta)

    const {
        loading, text, prod_id, image_id,
        addProductDialog, viewProductDialog, editProductDialog,
        deleteProductDialog, deleteProductImageDialog
    } = useSelector(state => state.dialog)

    const product = useSelector(state => state.products.data.find(item => item.id === prod_id))

    const openAddProductDialog = () => {
        dispatch(toggleAddProductDialog(true))
    }
    const closeAddProductDialog = () => {
        dispatch(toggleAddProductDialog(false))
    }
    const closeViewProductDialog = () => {
        dispatch(toggleViewProductDialog(false, null, null))
    }
    const closeEditProductDialog = () => {
        dispatch(toggleEditProductDialog(false, null, null))
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

    const handleCreateSubmit = (data, { setSubmitting }) => {
        const formData = appendToFormData(data)
        dispatch(createProduct(formData, setSubmitting))
    }
    const handleEditSubmit = (data, {setSubmitting}) => {
        const formData = appendToFormData(data)
        dispatch(editProduct(prod_id, formData, setSubmitting))
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
                <ProductDialog
                    open={addProductDialog}
                    onClose={closeAddProductDialog}
                    title='Add Product'
                >
                    <ProductForm onSubmit={handleCreateSubmit}/>
                </ProductDialog>
                <ProductDialog
                    open={viewProductDialog}
                    onClose={closeViewProductDialog}
                    title='View Product'
                >
                    {viewProductDialog && <ProductDetails product={product}/>}
                </ProductDialog>
                <ProductDialog
                    open={editProductDialog}
                    onClose={closeEditProductDialog}
                    title='Edit Product'
                >
                    <ProductForm onSubmit={handleEditSubmit} product={product}/>
                </ProductDialog>
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
    const isVendor = user?.role == 'vendor'

    if (!user) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }
    if (!isVendor) {
        return {
            notFound: true
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