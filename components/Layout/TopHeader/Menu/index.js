import { Box } from "@mui/material"
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MenuItem from './MenuItem'
import { openAccountMenu, toggleCartSidebar, toggleLoginDialog } from "../../../../redux/actions"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"

const Menu = () => {

    const dispatch = useDispatch()
    const router = useRouter()
    const user = useSelector(state => state.user?.data)
    const cartCount = useSelector(state => state.cart.data?.length)
    const wishlistCount = useSelector(state => state.wishlist.length)

    const openDialog = (e) => {
        if (user) {
            dispatch(openAccountMenu(e.currentTarget))
        } else {
            dispatch(toggleLoginDialog(true))
        }
    }

    const goToWishlist = () => {
        if (wishlistCount) {
            router.push('/wishlist')
        }
    }

    const openSidebar = () => {
        if (cartCount) {
            dispatch(toggleCartSidebar(true))
        }
    }

    const menu = {
        account: { id: 1, badge: 0, title: 'Account' },
        wishlist: { id: 2, badge: wishlistCount, title: wishlistCount ? 'Wishlist' : 'Wishlist is empty' },
        cart: { id: 3, badge: cartCount, title: cartCount ? 'Cart' : 'Cart is empty' }
    }

    return(
        <Box sx={{ display:'flex' }}>
            <MenuItem item={menu.account} onClick={ openDialog }>
                <AccountCircle />
            </MenuItem>
            <MenuItem item={menu.wishlist} onClick={ goToWishlist }>
                <FavoriteIcon />
            </MenuItem>
            <MenuItem item={menu.cart} onClick={ openSidebar }>
                <ShoppingCartIcon />
            </MenuItem>
        </Box>
    )
}

export default Menu