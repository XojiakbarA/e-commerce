import { CircularProgress, ListItem, Menu, MenuItem } from "@mui/material"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { closeAccountMenu, setLoading, setSnackbar } from "../../../../redux/actions/main"
import { logout } from "../../../../api/api"
import { useEffect, useState } from "react"

const AccountMenu = () => {

    const [name, setName] = useState('Guest')
    const anchorEl = useSelector(state => state.accountMenu)
    const isLoading = useSelector(state => state.isLoading)
    const dispatch = useDispatch()
    
    useEffect(()=> {
        const user = JSON.parse(localStorage.getItem('user'))
        setName(user?.name)
    }, [])

    const handleClose = () => dispatch(closeAccountMenu())

    const handleLogOut = async () => {
        dispatch(setLoading(true))
        await logout()
        dispatch(setLoading(false))
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
            <ListItem divider >Hello, {name}</ListItem>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleLogOut}>Log Out
                {isLoading && <CircularProgress size={20} sx={{marginLeft: 2}} />}
            </MenuItem>
        </Menu>
    )
}

export default AccountMenu