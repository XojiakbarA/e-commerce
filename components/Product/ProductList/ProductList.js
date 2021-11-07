import { Grid, Box, Typography } from "@mui/material"
import ProductCard from "./ProductCard"

const ProductList = ({products, itemWidth}) => {
    return(
        <Box>
            {
                products.title ?
                <Typography variant='h3' gutterBottom>
                    {products.title}
                </Typography> : false
            }
            
            <Grid container spacing={2}>
                {
                    products.items.map((product, i) => (
                        <Grid item xs={12} lg={itemWidth} key={i}>
                            <ProductCard product={product} />
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    )
}

export default ProductList