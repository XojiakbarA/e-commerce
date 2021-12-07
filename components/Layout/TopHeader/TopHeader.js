import { Container, AppBar, Box, Toolbar } from '@mui/material'
import InputSearch from './InputSearch'
import AppLogo from '../AppLogo'
import Menu from './Menu'

const TopHeader = () => {

    return (
        <Box sx={{ flexGrow: 1, display: {xs: 'none', sm: 'block'} }}>
            <AppBar position='fixed'>
                <Container maxWidth='xl'>
                    <Toolbar>
                        <AppLogo />
                        <InputSearch />
                        <Box sx={{ flexGrow: 1 }} />
                        <Menu />
                    </Toolbar>
                </Container>
            </AppBar>
            <Toolbar />
            <Toolbar />
        </Box>
    );
}

export default TopHeader