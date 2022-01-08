import ListAltIcon from '@mui/icons-material/ListAlt'
import AddIcon from '@mui/icons-material/Add'
import ProfileLayout from "../../../../components/layout/ProfileLayout/ProfileLayout"
import ProfileTitle from "../../../../components/profile/ProfileTitle"
import ProductList from '../../../../components/vendor/ProductList/ProductList'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getShopProducts } from '../../../../redux/actions'
import { useRouter } from 'next/router'
import { CircularProgress } from '@mui/material'

const labels = [ 'Title', 'Image', 'Stock', 'Price', 'Sale Price', 'Rating', '' ]

const Products = () => {

    const router = useRouter()
    const dispatch = useDispatch()
    const products = useSelector(state => state.products.data)
    const isLoading = useSelector(state => state.toggle.isLoading)
    const id = router.query.id

    useEffect(() => {
        dispatch(getShopProducts(id))
    }, [dispatch, id])

    return (
        <ProfileLayout>
            <ProfileTitle
                title='Products'
                titleIcon={<ListAltIcon fontSize='large'/>}
                buttonText='Add Product'
                buttonIcon={<AddIcon />}
            />
            {
                isLoading
                ?
                <CircularProgress/>
                :
                <ProductList labels={labels} products={products}/>
            }
        </ProfileLayout>
    )
}

export default Products