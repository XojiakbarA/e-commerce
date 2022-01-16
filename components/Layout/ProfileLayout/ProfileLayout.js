import { Grid } from "@mui/material"
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic'
import PersonIcon from '@mui/icons-material/Person'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PaymentIcon from '@mui/icons-material/Payment'
import AddBusinessIcon from '@mui/icons-material/AddBusiness'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ListAltIcon from '@mui/icons-material/ListAlt'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import SettingsIcon from '@mui/icons-material/Settings'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ProfileSidebar from "./ProfileSidebar/ProfileSidebar"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { toggleLoginDialog } from "../../../redux/actions"
import { useRouter } from "next/router"

const ProfileLayout = ({children}) => {

    const router = useRouter()
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const id = router.query?.id
    const isVendorPage = router.route.indexOf('/vendor') == 0

    const userMenu = [
        {title: 'Profile Info', path: '/profile', icon: (<PersonIcon/>)},
        {title: 'Orders', path: '/profile/orders', icon: (<ShoppingBagIcon/>)},
        {title: 'Support Tickets', path: '/profile/support-tickets', icon: (<HeadsetMicIcon/>)},
        {title: 'Addresses', path: '/profile/addresses', icon: (<LocationOnIcon/>)},
        {title: 'Payment Methods', path: '/profile/payment-methods', icon: (<PaymentIcon/>)},
        {title: 'Create Shop', path: '/profile/create-shop', icon: (<AddBusinessIcon/>)}
    ]
    
    const vendorMenu = [
        {title: 'Dashboard', path: `/vendor/${id}`, icon: (<DashboardIcon/>)},
        {title: 'Products', path: `/vendor/${id}/products`, icon: (<ListAltIcon/>)},
        {title: 'Orders', path: `/vendor/${id}/orders`, icon: (<ShoppingCartIcon/>)},
        {title: 'Settings', path: `/vendor/${id}/settings`, icon: (<SettingsIcon/>)},
        {title: 'Back To Profile', path: `/profile`, icon: (<ArrowBackIcon/>)}
    ]

    useEffect(() => {
        if (!user) {
            dispatch(toggleLoginDialog(true))
        }
    }, [dispatch, user])

    return (
        <>
            {
                user &&
                <Grid container spacing={2}>
                    <ProfileSidebar menu={isVendorPage ? vendorMenu : userMenu}/>
                    <Grid item lg={9}>
                        {children}
                    </Grid>
                </Grid>
            }
        </>
    )

}

export default ProfileLayout