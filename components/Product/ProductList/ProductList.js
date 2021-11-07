import { Grid, Box, Typography } from "@mui/material"
import ProductCard from "./ProductCard"

const ProductList = ({products, view}) => {
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
                        <Grid item xs={12} lg={view == 'grid' ? 4 : view == undefined ? 3 : 12} key={i}>
                            <ProductCard product={product} view={view} />
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    )
}

export default ProductList