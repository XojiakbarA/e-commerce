import { AppBar, Box, CircularProgress, Toolbar } from '@mui/material'
import IconButtonMenu from '../../common/Menu/IconButtonMenu'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AccountCircle from '@mui/icons-material/AccountCircle'
import PersonIcon from '@mui/icons-material/Person'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import NotificationsIcon from '@mui/icons-material/Notifications'
import LogoutIcon from '@mui/icons-material/Logout'
import InputSearch from './InputSearch'
import BaseLink from "../../common/Link/BaseLink"
import router from 'next/router'
import { useDispatch, useSelector } from "react-redux"
import { useToggle } from "../../../app/hooks/useToggle"
import ButtonLink from '../../common/Link/ButtonLink'
import DropdownMenu from '../../common/Menu/DropdownMenu'
import { userLogout } from '../../../app/store/actions/async/user'
import ThumbImage from '../../common/Image/ThumbImage'
import { userImageURL } from '../../../utils/utils'


const TopHeader = () => {

    const dispatch = useDispatch()

    const user = useSelector(state => state.user)
    const cartCount = useSelector(state => state.cart.data?.length)
    const wishlistCount = useSelector(state => state.wishlist.length)
    const isLoading = useSelector(state => state.toggle.isLoading)

    const { accountMenu, closeAccountMenu, handleAccount, openSidebar } = useToggle()

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

    const handleLogOut = () => {
        dispatch(userLogout())
    }

    const userMenu = [
        {
            title: 'Account',
            onClick: handleAccount,
            badgeContent: 0,
            icon: user ? <ThumbImage url={userImageURL} src={user.image?.src} size={35}/> : <AccountCircle fontSize='large'/>,
            href: null,
            component: null
        },
        {
            title: cartCount ? 'Cart' : 'Cart is empty',
            onClick: openSidebar,
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
            href: '/wishlist',
            component: BaseLink
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
            <AppBar position='fixed'>
                <Toolbar>
                    <ButtonLink
                        href={'/'}
                        text={'e-commerce'}
                        textVariant='h6'
                        color='inherit'
                    />
                    <InputSearch onKeyUp={handleSearch}/>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButtonMenu menu={userMenu}/>
                    <DropdownMenu
                        menu={profileMenu}
                        anchorEl={accountMenu}
                        onClose={closeAccountMenu}
                    />
                </Toolbar>
            </AppBar>
            <Toolbar/>
            <Toolbar/>
        </Box>
    );
}

export default TopHeader