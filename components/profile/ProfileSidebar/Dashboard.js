import { List, ListSubheader, ListItemButton, ListItemText, ListItemIcon } from "@mui/material"
import Link from '../../common/Link'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import FavoriteIcon from '@mui/icons-material/Favorite'
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic'
import { useRouter } from "next/dist/client/router"

const list = [
    {title: 'Orders', path: '/profile/orders', icon: (<ShoppingBagIcon/>)},
    {title: 'Support Tickets', path: '/profile/support-tickets', icon: (<HeadsetMicIcon/>)}
]

const Dashboard = () => {

    const router = useRouter()

    return (
        <List>
            <ListSubheader>Dashboard</ListSubheader>
            {
                list.map((item, i) => (
                    <Link key={i} href={item.path}>
                        <ListItemButton key={i} selected={item.path == router.pathname}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.title}/>
                        </ListItemButton>
                    </Link>
                ))
            }
        </List>
    )
}

export default Dashboard