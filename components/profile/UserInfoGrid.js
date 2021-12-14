import { Grid, Paper, Stack, Typography, Avatar } from "@mui/material"

const UserInfoGrid = ({ user }) => {
    return (
        <Stack direction='row' spacing={2} alignItems='stretch'>
            <Grid item lg={6}>
                <Paper sx={{paddingX: 2, height: '100%', alignItems: 'center', display: 'flex'}}>
                    <Stack direction='row' spacing={2} alignItems='center'>
                        <Avatar/>
                        <Stack>
                        <Typography variant='h5'>
                            {user?.name}
                        </Typography>
                        <Typography variant='body2'>
                            Balance: 500$
                        </Typography>
                        </Stack>
                    </Stack>
                </Paper>
            </Grid>
            <Stack spacing={2} direction='row'>
                <Paper sx={{paddingX: 2, paddingY: 3}}>
                    <Typography variant='h6' textAlign='center'>
                        16
                    </Typography>
                    <Typography variant='body2' align='center'>
                        All Orders
                    </Typography>
                </Paper>
                <Paper sx={{paddingX: 2, paddingY: 3}}>
                    <Typography variant='h6' textAlign='center'>
                        2
                    </Typography>
                    <Typography variant='body2' align='center'>
                        Awaiting Payments
                    </Typography>
                </Paper>
                <Paper sx={{paddingX: 2, paddingY: 3}}>
                    <Typography variant='h6' textAlign='center'>
                        0
                    </Typography>
                    <Typography variant='body2' align='center'>
                        Awaiting Shipment
                    </Typography>
                </Paper>
                <Paper sx={{paddingX: 2, paddingY: 3}}>
                    <Typography variant='h6' textAlign='center'>
                        1
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