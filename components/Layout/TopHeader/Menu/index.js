import { Box } from "@mui/material"
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AccountCircle from '@mui/icons-material/AccountCircle'

import { useDispatch } from 'react-redux'
import { cartOpen } from '../../../../redux/cartSidebarState/cartSidebarState'
import { dialogOpen } from '../../../../redux/loginDialogState/loginDialogState'

import MenuItem from './MenuItem'

const menu = {
    account: { id: 1, badge: 0, title: 'Account' },
    wishlist: { id: 2, badge: 4, title: 'Wishlist' },
    cart: { id: 3, badge: 17, title: 'Cart' }
}

const Menu = () => {

    const dispatch = useDispatch()

    return(
        <Box sx={{ display:'flex' }}>
            <MenuItem item={menu.account} onClick={ () => dispatch(dialogOpen()) }>
                <AccountCircle />
            </MenuItem>
            <MenuItem item={menu.wishlist}>
                <FavoriteIcon />
            </MenuItem>
            <MenuItem item={menu.cart} onClick={ () => dispatch(cartOpen()) }>
                <ShoppingCartIcon />
            </MenuItem>
        </Box>
    )
}

export default Menu