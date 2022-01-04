import { Grid, Paper, Stack, Divider, List, ListSubheader, ListItemButton, ListItemText, ListItemIcon } from "@mui/material"
import NextLink from '../../../common/Link'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic'
import PersonIcon from '@mui/icons-material/Person'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PaymentIcon from '@mui/icons-material/Payment'
import { useRouter } from "next/dist/client/router"

const list = [
    {title: 'Orders', path: '/profile/orders', icon: (<ShoppingBagIcon/>)},
    {title: 'Support Tickets', path: '/profile/support-tickets', icon: (<HeadsetMicIcon/>)},
    {title: 'Profile Info', path: '/profile', icon: (<PersonIcon/>)},
    {title: 'Addresses', path: '/profile/addresses', icon: (<LocationOnIcon/>)},
    {title: 'Payment Methods', path: '/profile/payment-methods', icon: (<PaymentIcon/>)}
]

const ProfileSidebar = () => {

    const router = useRouter()

    return (
        <Grid item lg={3}>
            <Paper>
                <Stack padding={2} divider={<Divider orientation='horizontal' />}>
                    <List>
                        <ListSubheader>Menu</ListSubheader>
                        {
                            list.map((item, i) => (
                                <NextLink key={i} href={item.path}>
                                    <ListItemButton
                                        key={i}
                                        selected={
                                            item.path == router.pathname
                                            ||
                                            item.path == '/profile/orders' && router.route == '/profile/orders/[id]'
                                        }
                                    >
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText primary={item.title}/>
                                    </ListItemButton>
                                </NextLink>
                            ))
                        }
                    </List>
                </Stack>
            </Paper>
        </Grid>
    )
}

export default ProfileSidebar