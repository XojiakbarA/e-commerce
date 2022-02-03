import {Box, IconButton, Badge } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MailIcon from '@mui/icons-material/Mail'
import NotificationsIcon from '@mui/icons-material/Notifications'

const DesktopMenu = ({ profileMenuID, handleProfileMenuOpen }) => {

    return (
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls={profileMenuID}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
            >
                <AccountCircle />
            </IconButton>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="error">
                    <MailIcon />
                </Badge>
            </IconButton>
            <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
            >
                <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
        </Box>
    )
}

export default DesktopMenu