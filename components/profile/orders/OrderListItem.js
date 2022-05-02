import {AvatarGroup, Card, CardActionArea, Grid, Typography} from "@mui/material"
import BaseLink from '../../common/Link/BaseLink'
import PhotoIcon from '@mui/icons-material/Photo'
import ThumbImage from "../../common/Image/ThumbImage"

const OrderListItem = ({order}) => {

    return (
        <Card>
            <CardActionArea
                sx={{padding: 2}}
                href={`/profile/orders/${order.id}`}
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
                                order.sub_orders.map(sub_order => (
                                    sub_order.order_products.map(product => (
                                        <ThumbImage
                                            key={product.id}
                                            src={product.main_image}
                                            noImageIcon={<PhotoIcon/>}
                                        />
                                    ))
                                ))
                            }
                        </AvatarGroup>
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