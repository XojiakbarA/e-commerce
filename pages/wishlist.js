import { Grid, Typography } from '@mui/material'
import ProductCard from '../components/common/Card/ProductCard/ProductCard'
import { useSelector } from "react-redux"
import { wrapper } from '../app/store'
import MainLayout from '../components/layout/MainLayout'

const Wishlist = () => {

    const wishlist = useSelector(state => state.wishlist)

    return (
        <Grid container spacing={2}>
            {
                wishlist.length > 0
                ?
                wishlist.map(product => (
                    <Grid item  xs={12} lg={3}  key={product.id}>
                        <ProductCard product={product} />
                    </Grid>
                ))
                :
                <Typography variant='h4'>
                    Wishlist is empty
                </Typography>
            }
        </Grid>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(({dispatch}) => async () => {

    

})

export default Wishlist

Wishlist.getLayout = (page) => {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    )
}