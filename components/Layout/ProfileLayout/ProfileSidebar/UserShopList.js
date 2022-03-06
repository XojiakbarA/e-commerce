import { List, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory'
import BaseLink from '../../../common/Link/BaseLink'

const UserShopList = ({shops}) => {

    return (
        <List>
            <ListSubheader>Shops</ListSubheader>
            {
                shops.map(shop => (
                    <ListItemButton
                        key={shop.id}
                        href={`/vendor/${shop.id}`}
                        component={BaseLink}
                    >
                        <ListItemIcon>
                            <StoreMallDirectoryIcon/>
                        </ListItemIcon>
                        <ListItemText primary={shop.title}/>
                    </ListItemButton>
                ))
            }
        </List>
    )
}

export default UserShopList