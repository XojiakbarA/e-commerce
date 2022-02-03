import { List, Divider, IconButton, ListItem, ListItemIcon, ListItemText, Avatar, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel'
import CategoryIcon from '@mui/icons-material/Category'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import GroupIcon from '@mui/icons-material/Group'
import StoreIcon from '@mui/icons-material/Store'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import ListAltIcon from '@mui/icons-material/ListAlt'
import PaidIcon from '@mui/icons-material/Paid'
import CommentIcon from '@mui/icons-material/Comment'
import SettingsIcon from '@mui/icons-material/Settings'
import { Drawer, DrawerHeader } from "./styledComponents"

const mainMenu = [
    {label: 'Products', icon: <ListAltIcon/> },
    {label: 'Reviews', icon: <CommentIcon/> },
    {label: 'Users', icon: <GroupIcon/> },
    {label: 'Vendors', icon: <StoreIcon/> },
    {label: 'Orders', icon: <ShoppingBagIcon/> },
    {label: 'Transactions', icon: <PaidIcon/> },
]

const secondaryMenu = [
    {label: 'Banners', icon: <ViewCarouselIcon/> },
    {label: 'Categories', icon: <CategoryIcon/> },
    {label: 'Brands', icon: <CategoryIcon/> },
    {label: 'Regions', icon: <LocationOnIcon/> },
    {label: 'Settings', icon: <SettingsIcon/> },
]

const Sidebar = ({ open, handleDrawerClose }) => {

    const theme = useTheme()

    return (
        <Drawer variant="permanent" open={open}>
            <DrawerHeader>
                <Stack direction='row' spacing={2} alignItems='center'>
                    <Avatar/>
                    <Typography>
                        Xojiakbar
                    </Typography>
                </Stack>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                {
                    mainMenu.map(item => (
                        <ListItem button key={item.label}>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.label}/>
                        </ListItem>
                    ))
                }
            </List>
            <Divider />
            <List>
                {
                    secondaryMenu.map(item => (
                        <ListItem button key={item.label}>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItem>
                    ))
                }
            </List>
        </Drawer>
    )
}

export default Sidebar