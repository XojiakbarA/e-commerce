import {Avatar, AvatarGroup, Chip, Grid, Paper, Typography} from "@mui/material";
import NextLink from '../../../common/Link';
import Image from "next/image";
import {productImageURL, noImageUrl} from "../../../../utils/utils";

const OrderListItem = ({order, styles}) => {

    return (
        <NextLink href={`/profile/orders/${order.id}`}>
            <Paper sx={styles}>
            <Grid item lg={3} display='flex' alignItems='center' justifyContent='space-between'>
                <Typography variant='body2'>
                    {order.id}
                </Typography>
                <AvatarGroup max={3} spacing='small'>
                    {
                        order?.order_products.map(product => (
                            <Avatar key={product.id}>
                                <Image
                                    src={product.image ? productImageURL + product.image.src : noImageUrl}
                                    alt={product.image?.src}
                                    layout='fill'
                                    objectFit='cover'
                                />
                            </Avatar>
                        ))
                    }
                </AvatarGroup>
            </Grid>
            <Grid item lg={3}>
                <Chip label={order.status} size='small'/>
            </Grid>
            <Grid item lg={3}>
                <Typography variant='body2'>
                    {order.created_at}
                </Typography>
            </Grid>
            <Grid item lg={3}>
                <Typography variant='body2'>
                    $ {order.total}
                </Typography>
            </Grid>
        </Paper>
        </NextLink>
    )
}

export default OrderListItem