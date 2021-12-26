import { Chip, Grid, Paper, Typography } from "@mui/material";
import NextLink from '../../common/Link'

const OrderListItem = ({order, styles}) => {

    return (
        <Grid item xs={12}>
            <NextLink href={'/profile/orders/' + order.id}>
            <Paper sx={styles}>
                <Grid item lg={3}>
                    <Typography variant='body2'>
                        {order.id}
                    </Typography>
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
        </Grid>
    )
}

export default OrderListItem