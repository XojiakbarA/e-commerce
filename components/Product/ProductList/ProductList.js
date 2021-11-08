import { Grid, Box, Typography, Pagination } from "@mui/material"
import ProductCard from "./ProductCard"

const ProductList = ({products, view}) => {
    return(
        <Box>
            <Grid container spacing={2}>
                {
                    products.items.map((product, i) => (
                        <Grid item xs={12} lg={view == 'grid' ? 4 : view == undefined ? 3 : 12} key={i}>
                            <ProductCard product={product} view={view} />
                        </Grid>
                    ))
                }
            </Grid>
            {
                view !== undefined
                ? <Pagination count={5} size='large' color='primary' sx={{my: 2}} />
                : null
            }
            
        </Box>
    )
}

export default ProductList