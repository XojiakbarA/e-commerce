import ListAltIcon from '@mui/icons-material/ListAlt'
import AddIcon from '@mui/icons-material/Add'
import ProfileLayout from "../../../components/layout/ProfileLayout/ProfileLayout"
import ProfileTitle from "../../../components/profile/ProfileTitle"
import ProductList from '../../../components/vendor/ProductList/ProductList'
import { useDispatch, useSelector } from 'react-redux'
import { getShopProducts, toggleAddProductDialog } from '../../../redux/actions'
import { Typography } from '@mui/material'
import AddProductDialog from '../../../components/vendor/AddProductDialog/AddProductDialog'
import ViewProductDialog from '../../../components/vendor/ViewProductDialog/ViewProductDialog'
import EditProductDialog from '../../../components/vendor/EditProductDialog/EditProductDialog'
import DeleteProductDialog from '../../../components/vendor/DeleteProductDialog/DeleteProductDialog'
import { wrapper } from "../../../redux/store"

const labels = [ 'Title', 'Image', 'Stock', 'Price', 'Sale Price', 'Rating', '' ]

const Products = () => {

    const dispatch = useDispatch()

    const products = useSelector(state => state.products.data)

    const openAddProductDialog = () => {
        dispatch(toggleAddProductDialog(true))
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
                <ProductList labels={labels} products={products}/>
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

export const getServerSideProps = wrapper.getServerSideProps(({dispatch}) => async ({params}) => {

    await dispatch(getShopProducts(params.id))

})

export default Products