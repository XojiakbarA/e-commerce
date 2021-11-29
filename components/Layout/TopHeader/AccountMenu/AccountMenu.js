import { Menu, MenuItem } from "@mui/material"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { closeAccountMenu } from "../../../../redux/actions/main"
import { logout } from "../../../../api/api"

const AccountMenu = () => {

    const anchorEl = useSelector(state => state.accountMenu)
    const dispatch = useDispatch()

    const handleClose = () => dispatch(closeAccountMenu())

    const handleLogOut = () => {
        logout()
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
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
        </Menu>
    )
}

export default AccountMenu