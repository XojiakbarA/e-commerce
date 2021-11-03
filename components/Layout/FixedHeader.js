import { Container, AppBar, Box, Toolbar } from '@mui/material';

import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';

import InputSearch from '../Input/InputSearch'
import AppLogo from '../AppLogo';
import MenuIcon from '../Menu/MenuIcon';

const menu = [
    {id: 1, badge: 4, title: 'Wishlist', icon: (<FavoriteIcon/>)},
    {id: 2, badge: 17, title: 'Cart', icon: (<ShoppingCartIcon/>)},
    {id: 3, badge: 0, title: 'Account', icon: (<AccountCircle/>)}
]

const FixedHeader = () => {
    
    return (
        <Box sx={{ flexGrow: 1, display: {xs: 'none', sm: 'block'} }}>
            <AppBar position="fixed">
                <Container maxWidth='xl'>
                    <Toolbar>
                        
                        <AppLogo />
                    
                        <InputSearch />

                        <Box sx={{ flexGrow: 1 }} />

                        <MenuIcon menu={menu} />

                    </Toolbar>
                </Container>
            </AppBar>
            <Toolbar />
            <Toolbar />
        </Box>
    );
}

export default FixedHeader