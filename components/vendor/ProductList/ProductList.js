import { Box, Grid, Typography } from "@mui/material"
import ProductListItem from "./ProductListItem"

const ProductList = ({ labels, products }) => {

    return (
        <>
        {
            products?.length === 0
            ?
            <Typography variant="h4">
                No products yet
            </Typography>
            :
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box sx={{padding: 2}}>
                        <Grid container>
                        {
                            labels.map((label, i) => (
                                <Grid
                                    item
                                    key={label}
                                    xs={ i == 0 ? 3 : true }
                                    sx={i == 0 ? {display: 'block'} : {display: 'flex', justifyContent: 'center'}}
                                >
                                    <Typography variant='button'>
                                        {label}
                                    </Typography>
                                </Grid>
                            ))
                        }
                        </Grid>
                    </Box>
                </Grid>
                {
                    products?.map(product => (
                        <Grid item xs={12} key={product.id}>
                            <ProductListItem product={product}/>
                        </Grid>
                    ))
                }
            </Grid>
        }
        </>
    )
}

export default ProductList