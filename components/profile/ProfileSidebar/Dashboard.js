import { List, ListSubheader, ListItemButton, ListItemText, ListItemIcon } from "@mui/material"
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import FavoriteIcon from '@mui/icons-material/Favorite'
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic'

const Dashboard = () => {
    return (
        <List>
            <ListSubheader>Dashboard</ListSubheader>
            <ListItemButton>
                <ListItemIcon><ShoppingBagIcon/></ListItemIcon>
                <ListItemText primary='Orders'/>
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon><FavoriteIcon/></ListItemIcon>
                <ListItemText primary='Wishlist'/>
            </ListItemButton>
            <ListItemButton>
            <ListItemIcon><HeadsetMicIcon/></ListItemIcon>
            <ListItemText primary='Support Tickets'/>
            </ListItemButton>
        </List>
    )
}

export default Dashboard