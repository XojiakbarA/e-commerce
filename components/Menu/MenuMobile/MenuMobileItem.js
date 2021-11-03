import { IconButton, Badge, MenuItem } from '@mui/material'

const MenuMobileItem = ({item}) => {
    return(
        <MenuItem>
            <IconButton size="large" color="inherit">
                <Badge badgeContent={item.badge} color="error">
                    {item.icon}
                </Badge>
            </IconButton>
            <p>{item.title}</p>
        </MenuItem>
    )
}

export default MenuMobileItem