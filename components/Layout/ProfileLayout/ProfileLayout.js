import { Grid } from "@mui/material"
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic'
import PersonIcon from '@mui/icons-material/Person'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PaymentIcon from '@mui/icons-material/Payment'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ListAltIcon from '@mui/icons-material/ListAlt'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import SettingsIcon from '@mui/icons-material/Settings'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ProfileSidebar from "./ProfileSidebar/ProfileSidebar"
import { useRouter } from "next/router"

const ProfileLayout = ({children}) => {

    const router = useRouter()
    const isVendorPage = router.route.indexOf('/vendor') == 0

    const userMenu = [
        {title: 'Profile Info', path: '/profile', icon: (<PersonIcon/>)},
        {title: 'Orders', path: '/profile/orders', icon: (<ShoppingBagIcon/>)},
        {title: 'Support Tickets', path: '/profile/support-tickets', icon: (<HeadsetMicIcon/>)},
        {title: 'Addresses', path: '/profile/addresses', icon: (<LocationOnIcon/>)},
        {title: 'Payment Methods', path: '/profile/payment-methods', icon: (<PaymentIcon/>)}
    ]
    
    const vendorMenu = [
        {title: 'Dashboard', path: `/vendor`, icon: (<DashboardIcon/>)},
        {title: 'Products', path: `/vendor/products`, icon: (<ListAltIcon/>)},
        {title: 'Orders', path: `/vendor/orders`, icon: (<ShoppingCartIcon/>)},
        {title: 'Settings', path: `/vendor/settings`, icon: (<SettingsIcon/>)},
        {title: 'Back To Profile', path: `/profile`, icon: (<ArrowBackIcon/>)}
    ]

    return (
        <>
            <Grid container spacing={2}>
                <ProfileSidebar menu={isVendorPage ? vendorMenu : userMenu}/>
                <Grid item lg={9}>
                    {children}
                </Grid>
            </Grid>
        </>
    )

}

export default ProfileLayout