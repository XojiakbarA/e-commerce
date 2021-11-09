import { IconButton, Tooltip, Badge } from "@mui/material"

const MenuItem = ({item, children, onClick}) => {
    return(
        <IconButton size="large" color="inherit" onClick={onClick} >
            <Tooltip title={ item.title } >
                <Badge badgeContent={ item.badge } color="error">
                    {children}
                </Badge>
            </Tooltip>
        </IconButton>
    )
}

export default MenuItem