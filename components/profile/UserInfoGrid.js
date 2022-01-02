import { Grid, Paper, Stack, Typography, Avatar } from "@mui/material"

const UserInfoGrid = ({ user }) => {

    const name = user?.first_name
    const lastName =user?.last_name
    const allOrdersCount = user?.all_orders_count
    const awaitingPaymentCount = user?.awaiting_payment_count
    const awaitingShipmentCount = user?.awaiting_shipment_count
    const awaitingDeliveryCount = user?.awaiting_delivery_count

    return (
        <Stack direction='row' spacing={2} alignItems='stretch'>
            <Grid item lg={6}>
                <Paper sx={{paddingX: 2, height: '100%', alignItems: 'center', display: 'flex'}}>
                    <Stack direction='row' spacing={2} alignItems='center'>
                        <Avatar/>
                        <Stack>
                        <Typography variant='h5'>
                            {name}
                        </Typography>
                        <Typography variant='body2'>
                            {lastName}
                        </Typography>
                        </Stack>
                    </Stack>
                </Paper>
            </Grid>
            <Stack spacing={2} direction='row'>
                <Paper sx={{paddingX: 2, paddingY: 3}}>
                    <Typography variant='h6' textAlign='center'>
                        {allOrdersCount}
                    </Typography>
                    <Typography variant='body2' align='center'>
                        All Orders
                    </Typography>
                </Paper>
                <Paper sx={{paddingX: 2, paddingY: 3}}>
                    <Typography variant='h6' textAlign='center'>
                        {awaitingPaymentCount}
                    </Typography>
                    <Typography variant='body2' align='center'>
                        Awaiting Payments
                    </Typography>
                </Paper>
                <Paper sx={{paddingX: 2, paddingY: 3}}>
                    <Typography variant='h6' textAlign='center'>
                        {awaitingShipmentCount}
                    </Typography>
                    <Typography variant='body2' align='center'>
                        Awaiting Shipment
                    </Typography>
                </Paper>
                <Paper sx={{paddingX: 2, paddingY: 3}}>
                    <Typography variant='h6' textAlign='center'>
                        {awaitingDeliveryCount}
                    </Typography>
                    <Typography variant='body2' align='center'>
                        Awaiting Delivery
                    </Typography>
                </Paper>
            </Stack>
        </Stack>
    )
}

export default UserInfoGrid