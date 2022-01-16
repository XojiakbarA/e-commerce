import { Grid, Typography } from '@mui/material'
import ProductCard from '../components/common/ProductCard'
import { useSelector } from "react-redux"

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

export default Wishlist