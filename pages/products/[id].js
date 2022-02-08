import { useSelector } from "react-redux"
import { getProduct } from "../../app/store/actions/async/common"
import { wrapper } from "../../app/store"
import MainLayout from "../../components/layout/MainLayout"
import ProductDetails from "../../components/product/ProductDetails/ProductDetails"

const Product = () => {

    const product = useSelector(state => state.product)

    return (
        <ProductDetails product={product}/>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(({dispatch}) => async ({params}) => {

    await dispatch(getProduct(params.id))

})

export default Product

Product.getLayout = (page) => {
    return (
        
        <MainLayout>
            {page}
        </MainLayout>
    )
}