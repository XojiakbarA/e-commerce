import { Grid, Box, Typography } from "@mui/material"
import ProductCard from "./ProductCard"

const ProductList = ({products}) => {
    return(
        <Box>
            <Typography variant='h3' gutterBottom>
                {products.title}
            </Typography>
            <Grid container spacing={2}>
                {
                    products.items.map((product, i) => (
                        <Grid item xs={12} lg={3} key={i}>
                            <ProductCard product={product} />
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    )
}

export default ProductList