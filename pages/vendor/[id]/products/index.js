import ListAltIcon from '@mui/icons-material/ListAlt'
import AddIcon from '@mui/icons-material/Add'
import ProfileLayout from "../../../../components/layout/ProfileLayout/ProfileLayout"
import ProfileTitle from "../../../../components/profile/ProfileTitle"
import ProductList from '../../../../components/vendor/ProductList/ProductList'

const labels = [ 'Title', 'Image', 'Stock', 'Price', 'Sale Price', 'Rating', '' ]

const Products = () => {
    
    return (
        <ProfileLayout>
            <ProfileTitle
                title='Products'
                titleIcon={<ListAltIcon fontSize='large'/>}
                buttonText='Add Product'
                buttonIcon={<AddIcon />}
            />
            <ProductList labels={labels}/>
        </ProfileLayout>
    )
}

export default Products