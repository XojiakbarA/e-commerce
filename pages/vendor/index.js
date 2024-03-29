import { Grid, List, ListItem, ListSubheader, Paper, Stack, Typography } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ProfileLayout from '../../components/layout/ProfileLayout/ProfileLayout'
import { wrapper } from '../../app/store'
import ProfilePageHead from '../../components/common/ProfilePageHead'
import MainLayout from '../../components/layout/MainLayout'

const Vendor = () => {

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <ProfilePageHead
                    title='Dashboard'
                    titleIcon={<DashboardIcon fontSize='large'/>}
                />
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item lg={4}>
                        <Paper sx={{paddingY: 3}}>
                            <Stack spacing={2} alignItems='center'>
                                <Typography variant='body1'>
                                    Earnings (before taxes)
                                </Typography>
                                <Typography variant='h4'>
                                    $ 30450
                                </Typography>
                                <Typography variant='body2'>
                                    after associated vendor fees
                                </Typography>
                            </Stack>
                        </Paper>
                    </Grid>
                    <Grid item lg={4}>
                        <Paper sx={{paddingY: 3}}>
                            <Stack spacing={2} alignItems='center'>
                                <Typography variant='body1'>
                                    Your balance
                                </Typography>
                                <Typography variant='h4'>
                                    $ 4000
                                </Typography>
                                <Typography variant='body2'>
                                    Will be processed on Feb 15, 2021
                                </Typography>
                            </Stack>
                        </Paper>
                    </Grid>
                    <Grid item lg={4}>
                        <Paper sx={{paddingY: 3}}>
                            <Stack spacing={2} alignItems='center'>
                                <Typography variant='body1'>
                                    Pending Orders
                                </Typography>
                                <Typography variant='h4'>
                                    08
                                </Typography>
                                <Typography variant='body2'>
                                    7/3/2020 - 8/1/2020
                                </Typography>
                            </Stack>
                        </Paper>
                    </Grid>
                    <Grid item lg={8}>
                        <Paper sx={{padding: 3}}>
                            Sales
                        </Paper>
                    </Grid>
                    <Grid item lg={4}>
                        <Paper sx={{padding: 3}}>
                            <List>
                                <ListSubheader sx={{ bgcolor: 'inherit' }}>Top Regions</ListSubheader>
                                <ListItem>
                                    <Stack direction='row' justifyContent='space-between' alignItems='center' width='100%'>
                                        <Typography variant='body2'>
                                            Tashkent
                                        </Typography>
                                        <Typography>
                                            $ 130
                                        </Typography>
                                    </Stack>
                                </ListItem>
                                <ListItem>
                                    <Stack direction='row' justifyContent='space-between' alignItems='center' width='100%'>
                                        <Typography variant='body2'>
                                            Jizzakh
                                        </Typography>
                                        <Typography>
                                            $ 80
                                        </Typography>
                                    </Stack>
                                </ListItem>
                                <ListItem>
                                    <Stack direction='row' justifyContent='space-between' alignItems='center' width='100%'>
                                        <Typography variant='body2'>
                                            Samarkhand
                                        </Typography>
                                        <Typography>
                                            $ 50
                                        </Typography>
                                    </Stack>
                                </ListItem>
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(({dispatch, getState}) => async ({params, query}) => {

    const user = getState().user
    const isVendor = user?.role == 'vendor'
    
    if (!user) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }
    if (!isVendor) {
        return {
            notFound: true
        }
    }

})

export default Vendor

Vendor.getLayout = (page) => {
    return (
        
        <MainLayout>
            <ProfileLayout>
                {page}
            </ProfileLayout>
        </MainLayout>
    )
}