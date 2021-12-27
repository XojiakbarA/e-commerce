import {Box, Grid, Typography} from "@mui/material";

const OrderProductListHead = ({styles}) => {
    return (
        <Box sx={styles}>
            <Grid item lg={6}>
                <Typography variant='button'>
                    Product
                </Typography>
            </Grid>
            <Grid item lg={3}>
                <Typography variant='button'>
                    Brand
                </Typography>
            </Grid>
            <Grid item lg={3}>
                <Typography variant='button'>
                    Shop
                </Typography>
            </Grid>
        </Box>
    )
}

export default OrderProductListHead