import { Box } from "@mui/material"
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MenuItem from './MenuItem'
import { useSelector } from "react-redux"
import { useRouter } from "next/router"
import { useToggle } from "../../../../app/hooks/useToggle"

const Menu = () => {

    const router = useRouter()
    const cartCount = useSelector(state => state.cart.data?.length)
    const wishlistCount = useSelector(state => state.wishlist.length)

    const { handleAccount, openSidebar } = useToggle()

    const goToWishlist = () => {
        if (wishlistCount) {
            router.push('/wishlist')
        }
    }

    const menu = {
        account: { id: 1, badge: 0, title: 'Account' },
        wishlist: { id: 2, badge: wishlistCount, title: wishlistCount ? 'Wishlist' : 'Wishlist is empty' },
        cart: { id: 3, badge: cartCount, title: cartCount ? 'Cart' : 'Cart is empty' }
    }

    return(
        <Box sx={{ display:'flex' }}>
            <MenuItem item={menu.account} onClick={ handleAccount }>
                <AccountCircle />
            </MenuItem>
            <MenuItem item={menu.wishlist} onClick={ goToWishlist }>
                <FavoriteIcon />
            </MenuItem>
            <MenuItem item={menu.cart} onClick={ e => openSidebar(cartCount) }>
                <ShoppingCartIcon />
            </MenuItem>
        </Box>
    )
}

export default Menu