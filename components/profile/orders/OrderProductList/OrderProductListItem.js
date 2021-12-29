import {Avatar, Grid, Paper, Typography} from "@mui/material";
import Image from "next/image";
import NextLink from '../../../common/Link';
import {productImageURL} from "../../../../utils/utils";

const OrderProductListItem = ({product, styles}) => {

    return (
        <NextLink href={`/products/${product.id}`}>
            <Paper sx={styles}>
                <Grid item lg={1}>
                    <Avatar variant='rounded'>
                    <Image src={productImageURL + product.image} width={50} height={50} alt={product.image}/>
                    </Avatar>
                </Grid>
                <Grid item lg={5}>
                    <Typography variant='body2'>
                        {product.title}
                    </Typography>
                    <Typography variant='caption'>
                        $ {product.price} x {product.quantity}
                    </Typography>
                </Grid>
                <Grid item lg={3}>
                    <Typography variant='body2'>
                        {product.brand}
                    </Typography>
                </Grid>
                <Grid item lg={3}>
                    <Typography variant='body2'>
                        {product.shop}
                    </Typography>
                </Grid>
            </Paper>
        </NextLink>
    )
}

export default OrderProductListItem