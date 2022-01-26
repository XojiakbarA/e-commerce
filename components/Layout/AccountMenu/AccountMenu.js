import { CircularProgress, ListItem, Menu, MenuItem } from "@mui/material"
import Link from '../../common/Link'
import { useSelector, useDispatch } from "react-redux"
import { userLogout } from "../../../app/store/actions/async/user"
import { useToggle } from "../../../app/hooks/useToggle"

const AccountMenu = () => {

    const user = useSelector(state => state.user)
    const isLoading = useSelector(state => state.toggle.isLoading)
    const dispatch = useDispatch()

    const { accountMenu, closeAccountMenu } = useToggle()

    const handleLogOut = () => {
        dispatch(userLogout())
    }

    return (
        <Menu
            id="menu-appbar"
            anchorEl={accountMenu}
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
            open={Boolean(accountMenu)}
            onClose={closeAccountMenu}
        >
            <ListItem divider>Hello, {user?.first_name}</ListItem>
            <Link href='/profile'>
                <MenuItem onClick={closeAccountMenu}>Profile</MenuItem>
            </Link>
            <MenuItem onClick={closeAccountMenu}>My account</MenuItem>
            <MenuItem onClick={handleLogOut}>Log Out
                {isLoading && <CircularProgress size={20} sx={{marginLeft: 2}} />}
            </MenuItem>
        </Menu>
    )
}

export default AccountMenu