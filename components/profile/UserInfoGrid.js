import { Grid, Paper, Stack, Typography, Avatar } from "@mui/material"
import Image from "next/image"
import { userImageURL } from "../../utils/utils"

const UserInfoGrid = ({ user }) => {

    return (
        <Stack direction='row' spacing={2} alignItems='stretch'>
            <Grid item lg={6}>
                <Paper sx={{paddingX: 2, height: '100%', alignItems: 'center', display: 'flex'}}>
                    <Stack direction='row' spacing={2} alignItems='center'>
                        <Avatar sx={{width: 70, height: 70}}>
                            <Image src={userImageURL + user?.image} height={70} width={70} alt={user?.image}/>
                        </Avatar>
                        <Stack>
                        <Typography variant='h5'>
                            {user?.first_name}
                        </Typography>
                        <Typography variant='body2'>
                            {user?.last_name}
                        </Typography>
                        </Stack>
                    </Stack>
                </Paper>
            </Grid>
            <Stack spacing={2} direction='row'>
                <Paper sx={{paddingX: 2, paddingY: 3}}>
                    <Typography variant='h6' textAlign='center'>
                        {user?.all_orders_count}
                    </Typography>
                    <Typography variant='body2' align='center'>
                        All Orders
                    </Typography>
                </Paper>
                <Paper sx={{paddingX: 2, paddingY: 3}}>
                    <Typography variant='h6' textAlign='center'>
                        {user?.awaiting_payment_count}
                    </Typography>
                    <Typography variant='body2' align='center'>
                        Awaiting Payments
                    </Typography>
                </Paper>
                <Paper sx={{paddingX: 2, paddingY: 3}}>
                    <Typography variant='h6' textAlign='center'>
                        {user?.awaiting_shipment_count}
                    </Typography>
                    <Typography variant='body2' align='center'>
                        Awaiting Shipment
                    </Typography>
                </Paper>
                <Paper sx={{paddingX: 2, paddingY: 3}}>
                    <Typography variant='h6' textAlign='center'>
                        {user?.awaiting_delivery_count}
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