import { Box } from "@mui/material"
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MenuItem from './MenuItem'
import { openCartSidebar } from "../../../../redux/actions/main"
import { openLoginDialog } from "../../../../redux/actions/main"
import { connect } from "react-redux"

const menu = {
    account: { id: 1, badge: 0, title: 'Account' },
    wishlist: { id: 2, badge: 4, title: 'Wishlist' },
    cart: { id: 3, badge: 17, title: 'Cart' }
}

const Menu = ({openCartSidebar, openLoginDialog}) => {

    return(
        <Box sx={{ display:'flex' }}>
            <MenuItem item={menu.account} onClick={openLoginDialog}>
                <AccountCircle />
            </MenuItem>
            <MenuItem item={menu.wishlist}>
                <FavoriteIcon />
            </MenuItem>
            <MenuItem item={menu.cart} onClick={openCartSidebar}>
                <ShoppingCartIcon />
            </MenuItem>
        </Box>
    )
}

const mapDispatchToProps = (dispatch) => ({
    openCartSidebar: () => dispatch(openCartSidebar()),
    openLoginDialog: () => dispatch(openLoginDialog())
})

export default connect(null, mapDispatchToProps)(Menu)