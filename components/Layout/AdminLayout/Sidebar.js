import { List, Divider, IconButton, ListItem, ListItemIcon, ListItemText, Avatar, Stack, Typography, Box } from '@mui/material'
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
import { useRouter } from 'next/router'
import NextLink from '../../common/Link'

const menu = [
    {label: 'Products', path: '/admin/products', icon: <ListAltIcon/> },
    {label: 'Reviews', path: '/admin/reviews', icon: <CommentIcon/> },
    {label: 'Users', path: '/admin/users', icon: <GroupIcon/> },
    {label: 'Vendors', path: '/admin/vendors', icon: <StoreIcon/> },
    {label: 'Orders', path: '/admin/orders', icon: <ShoppingBagIcon/> },
    {label: 'Transactions', path: '/admin/transactions', icon: <PaidIcon/> },
    {label: 'Banners', path: '/admin/banners', icon: <ViewCarouselIcon/> },
    {label: 'Categories & Brands', path: '/admin/categories-brands', icon: <CategoryIcon/> },
    {label: 'Regions', path: '/admin/regions-districts', icon: <LocationOnIcon/> },
    {label: 'Settings', path: '/admin/settings', icon: <SettingsIcon/> },
]

const Sidebar = ({ open, handleDrawerClose }) => {

    const router = useRouter()
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
                    menu.map(item => (
                        <Box key={item.label} >
                            <NextLink href={item.path}>
                                <ListItem button key={item.label} selected={router.pathname === item.path}>
                                    <ListItemIcon>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.label}/>
                                </ListItem>
                            </NextLink>
                            {
                                item.label == 'Transactions' && <Divider />
                            }
                        </Box>
                    ))
                }
            </List>
        </Drawer>
    )
}

export default Sidebar