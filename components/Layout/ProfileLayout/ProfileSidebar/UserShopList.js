import { List, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory'
import NextLink from '../../../common/Link'
import { useSelector } from "react-redux"

const UserShopList = () => {

    const shops = useSelector(state => state?.user.data.shops)

    return (
        <List>
            <ListSubheader>Shops</ListSubheader>
            {
                shops.map(shop => (
                    <NextLink href={`/vendor/${shop.id}`} key={shop.id}>
                        <ListItemButton>
                            <ListItemIcon>
                                <StoreMallDirectoryIcon/>
                            </ListItemIcon>
                            <ListItemText primary={shop.title}/>
                        </ListItemButton>
                    </NextLink>
                ))
            }
        </List>
    )
}

export default UserShopList