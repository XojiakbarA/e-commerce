import { Badge, Box, BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';

import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';

const menu = [
    {id: 1, badge: 4, title: 'Wishlist', icon: (<FavoriteIcon/>)},
    {id: 2, badge: 17, title: 'Cart', icon: (<ShoppingCartIcon/>)},
    {id: 3, badge: 0, title: 'Account', icon: (<AccountCircle/>)}
]

const MenuMobile = () => {

    return (
        <Box sx={{marginTop: 2, pb: 7, display: {xs: 'block', sm: 'none'}}}>
            <Paper sx={{zIndex: 10, position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation showLabels>
                    {
                        menu.map((item, i) => (
                            <BottomNavigationAction
                            key={i}
                            label={item.title}
                            icon={<Badge badgeContent={item.badge} color="error">{item.icon}</Badge>}
                            />
                        ))
                    }
                </BottomNavigation>
            </Paper>
        </Box>
    );
}

export default MenuMobile