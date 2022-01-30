import { Chip, Paper, Stack, Typography } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'
import PendingIcon from '@mui/icons-material/Pending';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReplayIcon from '@mui/icons-material/Replay';

const OrderHead = ({order}) => {

    return (
        <Paper sx={{padding: 2}}>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Stack direction='row' spacing={3}>
                    <Typography variant='body2'>
                        Order ID: {order.id}
                    </Typography>
                    <Typography variant='body2'>
                        Placed on: {order.created_at}
                    </Typography>
                </Stack>
                <Stack spacing={2} alignItems='end'>
                    <Stack direction='row' spacing={1} alignItems='center'>
                        <Typography variant='body2'>
                            Order Status :
                        </Typography>
                        <Chip
                            size='small'
                            variant='outlined'
                            label={order.status}
                            icon={
                                order.status === 'cancelled' ?
                                <CancelIcon/> :
                                order.status === 'shipped' ?
                                <LocalShippingIcon /> :
                                order.status === 'delivered' ?
                                <CheckCircleIcon/> :
                                <PendingIcon/>
                            }
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
                    </Stack>
                    <Stack direction='row' spacing={1} alignItems='center'>
                        <Typography variant='body2'>
                            Payment Status :
                        </Typography>
                        <Chip
                            size='small'
                            label={order.payment_status}
                            icon={
                                order.payment_status === 'approved' ?
                                <CheckCircleIcon/> :
                                order.payment_status === 'declined' ?
                                <CancelIcon/> :
                                order.payment_status === 'refunded' ?
                                <ReplayIcon/> :
                                <PendingIcon/>
                            }
                            color={
                                order.payment_status === 'approved' ?
                                'success' :
                                order.payment_status === 'declined' ?
                                'error' :
                                order.payment_status === 'refunded' ?
                                'warning' :
                                'default'
                            }
                        />
                    </Stack>
                </Stack>
            </Stack>
        </Paper>
    )
}

export default OrderHead