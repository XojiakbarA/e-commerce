import {Avatar, Grid, Paper, Typography} from "@mui/material";
import NextLink from '../../common/Link';
import {productImageURL} from "../../../utils/utils";

const OrderProductListItem = ({product, styles}) => {

    return (
        <NextLink href={`/products/${product.id}`}>
            <Paper sx={{padding: 2}}>
                <Grid container alignItems='center'>
                    <Grid item xs={3}>
                        <Avatar
                            variant='rounded'
                            src={product.image ? productImageURL + product.image.src : undefined}
                            alt={product.image?.src}
                        />
                    </Grid>
                    <Grid item xs display='flex' justifyContent='center'>
                        <Typography variant='body2'>
                            {product.title}
                        </Typography>
                    </Grid>
                    <Grid item xs display='flex' justifyContent='center'>
                        <Typography variant='caption'>
                            $ {product.price} x {product.quantity}
                        </Typography>
                    </Grid>
                    <Grid item xs display='flex' justifyContent='center'>
                        <Typography variant='body2'>
                            {product.brand}
                        </Typography>
                    </Grid>
                    <Grid item xs display='flex' justifyContent='center'>
                        <Typography variant='body2'>
                            {product.shop}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </NextLink>
    )
}

export default OrderProductListItem