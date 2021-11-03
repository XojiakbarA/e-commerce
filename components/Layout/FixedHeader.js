import { useState } from 'react';

import { Container, AppBar, Box, Toolbar, IconButton } from '@mui/material';

import MoreIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';

import InputSearch from '../Input/InputSearch'
import AppLogo from '../AppLogo';
import MenuIcon from '../Menu/MenuIcon';
import MenuMobile from '../Menu/MenuMobile';

const menu = [
    {id: 1, badge: 4, title: 'Wishlist', icon: (<FavoriteIcon/>)},
    {id: 2, badge: 17, title: 'Cart', icon: (<ShoppingCartIcon/>)},
    {id: 3, badge: 0, title: 'Account', icon: (<AccountCircle/>)}
]

const FixedHeader = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const isMenuMobileOpen = Boolean(anchorEl);

    const handleMenuMobileClose = () => {
        setAnchorEl(null);
    };

    const handleMenuMobileOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Container maxWidth='xl'>
                    <Toolbar>
                        
                        <AppLogo />
                    
                        <InputSearch />

                        <Box sx={{ flexGrow: 1 }} />

                        <MenuIcon menu={menu} />

                    
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-haspopup="true"
                                onClick={handleMenuMobileOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Toolbar />
            <Toolbar />
            <MenuMobile
                anchorEl={anchorEl}
                isMenuMobileOpen={isMenuMobileOpen}
                handleMenuMobileClose={handleMenuMobileClose}
                menu={menu}
            />
        </Box>
    );
}

export default FixedHeader