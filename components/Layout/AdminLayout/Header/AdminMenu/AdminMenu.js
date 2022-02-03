import { Box, IconButton } from '@mui/material'
import { useState } from 'react'
import MoreIcon from '@mui/icons-material/MoreVert'
import DesktopMenu from "./DesktopMenu"
import MobileMenu from "./MobileMenu"
import ProfileMenu from "./ProfileMenu"


const AdminMenu = () => {

    const profileMenuID = 'admin-menu-profile'
    const mobileMenuID = 'admin-menu-mobile'

    const [anchorEl, setAnchorEl] = useState(null)
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null)

    const isProfileMenuOpen = Boolean(anchorEl)
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleProfileMenuClose = () => {
        setAnchorEl(null)
        handleMobileMenuClose()
    }

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget)
    }

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null)
    }

    return (
        <>
        <DesktopMenu
            profileMenuID={profileMenuID}
            handleProfileMenuOpen={handleProfileMenuOpen}
        />
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuID}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
            >
                <MoreIcon />
            </IconButton>
        </Box>
        <MobileMenu
            mobileMoreAnchorEl={mobileMoreAnchorEl}
            mobileMenuID={mobileMenuID}
            isMobileMenuOpen={isMobileMenuOpen}
            handleMobileMenuClose={handleMobileMenuClose}
            handleProfileMenuOpen={handleProfileMenuOpen}
        />
        <ProfileMenu
            anchorEl={anchorEl}
            profileMenuID={profileMenuID}
            isProfileMenuOpen={isProfileMenuOpen}
            handleProfileMenuClose={handleProfileMenuClose}
        />
        </>
    )
}

export default AdminMenu