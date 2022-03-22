import DashboardIcon from '@mui/icons-material/Dashboard'
import AdminLayout from '../../components/layout/AdminLayout/AdminLayout'
import PageTitle from '../../components/common/PageTitle'
import { Grid, ListItem, ListItemAvatar, ListItemText, Paper } from '@mui/material'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import { wrapper } from '../../app/store'

const Admin = () => {

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <PageTitle
                    title='Dashboard'
                    titleIcon={<DashboardIcon fontSize='large'/>}
                />
            </Grid>
            <Grid item xs={4}>
                <Paper>
                    <ListItem>
                        <ListItemAvatar>
                            <AttachMoneyIcon fontSize='large' color='primary'/>
                        </ListItemAvatar>
                        <ListItemText primary="Total Sales" secondary="$19,626,058.20" />
                    </ListItem>
                </Paper>
            </Grid>
            <Grid item xs={4}>
                <Paper>
                    <ListItem>
                        <ListItemAvatar>
                            <ShoppingBagIcon fontSize='large' color='primary'/>
                        </ListItemAvatar>
                        <ListItemText primary="Total Orders" secondary="87790" />
                    </ListItem>
                </Paper>
            </Grid>
            <Grid item xs={4}>
                <Paper>
                    <ListItem>
                        <ListItemAvatar>
                            <ShoppingBasketIcon fontSize='large' color='primary'/>
                        </ListItemAvatar>
                        <ListItemText primary="Total Products" secondary="5678" />
                    </ListItem>
                </Paper>
            </Grid>
        </Grid>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(({getState}) => async () => {

    const isAdmin = getState()?.user?.role == 'admin'

    if (!isAdmin) {
        return {
            notFound: true
        }
    }

})

export default Admin

Admin.getLayout = (page) => {
    return (
        <AdminLayout>
                {page}
        </AdminLayout>
    )
}