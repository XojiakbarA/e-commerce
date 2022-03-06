import { ListItemIcon, Menu, MenuItem } from "@mui/material"

const DropdownMenu = ({ menu, anchorEl, onClose }) => {

    return (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            autoFocus={false}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={Boolean(anchorEl)}
            onClose={onClose}
        >
            {
                menu.map(item => (
                    <MenuItem
                        key={item.title}
                        onClick={item.onClick}
                        href={item.href}
                        component={item.component}
                    >
                        <ListItemIcon>
                            { item.icon }
                        </ListItemIcon>
                        { item.title }
                    </MenuItem>
                ))
            }
        </Menu>
    )
}

export default DropdownMenu