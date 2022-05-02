import { Box, CircularProgress, IconButton, Toolbar } from "@mui/material"
import AccountCircle from '@mui/icons-material/AccountCircle'
import MailIcon from '@mui/icons-material/Mail'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MenuIcon from '@mui/icons-material/Menu'
import PersonIcon from '@mui/icons-material/Person'
import LogoutIcon from '@mui/icons-material/Logout'
import { AppBar } from "../styledComponents"
import IconButtonMenu from "../../../common/Menu/IconButtonMenu"
import { useDispatch, useSelector } from "react-redux"
import BaseLink from "../../../common/Link/BaseLink"
import ButtonLink from "../../../common/Link/ButtonLink"
import DropdownMenu from "../../../common/Menu/DropdownMenu"
import { userLogout } from "../../../../app/store/actions/async/user"
import ThumbImage from "../../../common/Image/ThumbImage"
import { toggleAccountMenu } from "../../../../app/store/actions/actionCreators"
import { toggleLoginDialog } from "../../../../app/store/actions/dialogActions"

const Header = ({open, handleDrawerOpen}) => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const { isLoading } = useSelector(state => state.toggle)

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

    const adminMenu = [
        {
            title: 'Account',
            onClick: handleAccount,
            badgeContent: 0,
            icon: user ? <ThumbImage src={user.image?.src} size={35}/> : <AccountCircle fontSize='large'/>,
            href: null,
            component: null
        },
        {
            title: 'Messages',
            onClick: null,
            badgeContent: 4,
            icon: <MailIcon/>,
            href: null,
            component: null
        },
        {
            title: 'Notifications',
            onClick: null,
            badgeContent: 4,
            icon: <NotificationsIcon/>,
            href: null,
            component: null
        },
    ]

    const profileMenu = [
        {
            title: 'Profile',
            icon: <PersonIcon fontSize='small'/>,
            href: '/profile',
            component: BaseLink
        },
        {
            title: 'Log Out',
            onClick: handleLogOut,
            icon: isLoading ? <CircularProgress size={20}/> : <LogoutIcon fontSize='small'/>
        }
    ]

    return (
        <AppBar position="fixed" open={open}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{
                    marginRight: '36px',
                    ...(open && { display: 'none' }),
                    }}
                >
                    <MenuIcon />
                </IconButton>

                <ButtonLink
                    href='/admin'
                    text='Admin'
                    textVariant='h6'
                    color='inherit'
                />

                <Box sx={{ flexGrow: 1 }}/>

                <IconButtonMenu
                    menu={adminMenu}
                    display={{ xs: 'none', md: 'flex' }}
                />
                <DropdownMenu menu={profileMenu}/>
            </Toolbar>
        </AppBar>
    )
}

export default Header