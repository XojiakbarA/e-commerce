import { List, ListSubheader, ListItemButton, ListItemText, ListItemIcon } from "@mui/material"
import Link from '../../common/Link'
import PersonIcon from '@mui/icons-material/Person'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PaymentIcon from '@mui/icons-material/Payment'
import { useRouter } from "next/dist/client/router"

const list = [
    {title: 'Profile Info', path: '/profile', icon: (<PersonIcon/>)},
    {title: 'Addresses', path: '/profile/addresses', icon: (<LocationOnIcon/>)},
    {title: 'Payment Methods', path: 'profile/payment-methods', icon: (<PaymentIcon/>)}
]

const AccountSettings = () => {

    const router = useRouter()

    return (
        <List>
            <ListSubheader>Account Settings</ListSubheader>
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

export default AccountSettings