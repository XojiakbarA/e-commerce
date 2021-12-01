import { Badge, Box, BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { toggleCartSidebar, toggleLoginDialog, openAccountMenu } from '../../../redux/actions/main'
import { useDispatch } from 'react-redux'

const {account, wishlist, cart} = {
    account: { id: 1, badge: 0, title: 'Account' },
    wishlist: { id: 2, badge: 4, title: 'Wishlist' },
    cart: { id: 3, badge: 17, title: 'Cart' }
}

const MenuMobile = () => {

    const dispatch = useDispatch()

    const openDialog = (e) => {
        if (localStorage.getItem('token')) {
            dispatch(openAccountMenu(e.currentTarget))
        } else {
            dispatch(toggleLoginDialog())
        }
    }
    const openSidebar = () => dispatch(toggleCartSidebar())

    return (
        <Box sx={{marginTop: 2, pb: 7, display: {xs: 'block', sm: 'none'}}}>
            <Paper sx={{zIndex: 10, position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation showLabels>
                    <BottomNavigationAction
                        label={account.title}
                        icon={
                            <Badge badgeContent={account.badge} color="error">
                                <AccountCircle/>
                            </Badge>
                        }
                        onClick={ openDialog }
                    />
                    <BottomNavigationAction
                        label={wishlist.title}
                        icon={
                            <Badge badgeContent={wishlist.badge} color="error">
                                <FavoriteIcon/>
                            </Badge>
                        }
                    />
                    <BottomNavigationAction
                        label={cart.title}
                        icon={
                            <Badge badgeContent={cart.badge} color="error">
                                <ShoppingCartIcon/>
                            </Badge>
                        }
                        onClick={ openSidebar }
                    />
                </BottomNavigation>
            </Paper>
        </Box>
    );
}

export default MenuMobile