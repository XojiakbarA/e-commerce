import {Avatar, AvatarGroup, Chip, Grid, Paper, Typography} from "@mui/material";
import NextLink from '../../common/Link';
import Image from "next/image";
import {productImageURL, noImageUrl} from "../../../utils/utils";

const OrderListItem = ({order}) => {

    return (
        <NextLink href={`/profile/orders/${order.id}`}>
            <Paper sx={{padding: 2}}>
                <Grid container alignItems='center'>
                <Grid item xs={3}>
                    <Typography variant='body2'>
                        {order.id}
                    </Typography>
                </Grid>
                <Grid item xs display='flex' justifyContent='center'>
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
                <Grid item xs display='flex' justifyContent='center'>
                    <Chip label={order.status} size='small'/>
                </Grid>
                <Grid item xs display='flex' justifyContent='center'>
                    <Typography variant='body2'>
                        {order.created_at}
                    </Typography>
                </Grid>
                <Grid item xs display='flex' justifyContent='center'>
                    <Typography variant='body2'>
                        $ {order.total}
                    </Typography>
                </Grid>
                </Grid>
            </Paper>
        </NextLink>
    )
}

export default OrderListItem