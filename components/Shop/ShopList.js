import { Grid, Box, Typography, Pagination } from "@mui/material"
import ShopCard from "./ShopCard"

const ShopList = ({shops}) => {
    return(
        <Box>
            <Typography variant='h3' gutterBottom>
                {shops.title}
            </Typography>
            <Grid container spacing={2}>
                {
                    shops.items.map((shop, i) => (
                        <Grid item xs={12} lg={4} key={i}>
                            <ShopCard shop={shop} />
                        </Grid>
                    ))
                }
            </Grid>
            <Pagination count={5} size='large' color='primary' sx={{my: 2}} />
        </Box>
    )
}

export default ShopList