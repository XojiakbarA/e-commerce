import {Avatar, AvatarGroup, Card, CardActionArea, Chip, Grid, Typography} from "@mui/material";
import PhotoIcon from '@mui/icons-material/Photo'
import BaseLink from '../common/Link/BaseLink';
import Image from "next/image";
import {productImageURL} from "../../utils/utils";
import { useRouter } from "next/router";

const OrderListItem = ({order}) => {

    const router = useRouter()
    const shop_id = router.query.id

    return (
        <Card>
            <CardActionArea
                sx={{padding: 2}}
                href={`/vendor/${shop_id}/orders/${order.id}`}
                component={BaseLink}
            >
                <Grid container alignItems='center'>
                    <Grid item xs={3}>
                        <Typography variant='body2'>
                            {order.id}
                        </Typography>
                    </Grid>
                    <Grid item xs display='flex' justifyContent='center'>
                        <AvatarGroup max={3} spacing='small'>
                            {
                                order.order_products.map(product => (
                                    <Avatar key={product.id}>
                                        {
                                            product.image
                                            ?
                                            <Image
                                                src={productImageURL + product.image}
                                                alt={product.image}
                                                layout='fill'
                                                objectFit='cover'
                                            />
                                            :
                                            <PhotoIcon/>
                                        }
                                    </Avatar>
                                ))
                            }
                        </AvatarGroup>
                    </Grid>
                    <Grid item xs display='flex' justifyContent='center'>
                        <Chip
                            label={order.status}
                            variant="outlined"
                            size="small"
                            color={
                                order.status === 'cancelled' ?
                                'error' :
                                order.status === 'shipped' ?
                                'primary' :
                                order.status === 'delivered' ?
                                'success' :
                                'default'
                            }
                        />
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
            </CardActionArea>
        </Card>
    )
}

export default OrderListItem