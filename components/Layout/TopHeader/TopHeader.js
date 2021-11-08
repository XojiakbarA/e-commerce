import { Container, AppBar, Box, Toolbar, Drawer, IconButton, Badge, Tooltip } from '@mui/material'
import { useState } from 'react'

import FavoriteIcon from '@mui/icons-material/Favorite'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AccountCircle from '@mui/icons-material/AccountCircle'

import InputSearch from '../../Input/InputSearch'
import AppLogo from '../../AppLogo'

const menu = {
    account: { id: 1, badge: 0, title: 'Account' },
    wishlist: { id: 2, badge: 4, title: 'Wishlist' },
    cart: { id: 3, badge: 17, title: 'Cart' }
}


const TopHeader = () => {

    const [cart, setCart] = useState(false)

    function handleCartOpen() {
        setCart(true)
    }

    function handleCartClose() {
        setCart(false)
    }
    
    return (
        <Box sx={{ flexGrow: 1, display: {xs: 'none', sm: 'block'} }}>
            <AppBar position='fixed'>
                <Container maxWidth='xl'>
                    <Toolbar>
                        
                        <AppLogo />
                    
                        <InputSearch />

                        <Box sx={{ flexGrow: 1 }} />

                        <Box sx={{ display:'flex' }}>
                            <IconButton size="large" color="inherit">
                                <Tooltip title={ menu.account.title } >
                                    <Badge badgeContent={ menu.account.badge } color="error">
                                        <AccountCircle/>
                                    </Badge>
                                </Tooltip>
                            </IconButton>
                            <IconButton size="large" color="inherit">
                                <Tooltip title={ menu.wishlist.title } >
                                    <Badge badgeContent={ menu.wishlist.badge } color="error">
                                        <FavoriteIcon/>
                                    </Badge>
                                </Tooltip>
                            </IconButton>
                            <IconButton size="large" color="inherit" onClick={ handleCartOpen }>
                                <Tooltip title={ menu.cart.title } >
                                    <Badge badgeContent={ menu.cart.badge } color="error">
                                        <ShoppingCartIcon/>
                                    </Badge>
                                </Tooltip>
                            </IconButton>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Toolbar />
            <Toolbar />
            <Drawer
                anchor='right'
                open={cart}
                onClose={handleCartClose}
            >
                slp[awkfaw[pfkawkfadfadl;awda]]
            </Drawer>
        </Box>
    );
}

export default TopHeader