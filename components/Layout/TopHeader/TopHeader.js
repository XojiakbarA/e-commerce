import { Container, AppBar, Box, Toolbar } from '@mui/material'
import InputSearch from '../../common/InputSearch'
import AppLogo from '../AppLogo'
import Menu from './Menu'
import router from 'next/router'

const TopHeader = () => {

    const handleSearch = (e) => {
        const value = e.target.value
        if (e.keyCode === 13) {
            if (!value) {
                return
            }
            router.push({
                pathname: '/search',
                query: {title: value}
            })
        }
    }

    return (
        <Box sx={{ flexGrow: 1, display: {xs: 'none', sm: 'block'} }}>
            <AppBar position='fixed'>
                <Container maxWidth='xl'>
                    <Toolbar>
                        <AppLogo />
                        <InputSearch onKeyUp={handleSearch}/>
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