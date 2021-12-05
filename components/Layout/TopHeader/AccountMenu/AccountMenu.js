import { CircularProgress, ListItem, Menu, MenuItem } from "@mui/material"
import Link from '../../../common/Link'
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { closeAccountMenu, setCart, setLoading, setSnackbar, setUser } from "../../../../redux/actions/main"
import { logout } from "../../../../api/api"

const AccountMenu = () => {

    const user = useSelector(state => state.user)
    const anchorEl = useSelector(state => state.accountMenu)
    const isLoading = useSelector(state => state.isLoading)
    const dispatch = useDispatch()

    const handleClose = () => dispatch(closeAccountMenu())

    const handleLogOut = async () => {
        dispatch(setLoading(true))
        await logout()
        dispatch(setLoading(false))
        dispatch(setUser(null))
        dispatch(setCart([]))
        dispatch(setSnackbar({isOpen: true, text: 'You are logged out!'}))
        dispatch(closeAccountMenu())
    }

    return (
        <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            autoFocus={false}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            <ListItem divider>Hello, {user?.name}</ListItem>
            <Link href='/profile'>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
            </Link>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleLogOut}>Log Out
                {isLoading && <CircularProgress size={20} sx={{marginLeft: 2}} />}
            </MenuItem>
        </Menu>
    )
}

export default AccountMenu