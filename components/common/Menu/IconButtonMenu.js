import { Badge, Box, IconButton, Tooltip } from "@mui/material"

const IconButtonMenu = ({ menu, display = 'flex' }) => {

    return (
        <Box sx={{ display: display, alignItems: 'center' }}>
            {
                menu.map(item => (
                    <IconButton
                        key={item.title}
                        onClick={item.onClick}
                        color="inherit"
                        href={item.href}
                        component={item.component}
                    >
                        <Tooltip title={item.title ?? ''}>
                            <Badge badgeContent={item.badgeContent} color="error">
                                {item.icon}
                            </Badge>
                        </Tooltip>
                    </IconButton>
                ))
            }
        </Box>
    )
}

export default IconButtonMenu