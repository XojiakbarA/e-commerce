import {Box, Grid, Typography} from "@mui/material";

const OrderListHead = ({ styles }) => {
    return (
        <Box sx={styles}>
            <Grid item lg={3}>
                <Typography variant='button'>
                    Order ID
                </Typography>
            </Grid>
            <Grid item lg={3}>
                <Typography variant='button'>
                    Status
                </Typography>
            </Grid>
            <Grid item lg={3}>
                <Typography variant='button'>
                    Date purchased
                </Typography>
            </Grid>
            <Grid item lg={3}>
                <Typography variant='button'>
                    Total
                </Typography>
            </Grid>
        </Box>
    )
}

export default OrderListHead