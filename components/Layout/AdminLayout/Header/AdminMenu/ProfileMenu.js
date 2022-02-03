import { Menu, MenuItem } from "@mui/material"


const ProfileMenu = ({ anchorEl, profileMenuID, isProfileMenuOpen, handleProfileMenuClose }) => {

    return (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={profileMenuID}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isProfileMenuOpen}
            onClose={handleProfileMenuClose}
        >
            <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleProfileMenuClose}>My account</MenuItem>
        </Menu>
    )
}

export default ProfileMenu