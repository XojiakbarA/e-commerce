import { IconButton, Badge, MenuItem, Menu } from '@mui/material'

import MenuMobileItem from './MenuMobileItem'

const MenuMobile = ({
        anchorEl,
        isMenuMobileOpen,
        handleMenuMobileClose,
        menu
}) => {
    return(
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuMobileOpen}
            onClose={handleMenuMobileClose}
        >
            {
                menu.map((item, i) => (
                    <MenuMobileItem key={i} item={item} />
                ))
            }
            
            
        </Menu>
    )
}

export default MenuMobile