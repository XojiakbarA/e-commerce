import { List, ListSubheader, ListItemButton, ListItemText, ListItemIcon } from "@mui/material"
import PersonIcon from '@mui/icons-material/Person'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PaymentIcon from '@mui/icons-material/Payment'

const AccountSettings = () => {
    return (
        <List>
            <ListSubheader>Account Settings</ListSubheader>
            <ListItemButton>
                <ListItemIcon><PersonIcon/></ListItemIcon>
                <ListItemText primary='Profile Info'/>
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon><LocationOnIcon/></ListItemIcon>
                <ListItemText primary='Addresses'/>
            </ListItemButton>
            <ListItemButton>
            <ListItemIcon><PaymentIcon/></ListItemIcon>
            <ListItemText primary='Payment Methods'/>
            </ListItemButton>
        </List>
    )
}

export default AccountSettings