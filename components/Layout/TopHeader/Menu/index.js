import { Box } from "@mui/material"
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MenuItem from './MenuItem'
import { openAccountMenu, toggleCartSidebar, toggleLoginDialog } from "../../../../redux/actions/main"
import { useDispatch, useSelector } from "react-redux"

const menu = {
    account: { id: 1, badge: 0, title: 'Account' },
    wishlist: { id: 2, badge: 4, title: 'Wishlist' },
    cart: { id: 3, badge: 17, title: 'Cart' }
}

const Menu = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const openDialog = (e) => {
        if (user) {
            dispatch(openAccountMenu(e.currentTarget))
        } else {
            dispatch(toggleLoginDialog())
        }
    }
    const openSidebar = () => dispatch(toggleCartSidebar())

    return(
        <Box sx={{ display:'flex' }}>
            <MenuItem item={menu.account} onClick={ openDialog }>
                <AccountCircle />
            </MenuItem>
            <MenuItem item={menu.wishlist}>
                <FavoriteIcon />
            </MenuItem>
            <MenuItem item={menu.cart} onClick={ openSidebar }>
                <ShoppingCartIcon />
            </MenuItem>
        </Box>
    )
}

export default Menu