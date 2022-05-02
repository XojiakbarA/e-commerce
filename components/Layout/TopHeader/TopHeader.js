import { AppBar, Box, CircularProgress, Toolbar } from '@mui/material'
import IconButtonMenu from '../../common/Menu/IconButtonMenu'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AccountCircle from '@mui/icons-material/AccountCircle'
import PersonIcon from '@mui/icons-material/Person'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import NotificationsIcon from '@mui/icons-material/Notifications'
import LogoutIcon from '@mui/icons-material/Logout'
import SearchInput from '../../common/Input/SearchInput'
import BaseLink from "../../common/Link/BaseLink"
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from "react-redux"
import ButtonLink from '../../common/Link/ButtonLink'
import DropdownMenu from '../../common/Menu/DropdownMenu'
import { userLogout } from '../../../app/store/actions/async/user'
import ThumbImage from '../../common/Image/ThumbImage'
import { toggleAccountMenu, toggleCartSidebar } from '../../../app/store/actions/actionCreators'
import { toggleLoginDialog } from '../../../app/store/actions/dialogActions'


const TopHeader = () => {

    const dispatch = useDispatch()
    const router = useRouter()

    const user = useSelector(state => state.user)
    const cartCount = useSelector(state => state.cart.data?.length)
    const wishlistCount = useSelector(state => state.wishlist.length)
    const isLoading = useSelector(state => state.toggle.isLoading)

    const handleSearch = (e) => {
        const value = e.target.value
        if (e.keyCode === 13) {
            if (!value) {
                return
            }
            router.push({
                pathname: '/search',
                query: {title: value}
            })
        }
    }

    const openSidebar = () => {
        dispatch(toggleCartSidebar(true))
    }
    const handleAccount = (e) => {
        if (user) {
            dispatch(toggleAccountMenu(e.currentTarget))
        } else {
            if (router.pathname !== '/login' && router.pathname !== '/register') {
                dispatch(toggleLoginDialog(true))
            }
        }
    }
    const handleLogOut = () => {
        dispatch(userLogout())
    }

    const userMenu = [
        {
            title: 'Account',
            onClick: handleAccount,
            badgeContent: 0,
            icon: user ? <ThumbImage src={user.image?.src} size={35}/> : <AccountCircle fontSize='large'/>,
            href: null,
            component: null
        },
        {
            title: cartCount ? 'Cart' : 'Cart is empty',
            onClick: cartCount ? openSidebar : null,
            badgeContent: cartCount,
            icon: <ShoppingCartIcon/>,
            href: null,
            component: null
        },
        {
            title: wishlistCount ? 'Wishlist' : 'Wishlist is empty',
            onClick: null,
            badgeContent: wishlistCount,
            icon: <FavoriteIcon/>,
            href: wishlistCount ? '/wishlist' : null,
            component: wishlistCount ? BaseLink : null
        }
    ]

    const profileMenu = [
        {
            title: 'Profile',
            icon: <PersonIcon fontSize='small'/>,
            href: '/profile',
            component: BaseLink
        },
        {
            title: 'My Orders',
            icon: <ShoppingBagIcon fontSize='small'/>,
            href: '/profile/orders',
            component: BaseLink
        },
        {
            title: 'Notifications',
            icon: <NotificationsIcon fontSize='small'/>
        },
        {
            title: 'Log Out',
            onClick: handleLogOut,
            icon: isLoading ? <CircularProgress size={20}/> : <LogoutIcon fontSize='small'/>
        }
    ] 

    return (
        <Box sx={{ flexGrow: 1, display: {xs: 'none', sm: 'block'} }}>
            <AppBar position='fixed' sx={{ zIndex: 1200 }}>
                <Toolbar variant='dense'>
                    <ButtonLink
                        href={'/'}
                        text={'e-commerce'}
                        textVariant='h6'
                        color='inherit'
                    />
                    <SearchInput onKeyUp={handleSearch}/>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButtonMenu menu={userMenu}/>
                    <DropdownMenu menu={profileMenu}/>
                </Toolbar>
            </AppBar>
            <Toolbar variant='dense'/>
            <Toolbar/>
        </Box>
    );
}

export default TopHeader