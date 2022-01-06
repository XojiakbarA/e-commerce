import { Box, Grid, Typography } from "@mui/material"
import ProductListItem from "./ProductListItem"

const ProductList = ({ labels }) => {
    
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
            <Grid item xs={12}>
                <ProductListItem/>
            </Grid>
            <Grid item xs={12}>
                <ProductListItem/>
            </Grid>
        </Grid>
    )
}

export default ProductList