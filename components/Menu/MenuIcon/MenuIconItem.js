import { IconButton, Badge, Tooltip } from '@mui/material'

const MenuIconItem = ({item}) => {
    return(
        <IconButton size="large" color="inherit">
            <Tooltip title={item.title} >
                <Badge badgeContent={item.badge} color="error">
                    {item.icon}
                </Badge>
            </Tooltip>
        </IconButton>
    )
}

export default MenuIconItem