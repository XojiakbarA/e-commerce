import { Box, Grid, Pagination, Typography } from "@mui/material"
import ProductListItem from "./ProductListItem"

const ProductList = ({ labels, products, meta, handlePageChange }) => {

    return (
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
                {
                    meta && meta.last_page > 1 &&
                    <Grid item xs={12}>
                        <Pagination
                            color="primary"
                            page={meta.current_page}
                            count={meta.last_page}
                            onChange={handlePageChange}
                        />
                    </Grid>
                }
            </Grid>
    )
}

export default ProductList