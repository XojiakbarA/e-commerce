import { Badge, Box, IconButton, Tooltip } from "@mui/material"
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { useSelector } from "react-redux"
import { useToggle } from "../../../../app/hooks/useToggle"
import Link from "../../../common/Link/BaseLink"

const Menu = () => {

    const cartCount = useSelector(state => state.cart.data?.length)
    const wishlistCount = useSelector(state => state.wishlist.length)

    const { handleAccount, openSidebar } = useToggle()

    const userMenu = [
        {
            title: 'Account',
            onClick: handleAccount,
            badgeContent: 0,
            icon: <AccountCircle fontSize='large'/>,
            href: null,
            component: null
        },
        {
            title: cartCount ? 'Cart' : 'Cart is empty',
            onClick: openSidebar,
            badgeContent: cartCount,
            icon: <ShoppingCartIcon/>,
            href: null,
            component: null
        },
        {
            title: wishlistCount ? 'Wishlist' : 'Wishlist is empty',
            onClick: null,
            badgeContent: wishlistCount,
            icon: <FavoriteIcon/>,
            href: '/wishlist',
            component: Link
        }
    ]

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {
                userMenu.map(item => (
                    <IconButton
                        key={item.title}
                        onClick={item.onClick}
                        color="inherit"
                        href={item.href}
                        component={item.component}
                    >
                        <Tooltip title={item.title ?? ''}>
                            <Badge badgeContent={item.badgeContent} color="error">
                                {item.icon}
                            </Badge>
                        </Tooltip>
                    </IconButton>
                ))
            }
        </Box>
    )
}

export default Menu